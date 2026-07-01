import axios from "axios";

const BASE_URL = "https://localhost:7109/api/Users";

export function registerUser(userData) {
    return axios.post(BASE_URL, userData);
}