import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createAccessToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || 'default-secret';
  const options: any = { 
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE || '15m'
  };
  return jwt.sign({ userId }, secret, options);
};

export const createRefreshToken = (userId: string): string => {
  const secret = process.env.JWT_REFRESH_SECRET || 'default-refresh-secret';
  const options: any = { 
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '7d'
  };
  return jwt.sign({ userId }, secret, options);
};
