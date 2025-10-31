import mongoose, { Schema, Document, Types } from 'mongoose';

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS', 
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

export interface IProject extends Document {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  status: ProjectStatus;
  featured: boolean;
  likes: number;
  views: number;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  technologies: { type: [String], default: [], required: true },
  githubUrl: { type: String, trim: true },
  liveUrl: { type: String, trim: true },
  imageUrl: { type: String, trim: true },
  status: { 
    type: String, 
    enum: Object.values(ProjectStatus),
    default: ProjectStatus.DRAFT 
  },
  featured: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// ProjectSchema.methods.toJSON = function() {
//   const obj = this.toObject();
//   // Convert _id to id
//   obj.id = obj._id;
//   delete obj._id;
//   delete obj.__v;
//   return obj;
// };

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
