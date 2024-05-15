import { ApolloServer } from "@apollo/server";
import mongoose from "mongoose";
import User from "./models/user.js";
import { config as dotenvConfig } from "dotenv";
dotenvConfig(); // Load environment variables from .env file
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import cors from "cors";
import http from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

mongoose
  .set("debug", true)
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// setup is now within a function
const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  const userCache = {};
  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          );
          if (userCache[decodedToken.id]) {
            return { currentUser: userCache[decodedToken.id] };
          }
          const currentUser = await User.findById(decodedToken.id);
          userCache[decodedToken.id] = currentUser;
          return { currentUser };
        }
      },
    })
  );

  httpServer.listen(process.env.PORT || 4000, () =>
    console.log(
      `Server is now running on http://localhost:${process.env.PORT || 4000}`
    )
  );
};

start();
