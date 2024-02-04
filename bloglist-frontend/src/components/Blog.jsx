import Togglable from "./Togglable"
import blogService from "../services/blogs"

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    };
    blogService.update(blog.id, updatedBlog);
    updateBlog(updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id);
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable buttonLabel={"view"}>
        {blog.url}
        <br/>
        {blog.likes}
        <button onClick={handleLike}>like</button>
        <br/>
        {blog.author}
        <br/>
        <button onClick={handleRemove}>remove</button>
      </Togglable>
    </div>
  )
}

export default Blog