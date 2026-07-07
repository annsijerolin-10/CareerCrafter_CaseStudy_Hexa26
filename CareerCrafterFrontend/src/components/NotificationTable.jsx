export function NotificationTable({
    notifications,
    onMarkAsRead
}) {

    if (notifications.length === 0) {

        return <p>No Notifications Found.</p>;

    }

    return (

        <table border="1" cellPadding="10">

            <thead className="table-primary">

                <tr>

                    <th>Message</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {

                    notifications.map(notification => (

                        <tr
                            key={notification.notificationId}
                            style={{
                                fontWeight: notification.isRead
                                    ? "normal"
                                    : "bold"
                            }}
                        >

                            <td>{notification.message}</td>

                            <td>
                                {
                                    new Date(
                                        notification.createdDate
                                    ).toLocaleString()
                                }
                            </td>

                            <td>

                                {
                                    notification.isRead
                                        ? "Read"
                                        : "Unread"
                                }

                            </td>

                            <td>

                                {

                                    !notification.isRead ?

                                        <button
                                            onClick={() =>
                                                onMarkAsRead(
                                                    notification.notificationId
                                                )
                                            }
                                        >
                                            Mark as Read
                                        </button>

                                        :

                                        "-"

                                }

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}