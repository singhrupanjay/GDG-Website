import { config } from "dotenv";
import { envSchema } from "../validation/env.validation";
config();

export const env_Constant = envSchema.parse(process.env);
