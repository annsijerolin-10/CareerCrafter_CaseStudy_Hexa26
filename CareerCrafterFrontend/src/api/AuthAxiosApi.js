import axios from "axios";
const BASE_URL="https://localhost:7109/api/Auth";
export function loginUser(loginData){
    return axios.post(`${BASE_URL}/login`,loginData)
}

function getErrorMessage(error,fallback){

    if(error.response?.data?.message)
        return error.response.data.message;

    if(error.response?.data?.title)
        return error.response.data.title;

    return error.message || fallback;

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