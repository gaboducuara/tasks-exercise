const express = require('express');
const { oneOf } = require('express-validator');

//controllers
const { createUsers, getAllUsers, updateUsers, deleteUsers } = require('../controllers/user.controller');

// Middlewares
const { createUservalidator, userPatchvalidator, userResult } = require('../middlewares/validator.middlewares');
const { userExists } = require('../middlewares/users.middleware');

const userRoutes = express.Router();

userRoutes.post('/', oneOf([createUservalidator]), userResult, createUsers); // Crear usuario (enviar name, email, y password por req.body)

userRoutes.get('/', getAllUsers); // Obtener a todos los usuarios activos

userRoutes.patch('/:id', userExists, oneOf(userPatchvalidator), updateUsers); // Actualizar perfil de usuario (solo name y email)

userRoutes.delete('/:id', userExists, deleteUsers); // Deshabilitar cuenta de usuario

module.exports = { userRoutes };
