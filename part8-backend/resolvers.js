import Book from "./models/book.js";
import Author from "./models/author.js";
import User from "./models/user.js";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        filter.author = author ? author._id : null;
      }

      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }

      return await Book.find(filter).populate("author");
    },
    allAuthors: async () => await Author.find({}).populate("books"),
    allUsers: async () => await User.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  // Book: {
  //   author: async (root) => {
  //     const author = await Author.findById(root.author);
  //     return author.name;
  //   },
  // },
  Author: {
    bookCount: async (root) => {
      return root.books.length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      // Verificar que el usuario esté autenticado
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError(
          "You are not authorized to perform this action.",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });

        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          });
        }
      }

      const book = new Book({ ...args, author: author });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      // Agregar el libro al autor
      author.books.push(book);
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Adding book to author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      // Verificar que el usuario esté autenticado
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError(
          "You are not authorized to perform this action.",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Updating born failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      try {
        return await user.save();
      } catch (error) {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "pass") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

export default resolvers;
