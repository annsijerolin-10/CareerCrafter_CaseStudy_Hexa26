import axios from "axios";

const BASE_URL = "https://localhost:7109/api/Users";

// function getErrorMessage(error, fallback) {

//     if (error.response?.data?.message)
//         return error.response.data.message;

//     if (error.response?.data?.title)
//         return error.response.data.title;

//     return error.message || fallback;

// }
function getErrorMessage(error, fallback) {

    if (typeof error.response?.data === "string")
        return error.response.data;

    if (error.response?.data?.message)
        return error.response.data.message;

    if (error.response?.data?.Message)
        return error.response.data.Message;

    // Handle FluentValidation / ModelState errors
    if (error.response?.data?.errors) {

        const errors = error.response.data.errors;

        const firstKey = Object.keys(errors)[0];

        if (firstKey && errors[firstKey].length > 0) {
            return errors[firstKey][0];
        }
    }

    if (error.response?.data?.title)
        return error.response.data.title;

    return fallback;
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