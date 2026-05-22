import React, { useState } from 'react'
import { Container } from './styles'
import Form from '../Form';

const Todo = () => {

    const [input, setInput] = useState('');
    console.log(input, "input");

    return (
        <Container>
            <h2>List of Todos</h2>
            {/* Form component*/}
            <Form input={input} setInput={setInput} />

            {/* TodoList */}

            {/*Key*/}
            {/*Author Component*/}
        </Container>
    );
}

export default Todo