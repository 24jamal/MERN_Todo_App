import React, { useEffect, useState } from 'react'
import { Container } from './styles'
import Form from '../Form';
import axios from '../../axios';
import TodoList from '../TodoList';
import Key from '../Key';
import Author from '../Author';
const Todo = () => {

    const [input, setInput] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [todos, setTodos] = useState([]);
    console.log(input, "input");


    const fetchData = async () => {
        try {
            const response = await axios.get('/todos');
            console.log("Fetched todos:", response.data);
            setTodos(response.data);
        }
        catch (err) {
            console.error("Error fetching todos:", err.message);
            console.error("Full error:", err);
        }
    }


    useEffect(() => {
        fetchData()
    }, []);

    // eslint-disable-next-line no-unused-vars
    const addTodo = async (e) => {
        e.preventDefault();
        console.log("Adding todo, input:", input);
        if (input.length === 0) {
            console.log("Input is empty");
            return null;
        }
        try {
            console.log("Sending POST request with:", { text: input, completed: false });
            const response = await axios.post('/todos', {
                text: input,
                completed: false
            });
            console.log("POST response status:", response.status);
            console.log("POST response data:", response.data);
            console.log("POST full response:", response);
            await fetchData();
            setInput('');
        } catch (error) {
            console.error("Error adding todo:", error);
            console.error("Error details:", error.response?.data || error.message);
        }
    }

    return (
        <Container>
            <h2>List of Todos</h2>
            {/* Form component*/}
            <Form input={input} setInput={setInput} addTodo={addTodo} />

            {/* TodoList */}
            <TodoList todos={todos} fetchData={fetchData} />
            {/*Key*/}
            <Key />
            {/*Author Component*/}
            <Author />
        </Container>
    );
}

export default Todo