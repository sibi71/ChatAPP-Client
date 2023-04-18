import axios from "axios"

const instance = axios.create({
    baseURL:`https://cha-x027.onrender.com/api`
});

export default instance