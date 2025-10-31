import { User } from '../../models/User';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

interface Context {
  user?: any;
  isAuthenticated: boolean;
}

export const userResolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },

    user: async (_: any, { id }: { id: string }) => {
      const user = await User.findById(id);
      if (!user) {
        throw new UserInputError('User not found');
      }
      return user;
    }
  },

  Mutation: {
    updateUser: async (_: any, { id, input }: any, context: Context) => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('Authentication required');
      }

      const user = await User.findByIdAndUpdate(
        id, 
        input, 
        { new: true }
      );

      if (!user) {
        throw new UserInputError('User not found');
      }

      return user;
    }
  }
};