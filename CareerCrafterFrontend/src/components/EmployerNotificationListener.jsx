import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

import {getEmployerNotifications} from "../api/EmployerNotificationAxiosApi";

export function EmployerNotificationListener() {

    const { user } = useAuth();
    const { setUnreadCount } = useNotification();
    const navigate = useNavigate();
    const shownNotifications = useRef(new Set());

    useEffect(() => {
        if (!user?.employerId)
            return;
        loadNotifications();

        const interval = setInterval(
            loadNotifications,
            10000
        );

        return () => clearInterval(interval);

    }, [user]);

    async function loadNotifications() {

        try {

            const notifications =
                await getEmployerNotifications(
                    user.employerId,
                    user.token
                );

            const unread =
                notifications.filter(n => !n.isRead);

            setUnreadCount(unread.length);

            unread.forEach(notification => {

                if (
                    shownNotifications.current.has(
                        notification.employerNotificationId
                    )
                ) {
                    return;
                }

                shownNotifications.current.add(
                    notification.employerNotificationId
                );

                toast.info(

                    ({ closeToast }) => (

                        <div>

                            <strong>
                                New Application
                            </strong>

                            <p className="mt-2 mb-2">
                                {notification.message}
                            </p>

                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {

                                    closeToast();

                                    navigate(
                                        "/employer/dashboard/applications",
                                        {
                                            state: {
                                                applicationId:
                                                    notification.applicationId
                                            }
                                        }
                                    );

                                }}
                            >
                                View Application
                            </button>

                        </div>

                    ),

                    {
                        autoClose: 10000,
                        closeOnClick: false,
                        closeButton: true,
                        draggable: true
                    }

                );

            });

        }
        catch (error) {

            console.log(error);

        }

    }

    return null;

}