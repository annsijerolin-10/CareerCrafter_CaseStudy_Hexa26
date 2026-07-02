import axios from "axios";

const BASE_URL = "https://localhost:7109/api/Employer";

export function getEmployerDashboard(employerId, token) {
    return axios.get(
        `${BASE_URL}/${employerId}/dashboard`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
}