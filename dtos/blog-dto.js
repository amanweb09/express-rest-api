class BlogDto {
    slug;
    title;
    desc;
    heroImg;
    html;
    createdAt;

    constructor(blog) {
        this.slug = blog.slug;
        this.title = blog.title;
        this.desc = blog.desc;
        this.heroImg = blog.heroImg;
        this.html = blog.html;
        this.createdAt = blog.createdAt;
    }
}

module.exports = BlogDto;