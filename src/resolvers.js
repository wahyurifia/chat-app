import { todos, users } from "./data.js";
import { randomUUID } from "crypto";

export const resolvers = {
  Query: {
    greet: () => "Hello World!",
    users: () => users,
    user: (_, { id }, { userLoggedIn }) => {
      console.log("Context userLoggedIn in resolver:", userLoggedIn);

      return users.find((item) => item.id == id);
    },
  },
  User: {
    todos: (parent) => {
      return todos.filter((todo) => todo.by == parent.id);
    },
  },
  Mutation: {
    createUser: (_, { userNew }) => {
      const newUser = {
        id: randomUUID(),
        ...userNew,
      };
      users.push(newUser);
      return newUser;
    },
  },
};
