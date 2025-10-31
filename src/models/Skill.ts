import mongoose, { Schema, Document, Types } from 'mongoose';

export enum SkillLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}

export enum SkillCategory {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
  DATABASE = 'DATABASE',
  MOBILE = 'MOBILE',
  DEVOPS = 'DEVOPS',
  DESIGN = 'DESIGN',
  OTHER = 'OTHER'
}

export interface ISkill extends Document {
  _id: Types.ObjectId;
  name: string;
  level: SkillLevel;
  category: SkillCategory;
  description?: string;
  yearsOfExperience: number;
  certificationsCount: number;
  projectsUsed: number;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true, trim: true },
  level: { 
    type: String, 
    enum: Object.values(SkillLevel),
    required: true 
  },
  category: { 
    type: String, 
    enum: Object.values(SkillCategory),
    required: true 
  },
  description: { type: String, trim: true },
  yearsOfExperience: { type: Number, default: 0, min: 0 },
  certificationsCount: { type: Number, default: 0, min: 0 },
  projectsUsed: { type: Number, default: 0, min: 0 },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Skill = mongoose.model<ISkill>('Skill', SkillSchema);
