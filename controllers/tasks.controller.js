// Models controllers.

const { Tasks } = require('../models/tasks.model');
//utils
const { catchAsync } = require('../utils/catchAsync.util');
const { appError } = require('../utils/appError.util');

const createTasks = catchAsync(async (req, res, next) => {
	const { title, userId, limitDate } = req.body;
	const newTasks = await Tasks.create({
		title,
		userId,
		limitDate,
	});
	res.status(201).json({
		newTasks,
	});
});

const getAllTasks = catchAsync(async (req, res, next) => {
	const tasks = await User.findAll();
	res.status(200).json({
		status: 'success',
		tasks,
	});
});

const getTasks = catchAsync(async (req, res, next) => {
	const { status } = req.params;
	const tasks = await Tasks.findOne({
		where: { status },
	});

	if (!tasks) {
		return next(new appError('User not found', 404));
	}
	res.status(200).json({ tasks });
});

const updateTasks = catchAsync(async (req, res, next) => {
	const { tasks } = req;

	await tasks.update({
		id,
		status: 'out',
	});
	res.status(204).json({ status: 'success' });
});

const deleteTasks = catchAsync(async (req, res, next) => {
	const { tasks } = req;

	await tasks.update({
		status: 'cancelled',
	});
	res.status(204).json({ status: 'success' });
});

module.exports = {
	createTasks,
	getAllTasks,
	getTasks,
	updateTasks,
	deleteTasks,
};
