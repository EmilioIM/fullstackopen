import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { triggerNotification } from './features/notificationSlice'
import { setLoginUser } from './features/loginUserSlice'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Blog from './components/Blog'

const App = () => {
  const [username, setLoginUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loginUser)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoginUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

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
      dispatch(setLoginUser(user))
      setLoginUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(triggerNotification(`Error: ${exception.message}`, 'error'))
    }
  }

  const handleLogout = () => {
    dispatch(setLoginUser(null))
    blogService.setToken(user.token)
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div className='container'>
      <Notification />

      {user === null
        ? (
          <Togglable buttonLabel="login">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setLoginUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        )
        : (
          <Router>
            <header className="navbar navbar-expand-lg navbar-light bg-light mb-5">
              <div className="container-fluid">
                <Link to="/blogs" className="navbar-brand">blogs</Link>
                <Link to="/users" className="navbar-brand">users</Link>

                <span className="navbar-text">{`${user.name} logged in `}</span>
                <button className="btn btn-outline-danger" onClick={handleLogout}>logout</button>
              </div>
            </header>

            <Routes>
              <Route path="/blogs/:id" element={<Blog user={user}/>} />
              <Route path="/blogs" element={<BlogList user={user}/>} />
              <Route path="/users/:id" element={<User/>} />
              <Route path="/users" element={<UserList />} />
              <Route path="/" element={<BlogList user={user}/>} />
            </Routes>
          </Router>
        )}
    </div>
  )
}

export default App
