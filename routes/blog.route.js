const express = require('express');
const blogRouter = express.Router();
const { BlogController } = require('../controllers');

blogRouter.post('/add', BlogController.createBlog);

blogRouter.put('/edit/:id', BlogController.editBlog);

module.exports = blogRouter;
