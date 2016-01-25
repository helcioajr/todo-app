var Task = require('../models/task');
var User = require('../models/user');
var config = require('../../config');
var jsonwebtoken = require('jsonwebtoken');
var secretKey = config.secretKey;

function createToken(user) {
	var token = jsonwebtoken.sign({
		id: user._id,
		username: user.username,
		name: user.name
	}, secretKey, {
		expiresInMinute: 1440
	});

	return token;
}

module.exports = function(app, express) {

	var api = express.Router();

	//User signup
	api.post('/signup', function(req, res) {

		var user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});

		user.save(function(err) {
			if (err) {
				res.send(err);
				return;
			}

			var token = createToken(user);

			res.json({
				success: true,
				message: 'User has been created successfully.',
				token: token
			});
		});
	});

	//User login
	api.post('/login', function(req, res) {

		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err, user) {

			if (err) throw err;

			if (!user) {
				res.send({
					message: "User doesn't exist."
				});
			}
			else if (user) {
				var validPassword = user.comparePassword(req.body.password);

				if (!validPassword) {
					res.send({
						message: "Invalid password!."
					});
				}
				else {

					var token = createToken(user);

					res.json({
						success: true,
						message: "User uccessfully logged in!",
						token: token
					});
				}
			}
		});
	});;

	//Get all tasks
	api.get('/tasks', function(req, res) {
		Task.find({}, function(err, tasks) {
			if (err) {
				res.send(err);
				return;
			}
			res.json(tasks);
		});
	});

	//Create a task
	api.post('/createTask', function(req, res) {
		var task = new Task({
			title: req.body.title,
			content: req.body.content,
			completed: req.body.completed
		});

		task.save(function(err) {
			if (err) {
				res.send(err);
				return;
			}
			res.json({
				message: 'Task Created!'
			});
		});
	});

	//Remove a task
	api.post('/removeTask', function(req, res) {
		Task.remove({
				'title': req.body.title
			},

			function(err) {
				if (err) {
					res.send(err);
					return;
				}
				res.send({
					message: 'Task removed!'
				});
			});
	});

	//Mark a task as completed
	api.post('/completeTask', function(req, res) {
		Task.update({
				'title': req.body.title
			},

			{
				'completed': req.body.completed
			},

			function(err) {
				if (err) {
					res.send(err);
					return;
				}
				res.send({
					message: 'Task updated!'
				});
			});
	});


	// Middleware
	api.use(function(req, res, next) {

		var token = req.body.token || req.params.token || req.headers['x-access-token'];

		if (token) {

			jsonwebtoken.verify(token, secretKey, function(err, decoded) {

				if (err) {
					res.status(403).send({
						success: false,
						message: "Failed to authenticate user."
					});

				}
				else {

					req.decoded = decoded;
					next();
				}

			});
		}
		else {
			res.status(403).send({
				success: false,
				message: "No token provided!"
			});
		}
	});

	api.get('/me', function(req, res) {
		res.json(req.decoded);
	});

	return api;
};