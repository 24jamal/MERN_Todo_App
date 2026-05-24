const mongoose = require('mongoose');
const Todos = require('../dbTodos');
const { create } = require('node:domain');


const getTodos = async (req, res) => {
    try {
        console.log("Fetching all todos...");
        const allTodos = await Todos.find({}).sort({ createdAt: -1 });
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
    const dbTodo = req.body;
    console.log("Creating todo with data:", dbTodo);

    try {
        const newTodo = await Todos.create(dbTodo);
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
    const dbTodo = req.body;
    try {

        //Check the id is valid'
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`There is todo with  the id of  ${id}`);
        }

        const todoID = { _id: id };
        const update = { completed: true };
        const updateTodo = await Todos.findOneAndUpdate(todoID, update);
        if (!updateTodo) {
            return res.status(404).send(`There is todo with the id  of  ${id}`);
        }

        res.status(200).send(updateTodo);
    }

    catch (error) {

        res.status(500).send(error.message);

    }

}



const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {

        //Check the id is valid'
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`There is todo with  the id of  ${id}`);
        }


        const deleteTodo = await Todos.findOneAndDelete({ _id: id });


        res.status(200).send(deleteTodo);
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
