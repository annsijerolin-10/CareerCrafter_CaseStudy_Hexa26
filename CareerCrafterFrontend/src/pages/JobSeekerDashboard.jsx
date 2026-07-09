import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { NotificationListener } from "../components/NotificationListener";
import { useNotification } from "../context/NotificationContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function JobSeekerDashboard() {

    const { user, logout } = useAuth();
    const { unreadCount } = useNotification();

   const navButton = ({ isActive }) =>
    `dashboard-link ${isActive ? "active-link" : ""}`;
    return (
       

        <div className="container py-4">

           

            <div className="dashboard-navbar shadow-sm">
                 <div className="text-center mb-5">

                <h1 className="display-5 fw-bold text-primary mb-1">
                    <i className="bi bi-briefcase-fill me-2"></i>
                    CareerCrafter
                </h1>
                <p className="auth-subtitle">
                    Connecting Talent with Opportunity
                </p>

                <h4 className="text-secondary">
                    Welcome!{user.fullName}
                    
                
                </h4>

            </div>

                <div className="dashboard-nav-content">

                   <div className="dashboard-menu">

                        <NavLink
                            end
                            to="/jobseeker/dashboard"
                            className={navButton}
                        >
                            <i className="bi bi-speedometer2 me-2"></i>
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/jobseeker/dashboard/jobs"
                            className={navButton}
                        >
                            <i className="bi bi-search me-2"></i>
                            Browse Jobs
                        </NavLink>

                        <NavLink
                            to="/jobseeker/dashboard/applications"
                            className={navButton}
                        >
                            <i className="bi bi-file-earmark-text me-2"></i>
                            My Applications
                        </NavLink>

                        <NavLink
                            to="/jobseeker/dashboard/resumes"
                            className={navButton}
                        >
                            <i className="bi bi-file-person me-2"></i>
                            My Resumes
                        </NavLink>

                        <NavLink
                            to="/jobseeker/dashboard/notifications"
                            className={navButton}
                        >
                            <i className="bi bi-bell me-2"></i>
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
                            <i className="bi bi-person-circle me-2"></i>
                            My Profile
                        </NavLink>

                    </div>

                    <button
                        className="btn btn-danger shrink-0"
                        onClick={logout}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                    </button>

                </div>

            </div>

            <NotificationListener />
                <div className="mt-4 animate-pag">
            <Outlet />
</div>
        </div>
        

    );

}