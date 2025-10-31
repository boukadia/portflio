import { Skill } from '../../models/Skill';
import { IUser } from '../../models/User';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

interface Context {
  user?: IUser;
  isAuthenticated: boolean;
}

export const skillResolvers = {
  Query: {
    skills: async () => {
      return await Skill.find().populate('owner');
    },

    skill: async (_: any, { id }: { id: string }) => {
      const skill = await Skill.findById(id).populate('owner');
      if (!skill) {
        throw new UserInputError('Skill not found');
      }
      return skill;
    },

    mySkills: async (_: any, __: any, context: Context) => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('Authentication required');
      }
      return await Skill.find({ owner: context.user!._id }).populate('owner');
    },

    skillsByCategory: async (_: any, { category }: { category: string }) => {
      return await Skill.find({ category }).populate('owner');
    }
  },

  Mutation: {
    createSkill: async (_: any, { input }: any, context: Context) => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('Authentication required to create skill');
      }

      const skill = new Skill({
        ...input,
        owner: context.user!._id
      });

      await skill.save();
      return await skill.populate('owner');
    },

    updateSkill: async (_: any, { id, input }: any, context: Context) => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('Authentication required to update skill');
      }

      const skill = await Skill.findById(id);
      if (!skill) {
        throw new UserInputError('Skill not found');
      }

      if (skill.owner.toString() !== context.user!._id.toString()) {
        throw new AuthenticationError('Not authorized to update this skill');
      }

      Object.assign(skill, input);
      await skill.save();
      
      return await skill.populate('owner');
    },

    deleteSkill: async (_: any, { id }: { id: string }, context: Context) => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('Authentication required to delete skill');
      }

      const skill = await Skill.findById(id);
      if (!skill) {
        throw new UserInputError('Skill not found');
      }

      if (skill.owner.toString() !== context.user!._id.toString()) {
        throw new AuthenticationError('Not authorized to delete this skill');
      }

      await skill.deleteOne();
      return true;
    }
  }
};