import axios from "axios";
import FormData from "form-data";
import env from "../helpers/env";

const getRequestConfig = (
    additionalRequestData: any = {},
    additionalHeaders: any = { "Content-Type": "application/json" }
) => {
    return {
        ...additionalRequestData,
        headers: {
            Authorization: `Token ${env.BOOKSTACK_TOKEN_ID}:${env.BOOKSTACK_TOKEN_SECRET}`,
            ...additionalHeaders,
        },
    };
};

const getPagePayload = (title: string, content: string, useMarkdown: boolean) => ({
    name: title,
    html: useMarkdown ? undefined : content,
    markdown: useMarkdown ? content : undefined,
});

export const updatePage = async (
    pageId: number,
    title: string,
    content: string,
    useMarkdown: boolean
) => {
    const { data } = await axios.put(
        `${env.BOOKSTACK_BASE_URL}/api/pages/${pageId}`,
        getPagePayload(title, content, useMarkdown),
        getRequestConfig()
    );
    return data;
};

export const createPage = async (
    bookId: number,
    title: string,
    content: string,
    useMarkdown: boolean
) => {
    const { data } = await axios.post(
        `${env.BOOKSTACK_BASE_URL}/api/pages`,
        {
            book_id: bookId,
            ...getPagePayload(title, content, useMarkdown),
        },
        getRequestConfig()
    );
    return data;
};

export const readBook = async (bookId: number) => {
    const { data } = await axios.get(
        `${env.BOOKSTACK_BASE_URL}/api/books/${bookId}`,
        getRequestConfig()
    );
    return data;
};

export const createImage = async (fileName: string, pageId: number, base64String: string) => {
    const form = new FormData();
    form.append("image", Buffer.from(base64String, "base64"), {
        filename: fileName,
        contentType: "image/jpeg",
    });
    form.append("type", "gallery");
    form.append("uploaded_to", pageId);

    const { data } = await axios.post(
        `${env.BOOKSTACK_BASE_URL}/api/image-gallery`,
        form,
        getRequestConfig(
            {
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            },
            form.getHeaders()
        )
    );

    return data;
};
