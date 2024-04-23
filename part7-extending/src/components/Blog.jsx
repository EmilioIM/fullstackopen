import { useParams } from 'react-router-dom'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../features/blogSlice'
import { triggerNotification } from '../features/notificationSlice'


const Blog = ({ user }) => {

  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const dispatch = useDispatch()


  const updateBlog = (updatedBlog) => {
    dispatch(setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))))
  }

  const deleteBlog = (id) => {
    try {
      blogService.remove(id)
      dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))
      dispatch(triggerNotification('Blog eliminado con éxito', 'success'))
    } catch (error) {
      dispatch(triggerNotification(`Error al eliminar blog: ${error.message}, 'error'`))
    }
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    blogService.update(blog.id, updatedBlog)
    updateBlog(updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }


  return (
    <ul className="blog">
      <h1>{blog.title}</h1>
      <div data-testid="blog-url">{blog.url}</div>
      <div data-testid="blog-likes">
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      <div data-testid="blog-author">
        added by {blog.author}
      </div>
      {user && user.name === blog.author && (
        <button onClick={handleRemove}>remove</button>
      )}
    </ul>
  )
}

export default Blog
