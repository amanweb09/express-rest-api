const Joi = require("joi");
const marked = require("marked")
const slugify = require("slugify");
const Blog = require("../models/Blog");

class BlogService {
    generateMarkup(markdown) {
        return marked.marked(markdown);
    }
    generateSlug(title) {
        return slugify.default(title, {
            lower: true,
            strict: true
        })
    }
    async saveBlog(doc) {
        try {
            const blog = new Blog(doc);
            return await blog.save()
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async fetchBlogs() {
        try {
            return await Blog.find()
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async fetchBlogWithSlug(slug) {
        try {
            return await Blog.findOne({ slug })
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = new BlogService()