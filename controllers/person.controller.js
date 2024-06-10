const db = require('../models');
const createError = require('http-errors');
const Person = db.person;

module.exports = {
    createPerson: async (req, res, next) => {
        try {
            const { name, dob, blogs } = req.body;

            const newPerson = new Person({
                name,
                dob,
                blogs,
            });
            const person = await newPerson.save();
            res.status(201).send({
                _id: person._id,
                name: person.name,
                dob: person.dob,
                blogs: person.blogs || [],
            });
        } catch (error) {
            next(error);
        }
    },
    editPerson: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, dob, blogs } = req.body;

            const updatePerson = await Person.findByIdAndUpdate(
                { _id: id },
                {
                    name,
                    dob,
                },
                { new: true }
            );

            if (!updatePerson) {
                throw createError(404, 'Person not found');
            }

            blogs.map(async blogId => {
                await updatePerson.addBlog(blogId);
            });

            res.send({
                _id: updatePerson._id,
                name: updatePerson.name,
                dob: updatePerson.dob,
                blogs: updatePerson.blogs || [],
            });
        } catch (error) {
            next(error);
        }
    },
    listPeople: async (req, res, next) => {
        try {
            const people = await Person.find({}, '_id name dob blogs').populate(
                'blogs',
                'title'
            );
            const modifiedPeople = people.map(person => ({
                ...person.toObject(),
                blogs: person.blogs.map(blog => blog.title),
            }));
            res.send(modifiedPeople);
        } catch (error) {
            next(error);
        }
    },
};
