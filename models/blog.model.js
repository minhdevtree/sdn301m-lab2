const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: [20, 'Title is too long'],
    },
    body: {
        type: String,
        required: true,
        // max: [500, 'Body is too long'],
    },
    comments: [
        {
            body: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    meta: {
        votes: Number,
        favs: Number,
    },
});

blogSchema.methods.addComment = function (comment) {
    this.comments.push(comment);
    return this.save();
};

const Blog = mongoose.model('blog', blogSchema);
module.exports = Blog;
