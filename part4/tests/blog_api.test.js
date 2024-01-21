const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/) // regex
  })

  test('blogs have the unique identifier property id', async () => {
    const response = await helper.blogsInDb()

    response.map(b => expect(b.id).toBeDefined())
  })

  test('all blogs are returned', async () => {
    const response = await helper.blogsInDb()

    expect(response).toHaveLength(helper.initialBlogs.length)
  })
})

describe('viewing a specific blog', () => {
  test('a specified blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('a specific blog is returned (Mi segundo blog)', async () => {
    const response = await helper.blogsInDb()

    const title = response.map(r => r.title)
    expect(title).toContain(
      'Mi segundo blog'
    )
  })

  test.skip('the first blog is about Hola Mundo', async () => {
    const response = await helper.blogsInDb()

    expect(response[0].title).toBe('Mi primer blog: Hola Mundo!')
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Mi nuevo blog',
      author: 'Emilio Iglesias',
      url: 'emilio.dev/blog/new',
      likes: '0'
      // userId: '65acf2daf8f89da2fe28a760'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsInDb.map(b => b.title)
    expect(titles).toContain(newBlog.title)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Emilio Iglesias',
      url: 'emilio.dev/blogwithouttitle',
      likes: '0'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'blog without url',
      author: 'Emilio Iglesias',
      likes: '0'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without likes set it to 0 by default', async () => {
    const newBlog = {
      title: 'Mi nuevo blog sin likes',
      author: 'Emilio Iglesias',
      url: 'emilio.dev/blog/new'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    const savedBlog = blogsInDb.find(b => b.title === newBlog.title)
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
    expect(savedBlog.likes).toBe(0)
  })
})

describe('edition of a blog', () => {
  test('a blog can be updated', async () => {
    const newBlog = {
      title: 'Mi blog editado',
      author: 'Emilio Iglesias',
      url: 'emilio.dev/blog/new',
      likes: '20'
    }
    const blogsAtStart = await helper.blogsInDb()
    const id = blogsAtStart[0].id
    await api
      .put(`/api/blogs/${id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogsAtStart[0].title)
    expect(titles).toContain(newBlog.title)
  })
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
