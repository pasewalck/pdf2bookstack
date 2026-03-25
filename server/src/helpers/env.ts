import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET configuration is missing.");

if (!process.env.API_KEY) throw new Error("API_KEY configuration is missing.");

if (!process.env.BOOKSTACK_BASE_URL)
    throw new Error("BOOKSTACK_BASE_URL configuration is missing.");

if (!process.env.BOOKSTACK_TOKEN_ID)
    throw new Error("BOOKSTACK_TOKEN_ID configuration is missing.");

if (!process.env.BOOKSTACK_TOKEN_SECRET)
    throw new Error("BOOKSTACK_TOKEN_SECRET configuration is missing.");

export default {
    PORT: process.env.PORT || 3001,
    JWT_SECRET: process.env.JWT_SECRET,
    API_KEY: process.env.API_KEY,
    API_URL: process.env.API_URL || "https://www.datalab.to/api/v1/convert",
    BOOKSTACK_BASE_URL: process.env.BOOKSTACK_BASE_URL,
    BOOKSTACK_TOKEN_ID: process.env.BOOKSTACK_TOKEN_ID,
    BOOKSTACK_TOKEN_SECRET: process.env.BOOKSTACK_TOKEN_SECRET,
};
