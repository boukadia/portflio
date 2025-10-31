// import mongoose from 'mongoose';

// export async function connectDB(): Promise<void> {
//   try {
//     await mongoose.connect('mongodb://127.0.0.1:27017/graphql_mvc_ts');
//     console.log(' MongoDB connecté');
//   } catch (error) {
//     console.error(' Erreur de connexion MongoDB :', error);
//   }
// }


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};
