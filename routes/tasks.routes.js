const express = require('express');
const { oneOf } = require('express-validator');

//controllers
const { createTasks, getAllTasks, getTasks, updateTasks, deleteTasks } = require('../controllers/tasks.controller');

//Middlewares
const { tasksvalidator } = require('../middlewares/validator.middlewares');
const { tasksExist } = require('../middlewares/tasks.middleware');

const tasksRoutes = express.Router();

tasksRoutes.post('/', oneOf(tasksvalidator), createTasks);

tasksRoutes.get('/', getAllTasks); // Obtener todas las tareas

tasksRoutes.get('/:status', getTasks); // Obtener tareas de acuerdo al status

tasksRoutes.patch('/:id', tasksExist, updateTasks); // Actualizar de una tarea de acuerdo con el id.

tasksRoutes.delete('/:id', tasksExist, deleteTasks); // Cancelar la tarea (status cancelled)

module.exports = { tasksRoutes };
