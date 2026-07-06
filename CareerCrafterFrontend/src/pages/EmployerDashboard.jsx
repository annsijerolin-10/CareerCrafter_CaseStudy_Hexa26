import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { Link,Outlet } from "react-router-dom";
export function EmployerDashboard() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <div className="dashboard-container">

            <h2>CareerCrafter - Employer</h2>

            <p>Welcome {user.fullName}</p>

            <div className="card shadow-sm mb-4">

            <div className="card-body d-flex justify-content-between align-items-center flex-wrap">

            <div>


                <Link to="">Dashboard</Link>

                {" | "}

                <Link to="jobs">Manage Jobs</Link>

                {" | "}

                <Link to="applications">Applications</Link>

                {" | "}
             
                <Link to="profile">My Profile</Link>
          

                </div>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>
            </div>

            

            <Outlet/>

        </div>
    );
}