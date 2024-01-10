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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
