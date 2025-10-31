import jwt from "jsonwebtoken";
import { User } from "./models/User";
import dotenv from "dotenv";
dotenv.config();
export const context = async ({ req, res }: any) => {
  const auth = req.headers.authorization || "";
  let userId: string | undefined;
  let user = null;

  if (auth.startsWith("Bearer ")) {
    const token = auth.replace("Bearer ", "");
    try {
      const payload: any = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
      userId = payload.userId;
      user = await User.findById(userId);
    } catch (error) {
        console.log(error);
      
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
