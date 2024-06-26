import { useState } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import About from './components/About'
import CreateForm from './components/CreateForm'


const padding = {
  paddingRight: 15
}

const Footer = () => (
  <footer>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </footer>
)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const setNotificationMessage = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000) // restablece la notificación después de 5 segundos
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)
  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  return (
    <Router>
      <div className="site-content">
        <header>
          <h1>Software anecdotes</h1>
          <Link style={padding} to="/anecdotes">anecdotes</Link>
          <Link style={padding} to="/create">create new</Link>
          <Link style={padding} to="/about">about</Link>
          {notification && <p className='notification'>{notification}</p>}
        </header>

        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
          <Route path="/create" element={<CreateForm addNew={addNew} setNotification={setNotificationMessage}/>} />
          <Route path="/about" element={<About />} />
        </Routes>

      </div>

      <Footer />
    </Router>
  )
}

export default App
