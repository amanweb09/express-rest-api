const Blog = require("../../models/Blog");
const blogService = require("../../services/blog-service");

module.exports = function blogController() {
    return {
        async showAllBlogs(req, res) {
            const blogs = await blogService.fetchBlogs()

            if (blogs) {
                return res.status(200).json({ blogs })
            }
            return res.status(500).json({ err: 'Somethign went wrong!' })
        },
        async showBlog(req, res) {
            const blog = await blogService.fetchBlogWithSlug(req.params.slug)

            if (blog) {
                return res.status(200).json({ blog })
            }
            return res.status(500).json({ err: 'Somethign went wrong!' })

        }
    }
}