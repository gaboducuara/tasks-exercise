const express = require('express');

//Routes
const { userRoutes } = require('./routes/user.routes');
const { tasksRoutes } = require('./routes/tasks.routes');

//Global error controller
const { globalErrorHandler } = require('./controllers/error.controller');

//utils
const { appError } = require('./utils/appError.util');

//init app
const app = express();

// accept incoming json data
app.use(express.json());

//Endpoints
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', tasksRoutes);

//Handle unknown routes to
app.all('*', (req, res, next) => {
	next(new appError(`${req.method} ${req.originalUrl} not found in this server`, 404));
});

app.use(globalErrorHandler);

module.exports = { app };
