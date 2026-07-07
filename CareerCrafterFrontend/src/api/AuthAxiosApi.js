import axios from "axios";
const BASE_URL="https://localhost:7109/api/Auth";
function getErrorMessage(error, fallback) {

    if (typeof error.response?.data === "string")
        return error.response.data;

    if (error.response?.data?.Message)
        return error.response.data.Message;

    if (error.response?.data?.message)
        return error.response.data.message;

    if (error.response?.data?.errors) {

        const firstError = Object.values(error.response.data.errors)[0];

        if (firstError && firstError.length > 0)
            return firstError[0];
    }

    if (error.response?.data?.title)
        return error.response.data.title;

    return fallback;

}
export async function loginUser(loginData) {

    try {

        const response = await axios.post(
            `${BASE_URL}/login`,
            loginData
        );

        return response.data;

    }
    catch (error) {

        throw new Error(
            getErrorMessage(
                error,
                "Invalid email or password."
            )
        );

    }

}


export async function changePassword(passwordData)
     {
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
    catch(error){

        throw new Error(
            getErrorMessage(
                error,
                "Failed to login."
            )
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