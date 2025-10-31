import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createAccessToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || 'default-secret';
  const options: any = { 
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE || '24h'
  };
  return jwt.sign({ userId }, secret, options);
};
