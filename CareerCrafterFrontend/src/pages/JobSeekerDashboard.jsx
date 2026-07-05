import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function JobSeekerDashboard() {

    const { user, logout } = useAuth();

    return (
        <div>

            <h1>CareerCrafter - Job Seeker</h1>

            <h2>Welcome {user.fullName}</h2>

            <nav>

                <Link to="/jobseeker/dashboard">
                    Dashboard
                </Link>

                {" | "}

                <Link to="/jobseeker/dashboard/jobs">
                    Browse Jobs
                </Link>

                {" | "}

                <Link to="/jobseeker/dashboard/applications">
                    My Applications
                </Link>

                {" | "}

                <Link to="/jobseeker/dashboard/resumes">
                    My Resumes
                </Link>

                {" | "}

                <Link to="/jobseeker/dashboard/notifications">
                    Notifications
                </Link>
                <Link to="/jobseeker/dashboard/profile">

    My Profile

</Link>

                {" | "}

                <button onClick={logout}>
                    Logout
                </button>

            </nav>

            <hr />

            <Outlet />

        </div>
    );
}

