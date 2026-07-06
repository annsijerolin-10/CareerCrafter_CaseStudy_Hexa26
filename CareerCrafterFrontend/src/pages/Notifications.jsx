import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    getNotificationsByJobSeeker,
    markNotificationAsRead
} from "../api/NotificationAxiosApi";
import { AlertMessage } from "../components/AlertMessage";
import { NotificationTable } from "../components/NotificationTable";

export function Notifications() {

    const { user } = useAuth();

    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        loadNotifications();

    }, []);

    async function loadNotifications() {

        try {

            const response =
                await getNotificationsByJobSeeker(
                    user.jobSeekerId,
                    user.token
                );
                response.sort((a, b) =>
                    new Date(b.createdDate) - new Date(a.createdDate));
            setNotifications(response);
        }
        catch (error) {

            setError(error.message);

        }

    }

    async function handleMarkAsRead(notificationId) {

        try {

            await markNotificationAsRead(
                notificationId,
                user.token
            );

            loadNotifications();

        }
        catch (error) {

            setError(error.message);

        }

    }

    return (

        <div>

            <h2>My Notifications</h2>

            <AlertMessage
            message={error}
            />

            <NotificationTable
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
            />

        </div>

    );

}