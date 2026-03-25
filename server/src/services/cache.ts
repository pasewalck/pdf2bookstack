import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const CACHE_DIR = path.join(process.cwd(), "cache");

const getCacheFilePath = (prefix: string, buffer: Buffer): string => {
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");
    return path.join(CACHE_DIR, `${prefix}.${hash}.json`);
};

export const readFromCache = async (prefix: string, buffer: Buffer): Promise<any | null> => {
    const cachePath = getCacheFilePath(prefix, buffer);
    try {
        const cachedData = await fs.readFile(cachePath, "utf-8");
        return JSON.parse(cachedData);
    } catch {
        return null;
    }
};

export const writeToCache = async (prefix: string, buffer: Buffer, entry: any): Promise<void> => {
    const cachePath = getCacheFilePath(prefix, buffer);
    try {
        await fs.mkdir(CACHE_DIR, { recursive: true });
        await fs.writeFile(cachePath, JSON.stringify(entry, null, 2));
    } catch (cacheError) {
        console.error("Failed to write to cache:", cacheError);
    }
};
