import axios from "axios";

const BASE_URL = "https://localhost:7109/api/Jobs";

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


export async function getEmployerJobs(employerId, token) {

    try {

        const response = await axios.get(
            `${BASE_URL}/employer/${employerId}`,
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
            getErrorMessage(error, "Failed to fetch jobs.")
        );
    }
}


export async function addJob(jobData, token) {

    try {

        const response = await axios.post(
            BASE_URL,
            jobData,
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
            getErrorMessage(error, "Failed to add job.")
        );
    }
}


export async function updateJob(jobId, jobData, token) {

    try {

        const response = await axios.put(
            `${BASE_URL}/${jobId}`,
            jobData,
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
            getErrorMessage(error, "Failed to update job.")
        );
    }
}


export async function deleteJob(jobId, token) {

    try {

        const response = await axios.delete(
            `${BASE_URL}/${jobId}`,
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
            getErrorMessage(error, "Failed to delete job.")
        );
    }
}
export async function getArchivedJobs(employerId, token) {

    try {

        const response = await axios.get(
            `${BASE_URL}/employer/${employerId}/archived`,
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
            getErrorMessage(error, "Failed to fetch archived jobs.")
        );

    }

}
export async function restoreJob(jobId, token) {

    try {

        const response = await axios.put(
            `${BASE_URL}/restore/${jobId}`,
            {},
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
            getErrorMessage(error, "Failed to restore job.")
        );

    }

}
