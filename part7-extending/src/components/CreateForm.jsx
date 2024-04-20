import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/index";
import PropTypes from "prop-types";

const CreateForm = (props) => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};
    if (!content.value.trim()) newErrors.content = "Content is required.";
    if (!author.value.trim()) newErrors.author = "Author is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateFields();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    handleReset();

    props.setNotification(`a new anecdote ${content.value} created!`);

    navigate("/anecdotes");
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <main>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <span>content</span>
          <input {...content} />
          {errors.content && <p className="error-message">{errors.content}</p>}
        </div>
        <div>
          <span>author</span>
          <input {...author} />
          {errors.author && <p className="error-message">{errors.author}</p>}
        </div>
        <div>
          <span>url</span>
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={() => handleReset()}>
          clear
        </button>
      </form>
    </main>
  );
};

CreateForm.propTypes = {
  addNew: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default CreateForm;
