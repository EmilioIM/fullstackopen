import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

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
    setUser(null);
    window.localStorage.removeItem('loggedUser')
  }

  const handleAddBlog = async (event) => {
    event.preventDefault();
    newBlog.author = user.name;
    console.log('Adding new blog', newBlog);
    // Lógica para añadir un nuevo blog
    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      setNewBlog({ title: '', author: '', url: '' });
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

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Notification message={errorMessage} type={"error"} />
      <Notification message={message} type={"success"} />

      {user == null ? (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      ) : (
        <div>
          <p>{`${user.name} logged in`}</p>
          <button onClick={handleLogout}>logout</button>

          <h3>Blogs</h3>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          
          <form onSubmit={handleAddBlog} style={{ marginTop: "20px" }}>
            <div>
              Título: <input name="title" value={newBlog.title} onChange={handleBlogChange} />
            </div>
            <div>
              URL: <input name="url" value={newBlog.url} onChange={handleBlogChange} />
            </div>
            <button type="submit">save</button>
          </form>
        </div>
      )}

    </div>
  )
}

export default App