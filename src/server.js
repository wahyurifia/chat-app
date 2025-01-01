import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

const { url } = await startStandaloneServer(
  new ApolloServer({ typeDefs, resolvers }),
  {
    listen: { port: 4000 },
    context: () => {
      let userLoggedIn = true;

      return {
        userLoggedIn,
      };
    },
  }
);

console.log(`Server ready at: ${url}`);
