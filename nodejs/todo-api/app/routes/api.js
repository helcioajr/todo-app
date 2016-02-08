var List = require("../models/list");
var Task = require("../models/task");
var User = require("../models/user");
var config = require("../../config");
var jsonwebtoken = require("jsonwebtoken");
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

	//Users
	//User signup
	api.post("/signup", function(req, res) {

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
				message: "User has been created successfully.",
				token: token
			});
		});
	});

	//User login
	api.post("/login", function(req, res) {

		User.findOne({
			username: req.body.username
		}).select("name username password").exec(function(err, user) {

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
						message: "User successfully logged in!",
						token: token
					});
				}
			}
		});
	});

	//Tasks
	//Create a task
	api.post("/createTask", function(req, res) {
		var task = new Task({
			title: req.body.title,
			creator: req.body.creator,
			list: req.body.list
		});

		task.save(function(err) {
			if (err) {
				res.send(err);
				return;
			}
			res.json({
				message: "Task Created!"
			});
		});

		var listActiveTasks = 0;

		Task.find({
			"list": req.body.list
		}, function(err, list_tasks) {

			if (err) {
				console.log(err);
			}

			var total = Object.keys(list_tasks).length;
			var completed = 0;
			for (var i = 0; i < total; i++) {
				if (list_tasks[i].completed && list_tasks[i].completed != undefined) {
					completed++;
				}
			}

			listActiveTasks = total - completed;

			List.update({
				_id: req.body.list
			}, {
				active: listActiveTasks.toString()
			}, function(err) {
				if (err) {
					res.send(err);
				}
			});

		});

	});

	//Remove a task
	api.post("/removeTask", function(req, res) {
		Task.remove({
				"_id": req.body._id
			},

			function(err) {
				if (err) {
					res.send(err);
					return;
				}
				res.send({
					message: "Task removed!"
				});
			});

		var listActiveTasks = 0;

		Task.find({
			"list": req.body.list
		}, function(err, list_tasks) {

			if (err) {
				console.log(err);
			}

			var total = Object.keys(list_tasks).length;
			var completed = 0;
			for (var i = 0; i < total; i++) {
				if (list_tasks[i].completed && list_tasks[i].completed != undefined) {
					completed++;
				}
			}

			listActiveTasks = total - completed;

			List.update({
				_id: req.body.list
			}, {
				active: listActiveTasks.toString()
			}, function(err) {
				if (err) {
					res.send(err);
				}
			});

		});
	});

	//Mark a task as completed
	api.post("/completeTask", function(req, res) {
		Task.update({
			"_id": req.body._id
		}, {
			"completed": req.body.completed
		}, function(err) {
			if (err) {
				res.send(err);
				return;
			}
			res.send({
				message: "Task updated!"
			});
		});

		var listActiveTasks = 0;

		Task.find({
			"list": req.body.list
		}, function(err, list_tasks) {

			if (err) {
				console.log(err);
			}

			var total = Object.keys(list_tasks).length;
			var completed = 0;
			for (var i = 0; i < total; i++) {
				if (list_tasks[i].completed && list_tasks[i].completed != undefined) {
					completed++;
				}
			}

			listActiveTasks = total - completed;

			List.update({
				_id: req.body.list
			}, {
				active: listActiveTasks.toString()
			}, function(err) {
				if (err) {
					res.send(err);
				}
			});

		});
	});

	//Task lists
	//Create a list 
	api.post("/createList", function(req, res) {
		var list = new List({
			title: req.body.title,
			creator: req.body.creator,
			active: "0"
		});

		console.log(res);

		list.save(function(err) {
			if (err) {
				console.log(err);
				res.send(err);
				return;
			}

			res.json({
				message: "List created!"
			});
		});
	});

	//Remove a list
	api.post("/removeList", function(req, res) {
		List.remove({
			"_id": req.body._id
		}, function(err) {
			if (err) {
				res.send(err);
				return;
			}
			res.send({
				message: "List Removed!"
			});
		});
	});

	// Middleware
	api.use(function(req, res, next) {

		var token = req.body.token || req.params.token || req.headers["x-access-token"];

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

	//Get user
	api.get("/me", function(req, res) {
		res.json(req.decoded);
	});

	//Get tasks
	api.get("/tasks", function(req, res) {
		Task.find({}, function(err, tasks) {
			if (err) {
				res.send(err);
				return;
			}
			res.json(tasks);
		});
	});

	// Get tasks by user
	api.get("/tasks/user/:creator_id", function(req, res) {
		var creator_id = req.params.creator_id;
		Task.findOne({
			creator: creator_id
		}, function(err, tasks) {
			if (err) {
				res.send(err);
				return;
			}
			res.json(tasks);
		});
	});


	// Get task by task_id
	api.get("/tasks/id/:task_id", function(req, res) {
		var task_id = req.params.task_id;
		Task.findOne({
			_id: task_id
		}, function(err, tasks) {
			if (err) {
				res.send(err);
				return;
			}
			res.json(tasks);
		});
	});

	//Get tasks by list id
	api.get("/tasks/list/:list_id", function(req, res) {
		var list_id = req.params.list_id;
		Task.find({
			list: list_id
		}, function(err, tasks) {
			if (err) {
				res.send(err);
				return;
			}
			res.json(tasks);
		});
	});

	//Get user task lists
	api.get("/lists", function(req, res) {
		List.find({
			"creator": req.decoded.id
		}, function(err, lists) {
			if (err) {
				res.send(err);
				return;
			}
			res.json(lists);
		});
	});

	//Get list by id
	api.get("/lists/id/:list_id", function(req, res) {
		var list_id = req.params.list_id;
		List.findOne({
			_id: list_id
		}, function(err, list) {
			if (err) {
				res.send(err);
				return;
			}
			res.json(list);
		});
	});

	//Get tasks status
	api.get("/list/status/:list_id", function(req, res) {
		var list_id = req.params.list_id;
		Task.find({
			list: list_id
		}, function(err, list_tasks) {
			if (err) {
				res.send(err);
				return;
			}

			var total = Object.keys(list_tasks).length;
			var completed = 0;
			for (var i = 0; i < total; i++) {
				if (list_tasks[i].completed && list_tasks[i].completed != undefined) {
					completed++;
				}
			}


			res.json({
				total: total,
				completed: completed
			});
		});
	});

	return api;
};