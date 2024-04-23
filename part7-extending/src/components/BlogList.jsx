import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { setBlogs } from '../features/blogSlice'
import { triggerNotification } from '../features/notificationSlice'
import {
  Routes,
  Route,
  Link
} from 'react-router-dom'


const BlogList = ({ user }) => {

  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [dispatch])


  const handleAddBlog = async (blog) => {
    blog.author = user.name
    // console.log('Adding new blog', blog)
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(blog)
      dispatch(setBlogs(blogs.concat(createdBlog)))
      dispatch(triggerNotification(`Nuevo blog '${createdBlog.title}' de ${createdBlog.author} añadido con éxito`, 'success'))
    } catch (exception) {
      dispatch(triggerNotification(`Error al añadir blog: ${exception.message}`, 'error'))
    }
  }



  return (
    <div>
      <h3>Blogs</h3>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleAddBlog} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}, {blog.author}</Link>
          </div>

        ))}
    </div>
  )
}

export default BlogList