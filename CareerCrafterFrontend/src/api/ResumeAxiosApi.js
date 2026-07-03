export async function getResumeByJobSeeker(jobSeekerId, token) {

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