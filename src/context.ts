import jwt from "jsonwebtoken";
import { User } from "./models/User";
import dotenv from "dotenv";
dotenv.config();
export const context = async ({ req, res }: any) => {
  const auth = req.headers.authorization || "";
  let userId: string | undefined;
  let user = null;

  if (auth.startsWith("Bearer ")) {
    const token = auth.replace("Bearer ", "").trim();
    
    // التحقق من أن التوكين ليس فارغاً وله شكل صحيح
    if (token && token.length > 10 && token.includes('.')) {
      try {
        const payload: any = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
        userId = payload.userId;
        user = await User.findById(userId);
      } catch (error) {
        console.log('JWT Error:', error instanceof Error ? error.message : 'Unknown error');
        // لا نرمي خطأ، فقط نسجل ونتابع بدون مستخدم
      }
    } else {
      console.log('Invalid token format');
    }
  }

  return { 
    req, 
    res, 
    userId, 
    user,
    isAuthenticated: !!user 
  };
};
