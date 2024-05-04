import { gql, useQuery } from "@apollo/client";
import PropTypes from "prop-types";

const AUTHORS_BORN_COUNT = gql`
  query AllAuthors {
    allAuthors {
      bookCount
      born
      name
    }
  }
`;

const Authors = (props) => {
  let authors = [];
  const result = useQuery(AUTHORS_BORN_COUNT);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  } else {
    authors = result.data.allAuthors;
  }

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
    </div>
  );
};

// Validación de PropTypes
Authors.propTypes = {
  show: PropTypes.bool.isRequired, // Se espera que 'show' sea un booleano y es requerido
};

export default Authors;
