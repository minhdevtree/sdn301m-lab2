const express = require('express');
const personRouter = express.Router();
const { PersonController } = require('../controllers');

personRouter.post('/add', PersonController.createPerson);

personRouter.put('/edit/:id', PersonController.editPerson);

personRouter.get('/list', PersonController.listPeople);

module.exports = personRouter;
