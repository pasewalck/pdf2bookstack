import { AuthRequest } from "../middleware/auth";
import { createBookLink, importBook } from "../services/bookstack";
import { Response } from "express";
import { convertPdf } from "../services/convert";
import axios from "axios";
import { getPdfFilePageTitle } from "../helpers/utils";
import { readBook } from "../services/bookstackApi";

export const tokenInfo = async (req: AuthRequest, res: Response) => {
    if (req.bookId)
        res.json({
            success: true,
            bookId: req.bookId,
            exp: req.exp,
            bookUrl: createBookLink(await readBook(req.bookId)),
        });
    else throw new Error("Expected bookId to be defined.");
};

export const health = async (req: AuthRequest, res: Response) => {
    res.json({
        success: true,
    });
};

export const doUpload = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }

        const { bookId, file } = req;
        if (!bookId) {
            res.status(400).json({ error: "Book ID is required" });
            return;
        }

        const fileName = file.originalname;
        const title = getPdfFilePageTitle(fileName);
        const useMarkdown = req.body.useMarkdown !== "false" && req.body.useMarkdown !== false;
        const keepImages = req.body.keepImages !== "false" && req.body.keepImages !== false;

        console.log(
            `Starting conversion for ${fileName} (Markdown: ${useMarkdown}, Images: ${keepImages})...`
        );
        const jsonResult = await convertPdf(file.buffer, fileName, keepImages, useMarkdown);

        console.log(`Conversion complete. Creating page in Bookstack (Book ID: ${bookId})...`);

        const page = await importBook(bookId, title, jsonResult, useMarkdown);
        res.json({ success: true, pageUrl: page.url, pageId: page.id });
    } catch (error: any) {
        const message = (() => {
            if (axios.isAxiosError(error)) {
                return error.response?.data?.message || error.response?.data || error.message;
            }
            return error.message || "Unexpected error";
        })();
        console.error("Upload failed:", message);
        res.status(500).json({ error: message });
    }
};
