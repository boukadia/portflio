import { gql } from 'apollo-server-express';

export const projectTypeDefs = gql`
  type Project {
    id: ID!
    title: String!
    description: String
    technologies: [String!]!
    githubUrl: String
    liveUrl: String
    status: ProjectStatus!
    owner: User!
    createdAt: String!
    updatedAt: String!
  }

  enum ProjectStatus {
    DRAFT
    IN_PROGRESS
    COMPLETED
    ARCHIVED
  }

  input CreateProjectInput {
    title: String!
    description: String
    technologies: [String!]!
    githubUrl: String
    liveUrl: String
    status: ProjectStatus = DRAFT
  }

  input UpdateProjectInput {
    title: String
    description: String
    technologies: [String!]
    githubUrl: String
    liveUrl: String
    status: ProjectStatus
  }

  extend type Query {
    projects: [Project!]!
    project(id: ID!): Project
    myProjects: [Project!]!
  }

  extend type Mutation {
    createProject(input: CreateProjectInput!): Project!
    updateProject(id: ID!, input: UpdateProjectInput!): Project!
    deleteProject(id: ID!): Boolean!
  }
`;