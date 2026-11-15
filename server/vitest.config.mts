import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",
        globals: true,
        include: ["tests/**/*.test.ts"],
        env: {
            JWT_SECRET: "test-jwt-secret",
            CONVERT_API_KEY: "test-api-key",
            BOOKSTACK_BASE_URL: "https://bookstack.test",
            BOOKSTACK_TOKEN_ID: "test-token-id",
            BOOKSTACK_TOKEN_SECRET: "test-token-secret",
        },
    },
});
