import zod from "zod";

export const envSchema = zod.object({
  FRONTEND_URL: zod.coerce.string().default("*"),
  PORT: zod.coerce.string().default("3000"),
  MONGO_URI: zod.coerce.string().default("mongodb://localhost/mock"),
  JWT_ACCESS_SECRET: zod.coerce.string().default("mock-secret"),
  JWT_REFRESH_SECRET: zod.coerce.string().default("mock-refresh"),
  CLOUDINARY_CLOUD_NAME: zod.coerce.string().default("mock-cloud"),
  CLOUDINARY_API_KEY: zod.coerce.string().default("mock-key"),
  CLOUDINARY_API_SECRET: zod.coerce.string().default("mock-secret"),
  RABBITMQ_URL: zod.coerce.string().default("amqp://localhost"),
  SMTP_HOST: zod.coerce.string().default("smtp.example.com"),
  SMTP_PORT: zod.coerce.string().default("587"),
  SMTP_USER: zod.coerce.string().default("user"),
  SMTP_PASS: zod.coerce.string().default("pass"),

  NODE_ENV: zod.coerce.string().default("development"),
});

export type EnvConfig = zod.infer<typeof envSchema>;
