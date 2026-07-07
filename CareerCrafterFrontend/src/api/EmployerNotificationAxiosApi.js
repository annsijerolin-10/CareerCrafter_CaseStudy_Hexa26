import axios from "axios";

const BASE_URL =
    "https://localhost:7109/api/EmployerNotifications";

function getErrorMessage(error, fallback) {

    if (error.response?.data?.message)
        return error.response.data.message;

    if (error.response?.data?.title)
        return error.response.data.title;

    return error.message || fallback;
}

export async function getEmployerNotifications(
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

        return response.data;

    }
    catch (error) {

        throw new Error(
            getErrorMessage(
                error,
                "Failed to load notifications."
            )
        );

    }
}

export async function markEmployerNotificationRead(
    notificationId,
    token
) {

    try {

        await axios.put(
            `${BASE_URL}/read/${notificationId}`,
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
                "Failed to mark notification."
            )
        );

    }

}   
export async function markAllEmployerNotificationsRead(
    employerId,
    token
) {

    try {

        await axios.put(
            `${BASE_URL}/read-all/${employerId}`,
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
                "Failed to mark notifications."
            )
        );

    }

}