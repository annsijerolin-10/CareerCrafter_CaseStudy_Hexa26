import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { NotificationListener } from "../components/NotificationListener";
import { useNotification } from "../context/NotificationContext";
export function JobSeekerDashboard() {

    const { user, logout } = useAuth();
    const { unreadCount } = useNotification();

    return (
        <div className="dashboard-container">

                <div className="text-center mb-4">            
            <h1>CareerCrafter - Job Seeker</h1>

            <h2>Welcome {user.fullName}</h2>
            </div>

            <div className="card shadow-sm mb-4">

                    <div className="card-body d-flex justify-content-between align-items-center flex-wrap">

                        <div className="d-flex gap-2 flex-wrap">


                    <Link
                        className="btn btn-outline-primary me-2 mb-2"
                        to="/jobseeker/dashboard"
                    >
                        Dashboard
                    </Link>

                    <Link
                        className="btn btn-outline-primary me-2 mb-2"
                        to="/jobseeker/dashboard/jobs"
                    >
                        Browse Jobs
                    </Link>

                    <Link
                        className="btn btn-outline-primary me-2 mb-2"
                        to="/jobseeker/dashboard/applications"
                    >
                        My Applications
                    </Link>

                    <Link
                        className="btn btn-outline-primary me-2 mb-2"
                        to="/jobseeker/dashboard/resumes"
                    >
                        My Resumes
                    </Link>

                    <Link
                        className="btn btn-outline-primary me-2 mb-2"
                        to="/jobseeker/dashboard/notifications"
                    >
                        Notifications

                        {
                            unreadCount > 0 &&
                            <span className="badge bg-danger ms-2">
                                {unreadCount}
                            </span>
                        }
                    </Link>

                    <Link
                        className="btn btn-outline-primary me-2 mb-2"
                        to="/jobseeker/dashboard/profile"
                    >
                        My Profile
                    </Link>

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

