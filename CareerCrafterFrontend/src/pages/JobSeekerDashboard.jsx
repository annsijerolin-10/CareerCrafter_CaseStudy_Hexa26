import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function JobSeekerDashboard() {

    const { user, logout } = useAuth();

    return (
        <div className="dashboard-container">

            <h1>CareerCrafter - Job Seeker</h1>

            <h2>Welcome {user.fullName}</h2>

            <div className="card shadow-sm mb-4">
            <div className="card-body d-flex justify-content-between align-items-center flex-wrap">

                <div>

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
                    </Link>

                    <Link
                        className="btn btn-outline-primary mb-2"
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

        

            <Outlet />

        </div>
    );
}

