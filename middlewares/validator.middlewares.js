const { body, check, validationResult } = require('express-validator');

const { appError } = require('../utils/appError.util.js');

const userResult = (req, res, next) => {
	const errors = validationResult(req);

	console.log(errors);

	if (!errors.isEmpty()) {
		//Array has errors

		const errorsMsgs = errors.array().map(err => err.msg);

		const message = errorsMsgs.join('. ');
		return next(new appError(message, 400));
	}

	next();
};

createUservalidator = [
	check('name').notEmpty().withMessage('Name cannot be empty'),
	check('email').isEmail().withMessage('Must provide a valid email'),
	check('password')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 character')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
];
//// ---------------------------------------------------------

const userResultPatch = (req, res, next) => {
	const errors = validationResult(req);

	console.log(errors);

	if (!errors.isEmpty()) {
		const errorsMsgs = errors.array().map(err => err.msg);

		const message = errorsMsgs.join('. ');
		return next(new appError(message, 400));
	}

	next();
};

userPatchvalidator = [body('name').notEmpty(), body('Email').isLength({ min: 10 }).isAlphanumeric(), userResultPatch];
///// ----------------------------------------------------------
const tasksResult = (req, res, next) => {
	const errors = validationResult(req);

	console.log(errors);

	if (!errors.isEmpty()) {
		const errorsMsgs = errors.array().map(err => err.msg);

		const message = errorsMsgs.join('. ');
		return next(new appError(message, 400));
	}
	next();
};

tasksvalidator = [
	body('title').notEmpty(),
	body('userId').isNumeric(),
	body('limitDate').isLength({ min: 20 }),
	tasksResult,
];

module.exports = { createUservalidator, userPatchvalidator, tasksvalidator, userResult };
