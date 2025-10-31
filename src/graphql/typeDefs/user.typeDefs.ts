import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User
  }

  extend type Mutation {
    updateUser(id: ID!, input: UpdateUserInput!): User!
  }
`;