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

export async function applyJob(applicationData, token) {

    try {

        const response = await axios.post(
            BASE_URL,
            applicationData,
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
            getErrorMessage(error, "Failed to apply for job.")
        );

    }
}

export async function getApplicationsByJobSeeker(jobSeekerId, token) {

    try {

        const response = await axios.get(
            `${BASE_URL}/jobseeker/${jobSeekerId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;

    }
    catch (error) {

        throw new Error(getErrorMessage(error, "Failed to fetch applications."));

    }

}

export async function withdrawApplication(
    applicationId,
    token
) {

    try {

        await axios.put(
            `${BASE_URL}/${applicationId}/withdraw`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

    }
    catch (error) {

        throw new Error(
            getErrorMessage(
                error,
                "Failed to withdraw application."
            )
        );

    }

}