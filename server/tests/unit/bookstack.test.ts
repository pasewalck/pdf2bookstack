import { beforeEach, describe, expect, it, vi } from "vitest";
import { importBook } from "../../src/services/bookstack";
import * as bookstackApi from "../../src/services/bookstackApi";

vi.mock("../../src/services/bookstackApi", () => ({
    readBook: vi.fn(async (bookId: number) => ({
        id: bookId,
        slug: "demo-book",
        content: [{ type: "chapter", id: 10, name: "Chapter One", slug: "chapter-one" }],
    })),
    createPage: vi.fn(async () => ({ id: 1, slug: "demo-page" })),
    createImage: vi.fn(async () => ({ url: "https://bookstack.test/image.png" })),
    updatePage: vi.fn(async () => ({})),
    createAttachment: vi.fn(async () => ({})),
}));

const conversionResult = {
    html: "<p>Hello</p>",
    markdown: "",
    images: {},
};

describe("importBook", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("creates a page in the requested chapter", async () => {
        const result = await importBook(1, "Demo", conversionResult, {
            useMarkdown: false,
            chapterId: 10,
        });

        expect(bookstackApi.createPage).toHaveBeenCalledWith(1, "Demo", "<p>Hello</p>", false, 10);
        expect(result.url).toBe("https://bookstack.test/books/demo-book/page/demo-page");
    });

    it("rejects a chapter that is not part of the book", async () => {
        await expect(
            importBook(1, "Demo", conversionResult, { useMarkdown: false, chapterId: 99 })
        ).rejects.toThrow("Chapter 99 does not belong to book 1.");

        expect(bookstackApi.createPage).not.toHaveBeenCalled();
    });
});
