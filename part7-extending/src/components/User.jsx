import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../features/userSlice'
import userService from '../services/users'

const User = () => {
  const id = useParams().id

  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    userService.getAll().then(users => dispatch(setUsers(users)))
  }, [dispatch])

  const user = users.find(u => u.id === id)

  return (
    <>
      {user
        ? (
          <div>
            <h1>{user.name}</h1>
            <h2>added blogs</h2>
            <ul>
              {user.blogs.map(blog => (
                <li key={blog.id}>{blog.title}</li>
              ))}
            </ul>
          </div>
        )
        : (
          <p>No user found</p>
        )}
    </>
  )
}

export default User