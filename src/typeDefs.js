// typeDefs

export const typeDefs = `#graphql
  type Query {
    greet: String
    users: [User]
    user(id: ID): User
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Mutation {
    createUser(userNew: UserInput!): User
  }

  type User {
    id: ID
    name: String
    email: String
    password: String
    todos: [Todo]
  }

  type Todo {
    by: ID
    title: String
  }
`;
