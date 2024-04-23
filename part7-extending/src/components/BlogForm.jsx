import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
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
      <div className='mb-3'>
        <label className='form-label'>Title</label>
        <input
          id="title"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
          placeholder="Título"
          className='form-control'
        />
      </div>
      <div className='mb-4'>
        <label className='form-label'>URL</label>
        <input
          id="url"
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
          placeholder="URL"
          className='form-control'
        />
      </div>
      <button type="submit" className='btn btn-primary mb-3'>save</button>
    </form>
  )
}

export default BlogForm
