import { Link } from "react-router-dom";
export function EmployerNavbar({ handleLogout }) {

    return (

        <nav>

            <Link to="">
                Dashboard
            </Link>

            {" | "}

            <Link to="jobs">
                Manage Jobs
            </Link>

            {" | "}

            <Link to="applications">
                Applications
            </Link>

            {" | "}

            
                <Link to="profile">My Profile</Link>
            

            <button onClick={handleLogout}>
                Logout
            </button>

        </nav>

    );

}