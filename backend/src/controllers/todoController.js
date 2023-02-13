const db = require('../models/mongoModel');
const Todo = db.academic;

module.exports = {
    // Create and Save a new Todo
    create: (req, res) => {
        // Validate request
        if (!req.body.title) {
            return res.status(400).send({
                message: "Jangan dikosongin ya :)"
            });
        }

        // Create a Todo
        const todo = new Todo({
            title: req.body.title,
            description: req.body.description,
            publish: req.body.publish ? req.body.publish : false
        });

        // Save Todo in the database
        todo.save(todo)
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Todo."
                });
            });
    },

    // Retrieve and return all todos from the database.
    findAll: (req, res) => {
        const title = req.query.title;
        var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

        Todo.find(condition)
            .then(todos => {
                res.send(todos);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Semangat cari errornya wkwk."
                });
            });
    },

    // Find a single todo with a todoId
    findOne: (req, res) => {
        const id = req.params.id;

        Todo.findById(id)
            .then(todo => {
                if (!todo) {
                    return res.status(404).send({
                        message: "Gaada nih yang id nya " + id
                    });
                }
                res.send(todo);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Gaada nih yang id nya " + id
                    });
                }
                return res.status(500).send({
                    message: "Gaada nih yang id nya " + id
                });
            });
    },

    // Update a todo identified by the todoId in the request
    update: (req, res) => {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: "Jangan dikosongin ya :)"
            });
        }

        // Find todo and update it with the request body
        const id = req.params.id;

        Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(todo => {
                if (!todo) {
                    return res.status(404).send({
                        message: `Gabisa diupdate nih yang id nya ${id}. Jangan boong dong`
                    });
                }
                res.send({
                    data: todo,
                    message: "yeay berhasil!"
                });
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Gabisa diupdate nih yang id nya " + id
                    });
                }
                return res.status(500).send({
                    message: "Gabisa diupdate nih yang id nya " + id
                });
            });
    },

    delete: (req, res) => {
        const id = req.params.id

        Todo.findByIdAndRemove(id, { useFindAndModify: false })
            .then(todos => {
                if (!todos) {
                    res.status(404).send({
                        message: `Gabisa dihapus nih yang id nya ${id}. Jangan boong dong`
                    })
                } else {
                    res.send({
                        message: "Horee bisa dihapus!"
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Gabisa diupdate nih yang id nya ${id}. Jangan boong dong`
                })
            })
    },

    deleteAll: (req, res) => {
        Todo.deleteMany({})
            .then(todos => {
                res.send({
                    message: `${data.deleteCount} Todos berhasil dihapus!`
                })
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Wah gaada nih kayaknya!"
                })
            })
    },

    findAllPublished: (req, res) => {
        Todo.find({ publish: true })
            .then(todos => {
                res.send(todos)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Wah gaada nih kayaknya!"
                })
            })
    }
}