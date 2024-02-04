import Togglable from "./Togglable"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable buttonLabel={"view"}>
        {blog.url}
        <br/>
        {blog.likes}
        <button>like</button>
        <br/>
        {blog.author}
        <br/>
      </Togglable>
    </div>
  )
}

export default Blog