import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { setBlogs } from '../features/blogSlice'
import { triggerNotification } from '../features/notificationSlice'


const Blog = ({ user }) => {
  const { id } = useParams()

  const [comment, setComment] = useState('')

  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [blogs.length, dispatch])

  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

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

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    addComment(blog.id, comment)
    setComment('')
  }

  const addComment = async (id, comment) => {
    try {
      const updatedBlog = await blogService.addComment(id, comment)
      updateBlog(updatedBlog)
    } catch (error) {
      console.error(`Error adding comment: ${error.message}`)
    }
  }


  return (
    <>
      {blog !== undefined
        ? (
          <>
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

            <h2>comments</h2>
            <form onSubmit={handleCommentSubmit} >
              <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
              <button type="submit">add comment</button>
            </form>
            { blog.comments
              ? (
                <ul>
                  {blog.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              ) : (
                <p>No comments yet</p>
              )}
          </>
        ):(
          <p>Loading...</p>
        )}

    </>
  )
}

export default Blog
