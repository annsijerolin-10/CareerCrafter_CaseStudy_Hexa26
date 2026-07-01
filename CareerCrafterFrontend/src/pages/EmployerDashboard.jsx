import {useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {getEmployerDashboard} from "../api/EmployerAxiosApi.jsx";
export function EmployerDashboard(){
    
    const navigate=useNavigate();
    const {user, logout}=useAuth();
    const [dashboard,setDashboard]=useState(null);
    const[error,setError]=useState("");
    useEffect(()=>{loadDashboard()},[]);
    async function loadDashboard(){
        try{
            const response=await getEmployerDashboard(
                user.employerId,user.token);
            setDashboard(response.data);
        }
        catch(error){
            setError("Failed to load dashboard");
        }
    }
    function handleLogout(){
        logout();
        navigate("/");
    }
    return(
        <div>
            <h2>Employer Dashboard</h2>
            <h3>Welcome, {user.fullName}</h3>
            {error && <p style={{color:"red"}}>{error}</p>}
            {dashboard && 
                <>
                    <p>Total Job Posts: {dashboard.totalJobsPosted}</p>
                    <p>Total Applications: {dashboard.totalApplications}</p>
                    <p>Applied: {dashboard.appliedCount}</p>
                    <p>Shortlisted: {dashboard.shortlistedCount}</p>
                    <p>Rejected: {dashboard.rejectedCount}</p>
                    <p>Withdrawn: {dashboard.withdrawnCount}</p>
               
                </>
            }
                
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}