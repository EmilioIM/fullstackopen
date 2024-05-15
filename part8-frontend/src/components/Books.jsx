import { useState } from "react";
import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { BOOKS } from "../queries";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const result = useQuery(BOOKS, {
    variables: { genre: selectedGenre },
  });

  //const result = useQuery(BOOKS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  // Obtener todos los géneros únicos
  const genres = [...new Set(books.flatMap((book) => book.genres))];

  return (
    <div>
      <h2>books</h2>

      <button onClick={() => setSelectedGenre(null)}>all genres</button>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => setSelectedGenre(genre)}
          style={{
            backgroundColor: genre === selectedGenre ? "lightblue" : "white",
          }}
        >
          {genre}
        </button>
      ))}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Validación de PropTypes
Books.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Books;
