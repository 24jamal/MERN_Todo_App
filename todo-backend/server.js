const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} = require("./controllers/todoController");

//App Config

const app = express();

const port = process.env.PORT || 8000;

const connectionURL = process.env.MONGO_URI;
//Middlewares

app.use(express.json());
app.use(Cors({
    origin: ['https://mern-todo-app-gfmp.vercel.app', 'http://localhost:3000'],
    credentials: true
}));



//DB config

console.log("MONGO_URI:", connectionURL ? "✓ Set" : "✗ Not set");
console.log("PORT:", port);

mongoose.connect(connectionURL)
    .then(() => {
        app.listen(port, () => console.log(`Running on port : ${port}`))
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    })

// Health check endpoint
app.get("/", (req, res) => {
    res.status(200).json({ message: "Backend is running" });
});

// API endpoints

app.get("/todos", getTodos);

app.post("/todos", createTodo);

app.put("/todos/:id", updateTodo);

app.delete("/todos/:id", deleteTodo);
