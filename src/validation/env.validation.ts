import zod from "zod";

export const envSchema = zod.object({
  FRONTEND_URL: zod.string(),
  PORT: zod.string().default("3000"),
  MONGO_URI: zod.string(),
  JWT_ACCESS_SECRET: zod.string(),
  JWT_REFRESH_SECRET: zod.string(),
  CLOUDINARY_CLOUD_NAME: zod.string(),
  CLOUDINARY_API_KEY: zod.string(),
  CLOUDINARY_API_SECRET: zod.string(),
  SMTP_HOST: zod.string(),
  SMTP_PORT: zod.string(),
  SMTP_USER: zod.string(),
  SMTP_PASS: zod.string(),

  NODE_ENV: zod
    .enum(["development", "production", "test"])
    .default("development"),
});

export type EnvConfig = zod.infer<typeof envSchema>;
