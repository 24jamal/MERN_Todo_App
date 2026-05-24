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

const { register, login } = require("./controllers/authController");
const authMiddleware = require("./middleware/auth");

//App Config

const app = express();

const port = process.env.PORT || 8000;

const connectionURL = process.env.MONGO_URI;
//Middlewares

app.use(express.json());
app.use(Cors({
    origin: ['https://mern-todo-app-blush-ten.vercel.app/', 'https://mern-todo-app-blush-ten.vercel.app', 'https://mern-todo-app-gfmp.vercel.app', 'http://localhost:3000'],
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

// Auth endpoints
app.post("/auth/register", register);
app.post("/auth/login", login);

// API endpoints (protected with auth middleware)

app.get("/todos", authMiddleware, getTodos);

app.post("/todos", authMiddleware, createTodo);

app.put("/todos/:id", authMiddleware, updateTodo);

app.delete("/todos/:id", authMiddleware, deleteTodo);
