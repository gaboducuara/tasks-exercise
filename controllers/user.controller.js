// Models controllers.
const { Tasks } = require('../models/tasks.model');
const { User } = require('../models/user.model');

//utils
const { catchAsync } = require('../utils/catchAsync.util');
const { appError } = require('../utils/appError.util');

const createUsers = catchAsync(async (req, res, next) => {
	const { name, email, password } = req.body;
	const newUser = await User.create({
		name,
		email,
		password,
	});
	res.status(201).json({
		newUser,
	});
});

const getAllUsers = catchAsync(async (req, res, next) => {
	const user = await User.findAll({
		include: Tasks,
	});
	res.status(200).json({
		status: 'success',
		user,
	});
});

const updateUsers = catchAsync(async (req, res, next) => {
	const { user } = req;
	const { name, email } = req.body;

	await user.update({
		name,
		email,
		status: 'out',
	});
	res.status(404).json({ status: 'success' });
});

const deleteUsers = catchAsync(async (req, res, next) => {
	const { user } = req;

	await user.update(404)({ status: 'disabled account' });
	res.status(204).json({ status: 'success' });
});

module.exports = {
	getAllUsers,
	createUsers,
	updateUsers,
	deleteUsers,
};
