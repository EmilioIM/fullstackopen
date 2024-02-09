import { useState } from 'react'

const BlogForm = ({
  createBlog,
}) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
                Title: <input
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
          placeholder="Título"/>
      </div>
      <div>
                URL: <input
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
          placeholder="URL"/>
      </div>
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm