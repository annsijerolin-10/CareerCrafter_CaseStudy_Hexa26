import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { EmployerNotificationListener } from "../components/EmployerNotificationListener";
import { useNotification } from "../context/NotificationContext";
export function EmployerDashboard() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { unreadCount } = useNotification();

    function handleLogout() {
        logout();
        navigate("/");
    }

    const navButton = ({ isActive }) =>
        `btn ${
            isActive
                ? "btn-primary"
                : "btn-outline-primary"
        } px-3`;

    return (

        <div className="container py-4">

            <div className="text-center mb-4">

                <h1 className="fw-bold">
                    CareerCrafter - Employer
                </h1>

                <h4 className="text-muted">
                    Welcome {user.fullName}
                </h4>

            </div>

            <div className="card shadow rounded-4 mb-4">

                <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">

                    <div className="d-flex flex-wrap gap-2">

                        <NavLink
                            end
                            to=""
                            className={navButton}
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="jobs"
                            className={navButton}
                        >
                            Manage Jobs
                        </NavLink>

                        <NavLink
                            to="applications"
                            className={navButton}
                        >
                            Applications
                            {unreadCount > 0 && (
                                <span className="badge bg-danger ms-2">
                                    {unreadCount}
                                </span>)}
                        </NavLink>

                        <NavLink
                            to="profile"
                            className={navButton}
                        >
                            My Profile
                        </NavLink>

                    </div>

                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

            <EmployerNotificationListener />

            <Outlet />

        </div>

    );

}