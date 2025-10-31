import { User } from "../../models/User";
import { createAccessToken, createRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";

export const authResolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (!context.isAuthenticated) throw new Error("غير مصرح لك");
      return context.user;
    },
    refreshToken: async (_: any, { token }: { token: string }) => {
      try {
        const payload: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
        const user = await User.findById(payload.userId);
        if (!user) throw new Error("User not found");

        const accessToken = createAccessToken(user._id.toString());
        const refreshToken = createRefreshToken(user._id.toString());

        return { accessToken, refreshToken, user };
      } catch {
        throw new Error("Invalid refresh token");
      }
    }
  },
  Mutation: {
    register: async (_: any, { firstName, lastName, email, password }: any) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      const user = new User({ firstName, lastName, email, password });
      await user.save();

      const accessToken = createAccessToken(user._id.toString());
      const refreshToken = createRefreshToken(user._id.toString());

      return { accessToken, refreshToken, user };
    },
    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid credentials");

      const valid = await user.comparePassword(password);
      if (!valid) throw new Error("Invalid credentials");

      const accessToken = createAccessToken(user._id.toString());
      const refreshToken = createRefreshToken(user._id.toString());

      return { accessToken, refreshToken, user };
    },
    logout: async () => {
      return true;
    }
  }
};
