import { Router } from "express";
import multer from "multer";
import { verifyBookstackToken } from "../middleware/auth";
import { doUpload, health, tokenInfo } from "../controllers/main";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/verify", verifyBookstackToken, tokenInfo as any);
router.get("/health", health as any);
router.post("/upload", verifyBookstackToken, upload.single("file"), doUpload as any);

export default router;
