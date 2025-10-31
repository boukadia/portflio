import { User } from "../../models/User";
import { createAccessToken } from "../../utils/jwt";

export const authResolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (!context.isAuthenticated) throw new Error("Unauthorized access");
      return context.user;
    }
  },
  Mutation: {
    register: async (_: any, { firstName, lastName, email, password }: any) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      const user = new User({ firstName, lastName, email, password });
      await user.save();

      const accessToken = createAccessToken(user._id.toString());

      return { accessToken, user };
    },
    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid credentials");

      const valid = await user.comparePassword(password);
      if (!valid) throw new Error("Invalid credentials");

      const accessToken = createAccessToken(user._id.toString());

      return { accessToken, user };
    },
    logout: async () => {
      return true;
    }
  }
};
