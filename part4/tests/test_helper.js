const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Mi primer blog: Hola Mundo!',
    author: 'root',
    url: 'emilio.dev/blog/1',
    likes: '7',
    user: '65b4c987adbdd1424f40e50f'
  },
  {
    title: 'Mi segundo blog',
    author: 'root',
    url: 'emilio.dev/blog/2',
    likes: '3',
    user: '65b4c987adbdd1424f40e50f'
  },
  {
    title: 'Mi primer pedroblog',
    author: 'Matti Luukkainen',
    url: 'pedro.dev/blog/1',
    likes: '2',
    user: '65b4c987adbdd1424f40e514'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => {
    const blogJson = blog.toJSON()
    blogJson.user = blogJson.user.toString()
    return blogJson
  })
}

module.exports = {
  initialBlogs, usersInDb, nonExistingId, blogsInDb
}
