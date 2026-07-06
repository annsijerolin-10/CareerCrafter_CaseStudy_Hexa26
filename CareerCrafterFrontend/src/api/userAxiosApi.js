import axios from "axios";

const BASE_URL = "https://localhost:7109/api/Users";

function getErrorMessage(error, fallback) {

    if (error.response?.data?.message)
        return error.response.data.message;

    if (error.response?.data?.title)
        return error.response.data.title;

    return error.message || fallback;

}

export async function registerUser(userData) {

    try {

        const response = await axios.post(
            BASE_URL,
            userData
        );

        return response.data;

    }
    catch (error) {

        throw new Error(
            getErrorMessage(
                error,
                "Registration failed."
            )
        );

    }

}