import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'https://mern-todo-app-0yjq.onrender.com/'

    }
)

export default instance;