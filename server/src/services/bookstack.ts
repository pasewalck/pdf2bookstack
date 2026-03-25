import env from "../helpers/env";
import { ConversionResult } from "./convert";
import * as bookstackApi from "./bookstackApi";

export interface ImportPageResult {
    url: string;
    id: number;
}

const BOOKSTACK_BASE_URL = env.BOOKSTACK_BASE_URL;

export const createPageLink = (book: any, page: any) =>
    `${BOOKSTACK_BASE_URL}/books/${book.slug}/page/${page.slug}`;
export const createBookLink = (book: any) => `${BOOKSTACK_BASE_URL}/books/${book.slug}`;

export const importBook = async (
    bookId: number,
    title: string,
    jsonResult: ConversionResult,
    useMarkdown: boolean
): Promise<ImportPageResult> => {
    let content = useMarkdown ? jsonResult.markdown || "" : jsonResult.html || "";

    const page = await bookstackApi.createPage(bookId, title, content, useMarkdown);
    const book = await bookstackApi.readBook(bookId);

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
