import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGO_URI = process.env.MONGO_URI;

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
