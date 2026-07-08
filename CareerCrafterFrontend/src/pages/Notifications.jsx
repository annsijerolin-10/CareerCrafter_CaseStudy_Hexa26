import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    getNotificationsByJobSeeker,
    markAllNotificationsAsRead
} from "../api/NotificationAxiosApi";

import { AlertMessage } from "../components/AlertMessage";
import { NotificationTable } from "../components/NotificationTable";
import { useNotification } from "../context/NotificationContext";
export function Notifications() {

    const { user } = useAuth();

    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState("");
    const { setUnreadCount } = useNotification();

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
            const unread =
                response.filter(n => !n.isRead);

            if (unread.length > 0) {

                await markAllNotificationsAsRead(
                    user.jobSeekerId,
                    user.token
                );

                response.forEach(n => n.isRead = true);

                setNotifications([...response]);

                setUnreadCount(0);
}
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
            setUnreadCount(prev => Math.max(prev - 1, 0));

        }
        catch (error) {

            setError(error.message);

        }

    }

    return (

        <div>

            <h2  className="text-center mb-4">My Notifications</h2>

            <AlertMessage
            message={error}
            />

            <NotificationTable
                notifications={notifications}
                
            />

        </div>

    );

}