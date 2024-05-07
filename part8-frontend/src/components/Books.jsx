import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { BOOKS } from "../queries";

const Books = (props) => {
  const result = useQuery(BOOKS);

  if (!props.show) {
    return null;
  }

  let books = [];

  if (result.loading) {
    return <div>loading...</div>;
  } else {
    books = result.data.allBooks;
  }

  return (
    <div>
      <h2>books</h2>

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
