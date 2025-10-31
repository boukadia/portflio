import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProject extends Document {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  link?: string;
  repo?: string;
  techStack?: string[];
  startDate?: Date | null;
  endDate?: Date | null;
  isPublished: boolean;
  owner: Types.ObjectId; // reference to User
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  link: { type: String, trim: true },
  repo: { type: String, trim: true },
  techStack: { type: [String], default: [] },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  isPublished: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Optional: helper to expose a clean object without internal fields
ProjectSchema.methods.toJSON = function() {
  const obj = this.toObject();
  // Convert _id to id
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
