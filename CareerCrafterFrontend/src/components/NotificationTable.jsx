export function NotificationTable({
    notifications
}) {

    if (notifications.length === 0) {
        return <p>No Notifications Found.</p>;
    }

    return (

        <div className="card shadow rounded-4">

            <div className="card shadow-sm bg-white border-0">

                <div className="table-responsive">

                    <table className="table  table-hover align-middle">

                        <thead className="table-primary">

                            <tr>
                                <th>Message</th>
                                <th>Date</th>
                                
                            </tr>

                        </thead>

                        <tbody>

                            {notifications.map(notification => (

                                <tr
                                    key={notification.notificationId}
                                    style={{
                                        fontWeight: notification.isRead
                                            ? "normal"
                                            : "bold"
                                    }}
                                >

                                    <td>
                                        {notification.message}
                                    </td>

                                    <td>
                                        {
                                            new Date(
                                                notification.createdDate
                                            ).toLocaleString()
                                        }
                                    </td>

                                   
                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}