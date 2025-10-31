import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import { authTypeDefs } from "./graphql/typeDefs/auth.typeDefs";
import { authResolvers } from "./graphql/resolvers/auth.resolvers";
import { context } from "./context";

dotenv.config();
connectDB();

const app = express();

const server = new ApolloServer({
  typeDefs: authTypeDefs,
  resolvers: authResolvers,
  context
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ 
    app: app as any, 
    path: "/graphql" 
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}/graphql`));
}

startServer();
