import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    blogService.update(blog.id, updatedBlog)
    updateBlog(updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  console.log('User Name:', user.name, 'Blog:', blog)

  return (
    <ul style={blogStyle} className='blog'>
      {blog.title}
      <Togglable buttonLabel={'view'}>
        <div data-testid="blog-url">{blog.url}</div>
        <div data-testid="blog-likes">
          {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div data-testid="blog-author">{blog.author}</div>
        <br/>
        {user && user.name === blog.author && <button onClick={handleRemove}>remove</button>}
        <br/>
      </Togglable>
    </ul>
  )
}

export default Blog