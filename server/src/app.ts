import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api";
import env from "./helpers/env";

const app = express();

const allowedOrigin = env.ALLOWED_ORIGIN;
app.use(
    cors({
        origin: allowedOrigin,
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

export default app;
