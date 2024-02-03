const BlogForm = ({
  newBlog,
  handleAddBlog,
  handleBlogChange
}) => {
    return (
        <form onSubmit={handleAddBlog}>
            <div>
                Título: <input name="title" value={newBlog.title} onChange={handleBlogChange} />
            </div>
            <div>
                URL: <input name="url" value={newBlog.url} onChange={handleBlogChange} />
            </div>
            <button type="submit">save</button>
        </form>
    )
}

export default BlogForm