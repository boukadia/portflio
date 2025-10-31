import { gql } from 'apollo-server-express';

export const skillTypeDefs = gql`
  type Skill {
    id: ID!
    name: String!
    level: SkillLevel!
    category: SkillCategory!
    description: String
    yearsOfExperience: Int!
    certificationsCount: Int!
    projectsUsed: Int!
    owner: User!
    createdAt: String!
    updatedAt: String!
  }

  enum SkillLevel {
    BEGINNER
    INTERMEDIATE
    ADVANCED
    EXPERT
  }

  enum SkillCategory {
    FRONTEND
    BACKEND
    DATABASE
    MOBILE
    DEVOPS
    DESIGN
    OTHER
  }

  input CreateSkillInput {
    name: String!
    level: SkillLevel!
    category: SkillCategory!
    description: String
    yearsOfExperience: Int = 0
    certificationsCount: Int = 0
    projectsUsed: Int = 0
  }

  input UpdateSkillInput {
    name: String
    level: SkillLevel
    category: SkillCategory
    description: String
    yearsOfExperience: Int
    certificationsCount: Int
    projectsUsed: Int
  }

  extend type Query {
    skills: [Skill!]!
    skill(id: ID!): Skill
    mySkills: [Skill!]!
    skillsByCategory(category: SkillCategory!): [Skill!]!
  }

  extend type Mutation {
    createSkill(input: CreateSkillInput!): Skill!
    updateSkill(id: ID!, input: UpdateSkillInput!): Skill!
    deleteSkill(id: ID!): Boolean!
  }
`;