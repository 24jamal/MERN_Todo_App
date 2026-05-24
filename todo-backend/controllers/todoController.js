const mongoose = require('mongoose');
const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
    try {
        console.log("Fetching todos for user:", req.user.id);
        const allTodos = await Todo.find({ userId: req.user.id }).sort({ createdAt: -1 });
        console.log("Found todos:", allTodos);
        res.status(200).send(allTodos);
    }

    catch (error) {
        console.error("Error fetching todos:", error);
        res.status(400).send(error.message);

    }
}

//Create a new Todo
const createTodo = async (req, res) => {
    const { text, completed } = req.body;
    console.log("Creating todo with data:", { text, completed });

    try {
        const newTodo = await Todo.create({
            text,
            completed,
            userId: req.user.id
        });
        console.log("Todo created successfully:", newTodo);
        res.status(201).send(newTodo);
    }

    catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).send(error.message);

    }
}

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {

        //Check the id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`There is no todo with the id of ${id}`);
        }

        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { completed },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).send(`There is no todo with the id of ${id}`);
        }

        res.status(200).send(updatedTodo);
    }

    catch (error) {
        res.status(500).send(error.message);
    }
}



const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {

        //Check the id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`There is no todo with the id of ${id}`);
        }

        const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!deletedTodo) {
            return res.status(404).send(`There is no todo with the id of ${id}`);
        }

        res.status(200).send(deletedTodo);
    }

    catch (error) {
        res.status(500).send(error.message);
    }
}



module.exports = {

    getTodos,
    createTodo,
    updateTodo,
    deleteTodo

}
