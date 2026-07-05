import axios from "axios";

const BASE_URL = "https://localhost:7109/api/JobSeekers";

function getErrorMessage(error, fallbackMessage) {

    if (error.response?.data?.message)
        return error.response.data.message;

    if (error.response?.data?.title)
        return error.response.data.title;

    return error.message || fallbackMessage;
}

export async function getJobSeekerProfile(
    jobSeekerId,
    token
) {

    try {

        const response = await axios.get(
            `${BASE_URL}/${jobSeekerId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data.data;

    }
    catch (error) {

        throw new Error(
            getErrorMessage(
                error,
                "Failed to load profile."
            )
        );

    }

}

export async function updateJobSeekerProfile(
    jobSeekerId,
    profileData,
    token
) {

    try {

        const response = await axios.put(
            `${BASE_URL}/${jobSeekerId}`,
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
                "Failed to update profile."
            )
        );

    }

}