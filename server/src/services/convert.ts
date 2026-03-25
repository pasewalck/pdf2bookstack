import axios from "axios";
import FormData from "form-data";
import { readFromCache, writeToCache } from "./cache";
import env from "../helpers/env";

export interface ConversionResult {
    html: string;
    markdown: string;
    images: object;
}

export const convertPdf = async (
    buffer: Buffer,
    fileName: string,
    keepImages: boolean,
    markdown: boolean
): Promise<ConversionResult> => {
    const prefix =
        (markdown ? "markdown" : "html") + "-" + (keepImages ? "with-images" : "no-images");

    const jsonResult = await readFromCache(prefix, buffer);
    if (jsonResult) return jsonResult;

    const apiKey = env.API_KEY;
    const apiUrl = env.API_URL;

    const headers = {
        "X-Api-Key": apiKey,
    };

    const formData = new FormData();
    formData.append("file", buffer, { filename: fileName, contentType: "application/pdf" });
    formData.append("output_format", markdown ? "markdown" : "html");
    formData.append("disable_image_captions", "true");
    formData.append("disable_image_extraction", keepImages ? "false" : "true");

    const response = await axios.post(apiUrl, formData, {
        headers: {
            ...headers,
            ...formData.getHeaders(),
        },
    });
    const checkUrl = response.data.request_check_url;

    let r;
    for (let i = 0; i < 300; i++) {
        const res = await axios.get(checkUrl, { headers });
        r = res.data;
        if (r.status === "complete") break;
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    writeToCache(prefix, buffer, r);

    return r;
};
