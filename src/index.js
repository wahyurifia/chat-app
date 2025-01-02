import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import jwt from "jsonwebtoken";

const { url } = await startStandaloneServer(
  new ApolloServer({ typeDefs, resolvers }),
  {
    listen: { port: 4000 },
    context: ({ req }) => {
      const { authorization } = req.headers;

      if (authorization) {
        const { userId } = jwt.verify(authorization, process.env.SECRET_KEY);
        return { userId };
      }
    },
  }
);

console.log(`server running on port ${url}`);
