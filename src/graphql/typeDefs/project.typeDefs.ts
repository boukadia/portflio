import { gql } from 'apollo-server-express';

export const projectTypeDefs = gql`
  type Project {
    id: ID!
    title: String!
    description: String!
    techStack: [String!]!
    owner: User!
    createdAt: String!
    updatedAt: String!
  }

  input CreateProjectInput {
    title: String!
    description: String!
    techStack: [String!]!
  }

  input UpdateProjectInput {
    title: String
    description: String
    techStack: [String!]
  }

  extend type Query {
    # جلب جميع المشاريع
    projects: [Project!]!
    # جلب مشروع واحد بالمعرف
    project(id: ID!): Project
    # جلب مشاريع المستخدم الحالي
    myProjects: [Project!]!
  }

  extend type Mutation {
    # إنشاء مشروع جديد
    createProject(input: CreateProjectInput!): Project!
    # تحديث مشروع
    updateProject(id: ID!, input: UpdateProjectInput!): Project!
    # حذف مشروع
    deleteProject(id: ID!): Boolean!
  }
`;