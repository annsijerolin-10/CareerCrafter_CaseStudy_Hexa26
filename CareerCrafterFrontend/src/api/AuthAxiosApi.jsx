import axios from "axios";
const BASE_URL="https://localhost:7109/api/Auth";
export function loginUser(loginData){
    return axios.post(`${BASE_URL}/login`,loginData)
}