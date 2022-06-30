const { app } = require('./app');

//Models
const { User } = require('./models/user.model');
const { Tasks } = require('./models/tasks.model');

//utils
const { db } = require('./utils/database.util');

db.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

//Establish model´s relations
User.hasMany(Tasks, { foreignKey: 'userId' });
Tasks.belongsTo(User);

db.sync()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

app.listen(2000, () => {
	console.log('Checkin app runing on port 2000!!!');
});
