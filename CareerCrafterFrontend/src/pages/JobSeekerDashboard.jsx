import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { NotificationListener } from "../components/NotificationListener";
import { useNotification } from "../context/NotificationContext";

export function JobSeekerDashboard() {

    const { user, logout } = useAuth();
    const { unreadCount } = useNotification();

    const navButton = ({ isActive }) =>
        `btn ${
            isActive ? "btn-primary" : "btn-outline-primary"
        } px-3`;

    return (

        <div className="container py-4">

            <div className="text-center mb-4">

                <h1 className="fw-bold">
                    CareerCrafter - Job Seeker
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
                            to="/jobseeker/dashboard"
                            className={navButton}
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/jobseeker/dashboard/jobs"
                            className={navButton}
                        >
                            Browse Jobs
                        </NavLink>

                        <NavLink
                            to="/jobseeker/dashboard/applications"
                            className={navButton}
                        >
                            My Applications
                        </NavLink>

                        <NavLink
                            to="/jobseeker/dashboard/resumes"
                            className={navButton}
                        >
                            My Resumes
                        </NavLink>

                        <NavLink
                            to="/jobseeker/dashboard/notifications"
                            className={navButton}
                        >
                            Notifications

                            {
                                unreadCount > 0 && (
                                    <span className="badge bg-danger ms-2">
                                        {unreadCount}
                                    </span>
                                )
                            }

                        </NavLink>

                        <NavLink
                            to="/jobseeker/dashboard/profile"
                            className={navButton}
                        >
                            My Profile
                        </NavLink>

                    </div>

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

            <NotificationListener />

            <Outlet />

        </div>

    );

}