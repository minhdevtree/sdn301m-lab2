const mongoose = require('mongoose');
const Person = require('./person.model');
const Blog = require('./blog.model');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.person = Person;
db.blog = Blog;

db.connectDb = async () => {
    await mongoose
        .connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME,
        })
        .then(() => {
            console.log('MongoDB connected');
        })
        .catch(error => {
            console.error('MongoDB connection error: ', error.message);
            process.exit(1);
        });
};

module.exports = db;
