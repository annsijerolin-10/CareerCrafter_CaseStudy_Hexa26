import axios from "axios";

const BASE_URL = "https://localhost:7109/api/Applications";

function getErrorMessage(error, fallbackMessage) {

    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error.response?.data?.title) {
        return error.response.data.title;
    }

    if (error.message) {
        return error.message;
    }

    return fallbackMessage;
}

export async function getApplicationsByJob(jobId, token) {

    try {

        const response = await axios.get(
            `${BASE_URL}/job/${jobId}`,
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
            getErrorMessage(error, "Failed to fetch applications.")
        );

    }

}


export async function updateApplicationStatus(
    applicationId,
    status,
    token
) {

    try {
        console.log(token);

        const response = await axios.put(
            `${BASE_URL}/${applicationId}/status`,
            {
                status
            },
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
            getErrorMessage(error, "Failed to update status.")
        );

    }

}