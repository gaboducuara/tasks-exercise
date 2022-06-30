//models
const { Tasks } = require('../models/tasks.model');
//Utils
const { appError } = require('../utils/appError.util');
//catchAsync
const { catchAsync } = require('../utils/catchAsync.util');

const tasksExist = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const tasks = await Tasks.findOne({
		where: { id },
	});

	if (!tasks) {
		return next(new appError('User not found', 404));
	}

	req.tasks = tasks;
	next();
});

module.exports = { tasksExist };
