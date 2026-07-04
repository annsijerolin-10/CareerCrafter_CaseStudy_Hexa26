import axios from "axios";

const BASE_URL = "https://localhost:7109/api/Resumes";

function getErrorMessage(error, fallbackMessage) {

    if (error.response?.data?.message)
        return error.response.data.message;

    if (error.response?.data?.title)
        return error.response.data.title;

    if (error.message)
        return error.message;

    return fallbackMessage;
}

export async function getResumesByJobSeeker(jobSeekerId, token) {

    try {

        const response = await axios.get(
            `https://localhost:7109/api/Resumes/jobseeker/${jobSeekerId}`,
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
            getErrorMessage(error, "Failed to fetch resume.")
        );

    }
}

export async function uploadResume(formData, token) {

    try {

        const response = await axios.post(
            BASE_URL,
            formData,
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
            getErrorMessage(error, "Failed to upload resume.")
        );

    }

}

export async function updateResume(
    resumeId,
    formData,
    token
) {

    try {

        const response = await axios.put(
            `${BASE_URL}/${resumeId}`,
            formData,
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
            getErrorMessage(error, "Failed to update resume.")
        );

    }

}

export async function deleteResume(
    resumeId,
    token
) {

    try {

        const response = await axios.delete(
            `${BASE_URL}/${resumeId}`,
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
            getErrorMessage(error, "Failed to delete resume.")
        );

    }

}