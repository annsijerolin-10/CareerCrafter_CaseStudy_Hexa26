import axios from "axios";

const BASE_URL = "https://localhost:7109/api/Employer";

function getErrorMessage(error, fallbackMessage) {

    if (error.response?.data?.message)
        return error.response.data.message;

    if (error.response?.data?.title)
        return error.response.data.title;

    return error.message || fallbackMessage;
}

export async function getEmployerProfile(
    employerId,
    token
) {

    try {

        const response = await axios.get(

            `${BASE_URL}/${employerId}`,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        console.log(response.data);

return response.data.data;

    }
    catch (error) {

        throw new Error(
            getErrorMessage(
                error,
                "Failed to load employer profile."
            )
        );

    }

}

export async function updateEmployerProfile(
    employerId,
    profileData,
    token
) {

    try {

        const response = await axios.put(

            `${BASE_URL}/${employerId}`,

            profileData,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        return response.data;

    }
    catch (error) {

        throw new Error(
            getErrorMessage(
                error,
                "Failed to update employer profile."
            )
        );

    }

}

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

export async function getCandidateProfile(
    jobSeekerId,
    token
) {

    try {

        const response = await axios.get(
            `${BASE_URL}/candidate/${jobSeekerId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;

    }
    catch (error) {

        throw new Error(
            getErrorMessage(
                error,
                "Failed to load candidate profile."
            )
        );

    }

}