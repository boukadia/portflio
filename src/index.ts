import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import { typeDefs } from './graphql/schemas';
import { authResolvers } from './graphql/resolvers/auth.resolvers';
import { projectResolvers } from './graphql/resolvers/project.resolvers';
import { userResolvers } from './graphql/resolvers/user.resolvers';
import { skillResolvers } from './graphql/resolvers/skill.resolvers';
import { context } from "./context";

// Load environment variables
dotenv.config();

async function startServer() {
  try {
    // Connect to database
    await connectDB();
    console.log('✅ Database connected');

    // Create Express app
    const app = express();

    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers: [authResolvers, projectResolvers, userResolvers, skillResolvers],
      context: context  // Use custom context
    });

    // Start server
    await server.start();
    server.applyMiddleware({ 
      app: app as any, 
      path: "/graphql" 
    });

    // Run the server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(` Server ready at http://localhost:${PORT}/graphql`);
    });

  } catch (error) {
    console.error(' Server startup error:', error);
    process.exit(1);
  }
}

startServer();