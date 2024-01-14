const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Mi primer blog: Hola Mundo!',
    author: 'Emilio Iglesias',
    url: 'emilio.dev/blog/1',
    likes: '7'
  },
  {
    title: 'Mi segundo blog',
    author: 'Emilio Iglesias',
    url: 'emilio.dev/blog/2',
    likes: '3'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
