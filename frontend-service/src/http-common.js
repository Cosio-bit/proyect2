import axios from "axios";

const service = import.meta.env.VITE_FRONTEND_SERVER;
const port = import.meta.env.VITE_FRONTEND_PORT;

console.log(service)
console.log(port)

export default axios.create({
    baseURL: `http://${service}:${port}`,
    headers: {
        'Content-Type': 'application/json'
    }
});