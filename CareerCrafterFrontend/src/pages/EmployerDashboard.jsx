import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { EmployerNotificationListener } from "../components/EmployerNotificationListener";
import { useNotification } from "../context/NotificationContext";
import { Header } from "../components/Header";
export function EmployerDashboard() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { unreadCount } = useNotification();

    function handleLogout() {
        logout();
        navigate("/");
    }

    const navButton = ({ isActive }) =>
    `dashboard-link ${isActive ? "active-link" : ""}`;

    return (
        <Header>

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
                    Welcome back,{user.fullName}
                    
                
                </h4>
            </div>

                <div className="dashboard-nav-content">

                   <div className="dashboard-menu">

                        <NavLink
                            end
                            to=""
                            className={navButton}
                        >
                        <i className="bi bi-speedometer2 me-2"></i>
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="jobs"
                            className={navButton}
                        >
                            <i className="bi bi-briefcase me-2"></i>
                            Manage Jobs
                        </NavLink>

                        <NavLink
                            to="applications"
                            className={navButton}
                        >
                            <i className="bi bi-file-earmark-text me-2"></i>
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
                            <i className="bi bi-person-circle me-2"></i>
                            My Profile
                        </NavLink>

                    </div>

                   <button
                        className="btn btn-danger shrink-0"
                        onClick={handleLogout}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                    </button>

                </div>

            </div>

            <EmployerNotificationListener />
             </div>
                
            <Outlet />

       </Header>

    );

}