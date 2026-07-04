import axios from "axios";

const BASE_URL = "https://localhost:7109/api/Jobs";

function getErrorMessage(error, fallbackMessage) {
    console.log("jobSeekerJobAxiosApi loaded");

    if (error.response?.data?.message)
        return error.response.data.message;

    if (error.response?.data?.title)
        return error.response.data.title;

    return error.message || fallbackMessage;
}

export async function getAllJobs(token) {

    console.log("Inside getAllJobs");

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

        console.log(error);

        throw new Error(
            getErrorMessage(error, "Failed to fetch jobs.")
        );
    }

}