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
    origin: env_Constant.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: env_Constant.NODE_ENV === "production" ? 100 : 1000,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(limiter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "server is Runing , .." });
});

app.use(route);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.name === 'MongooseError' || err.name === 'MongoNetworkError' || err.message?.includes('buffering timed out')) {
    console.warn('[AI Studio] Database offline — returning mock empty response');
    if (req.method === 'GET') {
      return res.json(req.path.endsWith('s') || req.path.endsWith('s/') ? [] : {});
    }
    return res.status(503).json({ error: 'Service temporarily unavailable (database offline)' });
  }
  next(err);
});

export default app;
