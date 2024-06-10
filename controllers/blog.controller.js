const db = require('../models');
const createError = require('http-errors');
const Blog = db.blog;

module.exports = {
    createBlog: async (req, res, next) => {
        try {
            const { title, body, comments, meta } = req.body;

            const newBlog = new Blog({
                title,
                body,
                comments,
                meta,
            });
            const blog = await newBlog.save();
            res.status(201).send({
                _id: blog._id,
                title: blog.title,
                body: blog.body,
                comments: blog.comments || [],
                meta: blog.meta || {},
            });
        } catch (error) {
            if (error.errors) {
                const errors = Object.values(error.errors).map(
                    err => err.message
                );
                error = createError(422, { message: errors.join(', ') });
            }
            next(error);
        }
    },
    editBlog: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, body, comments, meta } = req.body;

            const updateBlog = await Blog.findByIdAndUpdate(
                { _id: id },
                {
                    title,
                    body,
                    meta,
                },
                { new: true }
            );
            if (!updateBlog) {
                throw createError(404, 'Blog not found');
            }

            if (comments) {
                comments.map(async comment => {
                    await updateBlog.addComment(comment);
                });
            }

            res.send({
                _id: updateBlog._id,
                title: updateBlog.title,
                body: updateBlog.body,
                comments: updateBlog.comments || [],
                meta: updateBlog.meta || {},
            });
        } catch (error) {
            next(error);
        }
    },
};
