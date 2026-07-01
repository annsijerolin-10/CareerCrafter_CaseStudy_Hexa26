import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
export function JobSeekerDashboard(){
    const navigate=useNavigate();
    const {logout}=useAuth();
    function handleLogout(){
        logout();
        navigate("/");
    }
    return(
        <div>
            JobSeeker Dashboard
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}