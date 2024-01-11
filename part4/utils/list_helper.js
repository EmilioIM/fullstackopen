const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.reduce(reducer, 0)
}

const favoriteBlog = (array) => {
  const reducer = (fav, current) => {
    return fav.likes > current.likes ? fav : current
  }

  const result = array.reduce(reducer)

  return {
    title: result.title,
    author: result.author,
    likes: result.likes
  }
}

const mostBlogs = (array) => {
  const authorCount = {}

  array.forEach(blog => {
    authorCount[blog.author] ? authorCount[blog.author]++ : authorCount[blog.author] = 1
  })

  let maxAuthor = ''
  let maxBlogs = 0

  for (const author in authorCount) {
    if (authorCount[author] > maxBlogs) {
      maxBlogs = authorCount[author]
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (array) => {
  const authorCount = {}

  array.forEach(blog => {
    authorCount[blog.author] ? authorCount[blog.author] += blog.likes : authorCount[blog.author] = blog.likes
  })

  let maxAuthor = ''
  let maxLikes = 0

  for (const author in authorCount) {
    if (authorCount[author] > maxLikes) {
      maxLikes = authorCount[author]
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
