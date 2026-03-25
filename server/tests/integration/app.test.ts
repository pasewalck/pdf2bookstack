import request from "supertest";
import jwt from "jsonwebtoken";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createPageLink } from "../../src/services/bookstack";
import env from "../../src/helpers/env";

vi.mock("../../src/services/bookstackApi", () => ({
    readBook: vi.fn(async (bookId: number) => ({
        id: bookId,
        slug: "demo-book",
    })),
}));

vi.mock("../../src/services/bookstack", async () => {
    const actual = await vi.importActual("../../src/services/bookstack");
    return {
        ...actual,
        importBook: vi.fn(async () => ({
            url: createPageLink({ slug: "book1" }, { slug: "page1" }),
            id: 1,
        })),
    };
});
vi.mock("../../src/services/convert", () => ({
    convertPdf: vi.fn(async () => ({
        markdown: "",
        html: "",
        images: [],
    })),
}));

const { default: app } = await import("../../src/app");

afterEach(() => {
    vi.clearAllMocks();
});

const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    book_id: 1,
    user_id: 1,
    user_name: "Test User",
};

describe("server", () => {
    const token = jwt.sign(payload, env.JWT_SECRET, { algorithm: "HS256" });
    const iToken = jwt.sign(payload, "invalid" + env.JWT_SECRET, { algorithm: "HS256" });

    it("returns health status", async () => {
        const response = await request(app).get("/api/health");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true });
    });

    it("returns token details for a valid jwt", async () => {
        const response = await request(app)
            .get("/api/verify")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("bookId");
        expect(response.body).toHaveProperty("exp");
    });

    it("rejects token details for a invalid jwt", async () => {
        const response = await request(app)
            .get("/api/verify")
            .set("Authorization", `Bearer ${iToken}`);

        expect(response.status).toBe(401);
    });

    it("rejects import for invalid jwt", async () => {
        const fileBuffer = Buffer.from("");
        const filename = "empty.pdf";
        const response = await request(app)
            .post("/api/upload")
            .set("Authorization", `Bearer ${iToken}`)
            .attach("file", fileBuffer, { filename })
            .field("useMarkdown", "false")
            .field("keepImages", "true");

        expect(response.status).toBe(401);
    });

    it("import successful for valid jwt", async () => {
        const fileBuffer = Buffer.from("");
        const filename = "empty.pdf";
        const response = await request(app)
            .post("/api/upload")
            .set("Authorization", `Bearer ${token}`)
            .attach("file", fileBuffer, { filename })
            .field("useMarkdown", "false")
            .field("keepImages", "true");

        expect(response.status).toBe(200);
    });
});
