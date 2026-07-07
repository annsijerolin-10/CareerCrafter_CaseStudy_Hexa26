import { useAuth } from "../context/AuthContext";

import { useNavigate, Link, Outlet } from "react-router-dom";

  

export function EmployerDashboard() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (

            <div className="dashboard-container">

                <div className="text-center mb-4">

                    <h2 className="fw-bold">
                        CareerCrafter - Employer
                    </h2>

                    <p className="text-muted">
                        Welcome {user.fullName}
                    </p>

                </div>

                <div className="card shadow-sm mb-4">

                    <div className="card-body d-flex justify-content-between align-items-center flex-wrap">

                        <div className="d-flex gap-2 flex-wrap">

                            <Link
                                className="btn btn-outline-primary"
                                to=""
                            >
                                Dashboard
                            </Link>

                            <Link
                                className="btn btn-outline-primary"
                                to="jobs"
                            >
                                Manage Jobs
                            </Link>

                            <Link
                                className="btn btn-outline-primary"
                                to="applications"
                            >
                                Applications
                            </Link>

                            <Link
                                className="btn btn-outline-primary"
                                to="profile"
                            >
                                My Profile
                            </Link>

                        </div>

                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

                <Outlet />

            </div>

        );

    }

