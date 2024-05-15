import { useState, useCallback } from "react";
import PropTypes from "prop-types"; // Importar PropTypes
import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_BOOK, BOOKS, AUTHORS_BORN_COUNT } from "../queries";
import { updateCache } from "../App";

const NewBook = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    published: "",
    genre: "",
    genres: [],
  });

  const client = useApolloClient();

  const [createBook] = useMutation(CREATE_BOOK, {
    // refetchQueries: [
    //   {
    //     query: BOOKS,
    //     // variables: { genre: mutationResult.data.addBook.genres },
    //   },
    //   { query: AUTHORS_BORN_COUNT },
    // ],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      props.setError(messages);
    },
    // update: (cache, response) => {
    //   const newBook = response.data.addBook;
    //   const existingBooks = cache.readQuery({ query: BOOKS });

    //   cache.writeQuery({
    //     query: BOOKS,
    //     data: {
    //       allBooks: [...existingBooks.allBooks, newBook],
    //     },
    //   });
    // },
    update: (cache = client.cache, response) => {
      console.log({ cache, response });
      if (response.data) {
        updateCache(cache, BOOKS, { genre: null }, response.data.addBook);
      }
    },
  });

  const handleChange = useCallback(({ target }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [target.name]: target.value,
    }));
  }, []);

  const handleGenreAdd = useCallback(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      genres: [...prevFormData.genres, prevFormData.genre],
      genre: "", // Clear the genre input after adding
    }));
  }, []);

  const isValidForm = (formData) => {
    const requiredFields = ["title", "author", "published", "genres"];
    return requiredFields.every(
      (field) => formData[field] && formData[field].length > 0
    );
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!isValidForm(formData)) {
        alert("Todos los campos son obligatorios");
        return;
      }
      createBook({
        variables: {
          title: formData.title,
          author: formData.author,
          published: Number(formData.published),
          genres: formData.genres,
        },
      });

      // Clear form fields
      setFormData({
        title: "",
        author: "",
        published: "",
        genre: "",
        genres: [],
      });
    },
    [createBook, formData, client]
  );

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          author
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div>
          published
          <input
            name="published"
            type="number"
            value={formData.published}
            onChange={handleChange}
          />
        </div>
        <div>
          <input name="genre" value={formData.genre} onChange={handleChange} />
          <button onClick={handleGenreAdd} type="button">
            add genre
          </button>
        </div>
        <div>genres: {formData.genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

// Validación de PropTypes
NewBook.propTypes = {
  show: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
};

export default NewBook;
