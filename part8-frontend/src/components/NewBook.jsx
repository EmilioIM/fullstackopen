import { useState, useCallback } from "react";
import PropTypes from "prop-types"; // Importar PropTypes
import { useMutation } from "@apollo/client";
import { CREATE_BOOK, BOOKS, AUTHORS_BORN_COUNT } from "../queries";

const NewBook = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    published: "",
    genre: "",
    genres: [],
  });

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: BOOKS }, { query: AUTHORS_BORN_COUNT }],
    onError: (error) => {
      console.log(error);
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

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

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
    [createBook, formData]
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
};

export default NewBook;
