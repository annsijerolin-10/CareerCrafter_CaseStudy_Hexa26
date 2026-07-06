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
        <div>

            <h2>CareerCrafter - Employer</h2>

            <p>Welcome {user.fullName}</p>

            <hr/>

            <nav>

                <Link to="">Dashboard</Link>

                {" | "}

                <Link to="jobs">Manage Jobs</Link>

                {" | "}

                <Link to="applications">Applications</Link>

                {" | "}
             
                <Link to="profile">My Profile</Link>
          

                

                <button onClick={handleLogout}>
                    Logout
                </button>

            </nav>

            <hr/>

            <Outlet/>

        </div>
    );
}