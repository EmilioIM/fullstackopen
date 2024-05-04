import { gql } from "@apollo/client";

export const AUTHORS_BORN_COUNT = gql`
  query AllAuthors {
    allAuthors {
      bookCount
      born
      name
    }
  }
`;

export const BOOKS = gql`
  query AllAuthors {
    allBooks {
      title
      author
      published
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation Mutation(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`;
