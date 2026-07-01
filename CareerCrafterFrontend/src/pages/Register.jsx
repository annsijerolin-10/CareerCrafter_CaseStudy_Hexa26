import {useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import {registerUser} from "../api/userAxiosApi";
export function Register(){
    const navigate=useNavigate();
    const[userData,setUserData]=useState({
        fullName:"",
        email:"",
        password:"",
        role:""
    });
    const[errorMessage,setErrorMessage]=useState("");
    function handleChange(e){
        setUserData({
            ...userData,
            [e.target.name]:e.target.value
        });
    }
    async function handleSubmit(e){
        e.preventDefault();
        setErrorMessage("");
        if(userData.fullName.trim()===""){
            setErrorMessage("Full Name is required");
            return;
        }
        if(userData.email.trim()===""){
            setErrorMessage("Email is required");
            return;
        }
        if(userData.password.trim()===""){
            setErrorMessage("Password is required");
            return;
        }
        if(userData.role.trim()===""){
            setErrorMessage("Select a role.");
            return;
        }
        try{
            const response=await registerUser(userData);
            console.log(response.data);
            setErrorMessage("");
            navigate("/");
        }
        catch(error){
            if (error.response?.data?.title) {
                setErrorMessage(error.response.data.title);
            }
            else if (typeof error.response?.data === "string") {
                setErrorMessage(error.response.data);
            }

            else {
                setErrorMessage("Registration failed. Please try again.");
            }
        }
    }


return(
    <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>
        }
        <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={userData.fullName}
            onChange={handleChange}
        />
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
        />        <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
        />
        <select
            name="role"
            value={userData.role}
            onChange={handleChange}
        >
            <option value="">Select a role</option>
            <option value="Employer">Employer</option>
            <option value="JobSeeker">Job Seeker</option>
        </select>
        <button type="submit">Register</button>
        <p>
        <Link to="/">Already have an account? Login</Link>
        </p>
    </form>
);
}