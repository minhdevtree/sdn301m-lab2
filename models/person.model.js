const mongoose = require('mongoose');

const { Schema } = mongoose;

const personSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        dob: {
            type: Date,
            required: [true, 'Dob is required'],
        },
        blogs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'blog',
            },
        ],
    },
    {
        timestamps: true,
    }
);

personSchema.methods.addBlog = function (blogId) {
    if (this.blogs.includes(blogId)) {
        return this;
    }
    this.blogs.push(blogId);
    return this.save();
};

const Person = mongoose.model('person', personSchema);
module.exports = Person;
