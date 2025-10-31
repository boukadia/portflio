import { Project } from '../../models/Project';
import { IUser } from '../../models/User';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

interface Context {
  user?: IUser;
  isAuthenticated: boolean;
}

export const projectResolvers = {
  Query: {
    projects: async () => {
      return await Project.find().populate('owner');
    },

    project: async (_: any, { id }: { id: string }) => {
      const project = await Project.findById(id).populate('owner');
      if (!project) {
        throw new UserInputError('Project not found');
      }
      return project;
    },

    myProjects: async (_: any, __: any, context: Context) => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('Authentication required');
      }
      return await Project.find({ owner: context.user!._id }).populate('owner');
    }
  },

  Mutation: {
    createProject: async (_: any, { input }: any, context: Context) => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('Authentication required to create project');
      }

      const project = new Project({
        ...input,
        owner: context.user!._id
      });

      await project.save();
      return await project.populate('owner');
    },

    updateProject: async (_: any, { id, input }: any, context: Context) => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('Authentication required to update project');
      }

      const project = await Project.findById(id);
      if (!project) {
        throw new UserInputError('Project not found');
      }

      if (project.owner.toString() !== context.user!._id.toString()) {
        throw new AuthenticationError('Not authorized to update this project');
      }
      Object.assign(project, input);
      await project.save();
      
      return await project.populate('owner');
    },

    deleteProject: async (_: any, { id }: { id: string }, context: Context) => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('Authentication required to delete project');
      }

      const project = await Project.findById(id);
      if (!project) {
        throw new UserInputError('Project not found');
      }

      if (project.owner.toString() !== context.user!._id.toString()) {
        throw new AuthenticationError('Not authorized to delete this project');
      }

      await project.deleteOne();
      return true;
    }
  }
};