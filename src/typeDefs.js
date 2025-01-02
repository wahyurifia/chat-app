const typeDefs = `#graphql
    scalar DateTime
    
    type Query{
        greet: String
        users: [User]
        messageByUser(penerimaId: String!): [Message]
    }
    
    type Mutation{
        signUp(userNew: register!): User
        signIn(userLog: login!): Token
        createMessage(penerimaId: String!, text: String): Message
    }

    input login{
        email: String!
        password: String!
    }

    input register{
        name: String!
        email: String!
        password: String!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        password: String!
        createdAt: DateTime!
    }

    type Message {
        id:ID!
        text: String!
        penerimaId: String!
        pengirimId: String!
        createdAt: DateTime!
    }

    type Token {
         token: String!
    }
`;

export default typeDefs;
