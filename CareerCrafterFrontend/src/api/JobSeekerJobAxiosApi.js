import axios from "axios";

const BASE_URL = "https://localhost:7109/api/Jobs";

function getErrorMessage(error, fallbackMessage) {

    if (error.response?.data?.message)
        return error.response.data.message;

    if (error.response?.data?.title)
        return error.response.data.title;

    return error.message || fallbackMessage;
}

export async function getAllJobs(token) {
    try {

        const response = await axios.get(
            `${BASE_URL}?PageNumber=1&PageSize=100`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(response);

        return response.data;
    }
    catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to fetch jobs.")
        );
    }

}
export async function searchJobs(
    title,
    location,
    token
) {

    try {

        const response = await axios.get(

            `${BASE_URL}/search`,

            {
                params: {
                    title,
                    location
                },

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
                "Failed to search jobs."
            )
        );

    }

}

export async function getRecommendedJobs(jobSeekerId, token) {

    try {

        const response = await axios.get(
            `${BASE_URL}/recommend/${jobSeekerId}`,
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
            getErrorMessage(error, "Failed to load recommended jobs.")
        );

    }

}


