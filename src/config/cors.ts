import { config } from "dotenv";
import { cors } from "hono/cors";
config();

const allowedOrigins = process.env.ANIWATCH_API_CORS_ALLOWED_ORIGINS
  ? process.env.ANIWATCH_API_CORS_ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
  : ["*"];

const corsConfig = cors({
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  maxAge: 86400,
  credentials: true,
  origin: (origin) => {
    if (allowedOrigins.includes("*")) return "*";
    return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  },
  allowHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Cookie",
    "Access-Control-Allow-Credentials"
  ],
});

export default corsConfig;
