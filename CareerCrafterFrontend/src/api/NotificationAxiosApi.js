import axios from "axios";

const BASE_URL = "https://localhost:7109/api/Notifications";

function getErrorMessage(error, fallbackMessage) {

    if (error.response?.data?.message)
        return error.response.data.message;

    if (error.response?.data?.title)
        return error.response.data.title;

    return error.message || fallbackMessage;

}

export async function getNotificationsByJobSeeker(
    jobSeekerId,
    token
) {

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

        throw new Error(
            getErrorMessage(
                error,
                "Failed to fetch notifications."
            )
        );

    }

}

export async function markNotificationAsRead(
    notificationId,
    token
) {

    try {

        const response = await axios.put(
            `${BASE_URL}/${notificationId}/read`,
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
            getErrorMessage(
                error,
                "Failed to update notification."
            )
        );

    }

}

export async function markAllNotificationsAsRead(
    jobSeekerId,
    token
) {
    try {

        await axios.put(
            `${BASE_URL}/jobseeker/${jobSeekerId}/read-all`,
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
                "Failed to update notifications."
            )
        );

    }
}