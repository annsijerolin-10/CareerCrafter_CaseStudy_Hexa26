import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { getNotificationsByJobSeeker }
from "../api/NotificationAxiosApi";

import { useNotification } from "../context/NotificationContext";

export function NotificationListener() {

    const { user } = useAuth();

    const shownNotifications = useRef([]);
    const { setUnreadCount } = useNotification();

    useEffect(() => {

        if (!user?.jobSeekerId)
            return;

        checkNotifications();

        const interval = setInterval(
            checkNotifications,
            10000
        );

        return () => clearInterval(interval);

    }, []);

    async function checkNotifications() {

        try {

            const notifications =
                await getNotificationsByJobSeeker(
                    user.jobSeekerId,
                    user.token
                );

            notifications
                .filter(n => !n.isRead)
                .forEach(notification => {

                    if (
                        !shownNotifications.current.includes(
                            notification.notificationId
                        )
                    ) {

                        toast.info(notification.message);
                        setUnreadCount(prev => prev + 1);

                        shownNotifications.current.push(
                            notification.notificationId
                        );

                    }

                });

        }
        catch {

        }

    }

    return null;

}