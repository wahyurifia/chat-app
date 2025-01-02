import { PrismaClient } from "@prisma/client";
import { AuthenticationError } from "apollo-server-errors";
import { compareSync, hashSync } from "bcrypt";
import { DateTimeResolver } from "graphql-scalars";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    greet: () => "Hello World!",
    users: async (_, args, { userId }) => {
      if (!userId) throw new AuthenticationError("you must be logged in!");
      return await prisma.user.findMany({
        orderBy: {
          createAt: "desc",
        },
        where: {
          id: {
            not: userId,
          },
        },
      });
    },
    user: async (_, { id }) => {
      const user = await prisma.user.findFirst({ where: { id } });
      if (!user) throw new AuthenticationError("user not found!");

      return user;
    },
  },
  Mutation: {
    signUp: async (_, { userNew }) => {
      const user = await prisma.user.findUnique({
        where: { email: userNew.email },
      });
      if (user) throw new AuthenticationError("Email already exists!");

      const hashPassword = hashSync(userNew.password, 10);

      const data = await prisma.user.create({
        data: {
          ...userNew,
          password: hashPassword,
        },
      });
      return data;
    },
    signIn: async (_, { userLog }) => {
      const user = await prisma.user.findUnique({
        where: { email: userLog.email },
      });
      if (!user) {
        throw new AuthenticationError("wrong email!");
      } else if (!compareSync(userLog.password, user.password)) {
        throw new AuthenticationError("wrong password!");
      }
      const SECRET_KEY = process.env.SECRET_KEY || "wadjkanandjandladnawllakw";

      const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: "1h",
      });
      return { token };
    },
    createMessage: async (_, { penerimaId, text }, { userId }) => {
      if (!userId) throw new AuthenticationError("you must be logged in!");

      const message = await prisma.message.create({
        data: {
          penerimaId,
          text,
          pengirimId: userId,
        },
      });
      return message;
    },
  },
};

export default resolvers;
