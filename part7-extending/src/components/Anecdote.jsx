import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((a) => a.id === Number(id));

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info visit{" "}
        <a href="{anecdote.info}" target="_blank">
          {anecdote.info}
        </a>
      </p>
    </div>
  );
};

Anecdote.propTypes = {
  anecdotes: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ),
};

export default Anecdote;
