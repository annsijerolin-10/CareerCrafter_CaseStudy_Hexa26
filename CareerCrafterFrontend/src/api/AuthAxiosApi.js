import axios from "axios";
const BASE_URL="https://localhost:7109/api/Auth";
export function loginUser(loginData){
    return axios.post(`${BASE_URL}/login`,loginData)
}

export async function changePassword(
    passwordData
) {
    try {

        const response = await axios.put(

            `${BASE_URL}/change-password`,

            passwordData,

            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }

        );

        return response.data;

    }
    catch (error) {

        if (error.response?.data?.message)
            throw new Error(error.response.data.message);

        if (error.response?.data?.title)
            throw new Error(error.response.data.title);

        throw new Error(
            error.message || "Failed to change password."
        );

    }
}


export async function forgotPassword(data) {

    const response = await axios.put(
        `${BASE_URL}/forgot-password`,
        data
    );

    return response.data;

}