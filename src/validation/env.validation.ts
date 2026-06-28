import zod from "zod";

export const envSchema = zod.object({
  FRONTEND_URL: zod.string(),
  PORT: zod.string().default("3000"),
  MONGO_URI: zod.string(),
  NODE_ENV: zod
    .enum(["development", "production", "test"])
    .default("development"),
});

export type EnvConfig = zod.infer<typeof envSchema>;
