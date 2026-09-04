import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import { env_Constant } from "./constant/env.constant";
import { route } from "./routes/routes";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: env_Constant.FRONTEND_URL.split(",").map((s) => s.trim()),
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: env_Constant.NODE_ENV === "production" ? 100 : 1000,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
app.use(limiter);

app.use(route);

export default app;
