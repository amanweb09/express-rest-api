const blogService = require('../../services/blog-service');

const admin_blogController = () => {
    return {
        create(req, res) {
            const { title, desc, heroImg, markdown } = req.body;

            if (!title || !desc || !heroImg || !markdown) {
                return res.status(422).json({ err: 'Please fill all the fields!' })
            }

            //convert markdown to html
            const html = blogService.generateMarkup(markdown);

            //convert title to slug
            const slug = blogService.generateSlug(title)

            //validate the blog
            const blogObj = {
                title, desc, slug, html, heroImg
            }

            const validation = blogService.validateBlog(blogObj)

            if (!validation.state) {
                return res.status(validation.statusCode).json({ err: validation.message })
            }

            //save the blog
            const saveBlog = blogService.saveBlog(blogObj)

            if (saveBlog) {
                return res.status(201).json({ message: 'Blog created successfully!' })
            }

            return res.status(500).json({ err: 'Something went wrong!' })
        }
    }
}

module.exports = admin_blogController;