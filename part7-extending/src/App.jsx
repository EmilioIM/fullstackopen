import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { triggerNotification } from './features/notificationSlice'
import { setBlogs } from './features/blogSlice'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log({ username, password })
      console.log({ user })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(triggerNotification(`Error: ${exception.message}`, 'error'))
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(user.token)
    window.localStorage.removeItem('loggedUser')
  }

  const handleAddBlog = async (blog) => {
    blog.author = user.name
    console.log('Adding new blog', blog)
    // Lógica para añadir un nuevo blog
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(blog)
      dispatch(setBlogs(blogs.concat(createdBlog)))
      dispatch(triggerNotification(`Nuevo blog '${createdBlog.title}' de ${createdBlog.author} añadido con éxito`, 'success'))
    } catch (exception) {
      dispatch(triggerNotification(`Error al añadir blog: ${exception.message}`, 'error'))
    }
  }

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

  return (
    <>
      <Notification />

      {user === null
        ? (
          <Togglable buttonLabel="login">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        )
        : (
          <div>
            <span>{`${user.name} logged in `}</span>
            <button onClick={handleLogout}>logout</button>

            <h3>Blogs</h3>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createBlog={handleAddBlog} />
            </Togglable>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  updateBlog={updateBlog}
                  deleteBlog={deleteBlog}
                />
              ))}
          </div>
        )}
    </>
  )
}

export default App
