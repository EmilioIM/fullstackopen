import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { AUTHORS_BORN_COUNT, UPDATE_AUTHOR_BIRTHYEAR } from "../queries";

const Authors = (props) => {
  let authors = [];
  const result = useQuery(AUTHORS_BORN_COUNT);
  const [formData, setFormData] = useState({
    selectedAuthor: "",
    born: null,
  });
  const [updateAuthorBirthyear] = useMutation(UPDATE_AUTHOR_BIRTHYEAR, {
    refetchQueries: [{ query: AUTHORS_BORN_COUNT }],
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  } else {
    authors = result.data.allAuthors;
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateAuthorBirthyear({
      variables: {
        name: formData.selectedAuthor,
        setBornTo: parseInt(formData.born),
      },
    });
    setFormData({
      selectedAuthor: "",
      born: "",
    });
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="selectedAuthor"
          value={formData.selectedAuthor}
          onChange={handleChange}
        >
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born
          <input
            type="number"
            name="born"
            value={formData.born || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={!formData.born}>
          update author
        </button>
      </form>
    </div>
  );
};

// Validación de PropTypes
Authors.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Authors;
