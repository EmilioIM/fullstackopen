import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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
        username, password,
      })
      console.log({ username, password })
      console.log({ user })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(`Error: ${exception.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(user.token)
    window.localStorage.removeItem('loggedUser')
  }

  const handleAddBlog = async (blog) => {
    blog.author = user.name;
    console.log('Adding new blog', blog);
    // Lógica para añadir un nuevo blog
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(blog);
      setBlogs(blogs.concat(createdBlog));
      setMessage(`Nuevo blog '${createdBlog.title}' de ${createdBlog.author} añadido con éxito`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage(`Error al añadir blog: ${exception.message}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };



  return (
    <>
      <Notification message={errorMessage} type={"error"} />
      <Notification message={message} type={"success"} />

      {user == null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <span>{`${user.name} logged in `}</span>
          <button onClick={handleLogout}>logout</button>

          <h3>Blogs</h3>
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm createBlog={handleAddBlog} />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </>
  )
}

export default App