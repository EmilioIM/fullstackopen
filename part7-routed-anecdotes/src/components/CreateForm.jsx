import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

const CreateForm = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const validateFields = () => {
    const newErrors = {};
    if (!content.trim()) newErrors.content = 'Content is required.';
    if (!author.trim()) newErrors.author = 'Author is required.';
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
      content,
      author,
      info,
      votes: 0
    })

    props.setNotification(`a new anecdote ${content} created!`)

    navigate('/anecdotes')
  }

  return (
    <main>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <span>content</span>
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
          {errors.content && <p className="error-message">{errors.content}</p>}
        </div>
        <div>
          <span>author</span>
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
          {errors.author && <p className="error-message">{errors.author}</p>}
        </div>
        <div>
          <span>url</span>
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </main>
  )

}

CreateForm.propTypes = {
  addNew: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
}

export default CreateForm