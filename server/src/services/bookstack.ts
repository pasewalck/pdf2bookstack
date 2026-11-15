import env from "../helpers/env";
import { ConversionResult } from "./convert";
import * as bookstackApi from "./bookstackApi";

export interface ImportPageResult {
    url: string;
    id: number;
}

export interface Chapter {
    id: number;
    name: string;
    slug?: string;
}

class ChapterNotFoundError extends Error {
    statusCode = 400;
}

const BOOKSTACK_BASE_URL = env.BOOKSTACK_BASE_URL;

export const createPageLink = (book: any, page: any) =>
    `${BOOKSTACK_BASE_URL}/books/${book.slug}/page/${page.slug}`;
export const createBookLink = (book: any) => `${BOOKSTACK_BASE_URL}/books/${book.slug}`;

export const getBookChapters = (book: any): Chapter[] => {
    const content = Array.isArray(book?.content)
        ? book.content
        : Array.isArray(book?.contents)
          ? book.contents
          : [];

    return content
        .filter((item: any) => item?.type === "chapter")
        .map((item: any) => ({ id: item.id, name: item.name, slug: item.slug }));
};

export const importBook = async (
    bookId: number,
    title: string,
    jsonResult: ConversionResult,
    useMarkdown: boolean,
    chapterId?: number
): Promise<ImportPageResult> => {
    let content = useMarkdown ? jsonResult.markdown || "" : jsonResult.html || "";

    const book = await bookstackApi.readBook(bookId);
    const chapter = chapterId
        ? getBookChapters(book).find(item => item.id === chapterId)
        : undefined;

    if (chapterId && !chapter) {
        throw new ChapterNotFoundError(`Chapter ${chapterId} does not belong to book ${bookId}.`);
    }

    const page = await bookstackApi.createPage(bookId, title, content, useMarkdown, chapterId);

    if (jsonResult.images) {
        for (const [key, value] of Object.entries(jsonResult.images)) {
            const imageResponse = await bookstackApi.createImage(key, page.id, value);
            if (imageResponse?.url) {
                content = content.replaceAll(key, imageResponse.url);
            }
        }
    }

    await bookstackApi.updatePage(page.id, title, content, useMarkdown);

    const pageUrl = createPageLink(book, page);

    console.log(`Page created successfully: ${pageUrl}`);
    return {
        url: pageUrl,
        id: page.id,
    };
};
