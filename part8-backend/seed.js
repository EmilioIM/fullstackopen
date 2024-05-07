const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

const authorsData = [
  { name: "Robert Martin", born: 1952 },
  { name: "Martin Fowler", born: 1963 },
  { name: "Fyodor Dostoevsky", born: 1821 },
  { name: "Joshua Kerievsky" },
  { name: "Sandi Metz" },
];

const booksData = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "revolution"],
  },
];

async function seedDB() {
  try {
    await Author.deleteMany({});
    await Book.deleteMany({});

    for (let authorData of authorsData) {
      const author = new Author(authorData);
      await author.save();
    }

    for (let bookData of booksData) {
      const author = await Author.findOne({ name: bookData.author });
      const book = new Book({ ...bookData, author: author._id });
      await book.save();
    }

    console.log("Database seeded!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database", error);
  }
}

seedDB();
