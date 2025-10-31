import { gql } from 'apollo-server-express';
import { projectTypeDefs } from '../typeDefs/project.typeDefs';
import { userTypeDefs } from '../typeDefs/user.typeDefs';
import { skillTypeDefs } from '../typeDefs/skill.typeDefs';
import { authTypeDefs } from './auth.schema';

const rootTypeDefs = gql`
  # Base Types
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [
  rootTypeDefs, 
  projectTypeDefs, 
  userTypeDefs, 
  skillTypeDefs,
  authTypeDefs
];
