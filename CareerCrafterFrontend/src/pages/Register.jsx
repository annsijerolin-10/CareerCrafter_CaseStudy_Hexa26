import {useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import {registerUser} from "../api/userAxiosApi";
export function Register(){
    const navigate=useNavigate();
    const[userData,setUserData]=useState({
        fullName:"",
        email:"",
        password:"",
        role:"",
        companyName: "",
        companyDescription: "",
        phone: "",
        address: "",
        skills: "",
        experienceYears: 0
    });
    const[errorMessage,setErrorMessage]=useState("");
    const [successMessage, setSuccessMessage] = useState("");
    function handleChange(e) {

        const { name, value } = e.target;

        if (name === "role") {

            if (value === "Employer") {

                setUserData({
                    ...userData,
                    role: value,

                    phone: "",
                    address: "",
                    skills: "",
                    experienceYears: 0
                });

            }
            else {

                setUserData({
                    ...userData,
                    role: value,

                    companyName: "",
                    companyDescription: ""
                });

            }

            return;
        }

        setUserData({
            ...userData,
            [name]: value
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
            setSuccessMessage("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/");
            }, 2000);
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
        {successMessage && (
            <p style={{ color: "green" }}>
                {successMessage}
            </p>
        )}
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
        {
            userData.role === "Employer" && (
                <>
                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name (Optional)"
                        value={userData.companyName}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="companyDescription"
                        placeholder="Company Description (Optional)"
                        value={userData.companyDescription}
                        onChange={handleChange}
                    />
                </>
            )
        }

        {
            userData.role === "JobSeeker" && (
                <>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone (Optional)"
                        value={userData.phone}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Address (Optional)"
                        value={userData.address}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="skills"
                        placeholder="Skills (Optional)"
                        value={userData.skills}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="experienceYears"
                        placeholder="Experience (Optional)"
                        value={userData.experienceYears}
                        onChange={handleChange}
                    />
                </>
            )
        }
        <button type="submit">Register</button>
        <p>
        <Link to="/">Already have an account? Login</Link>
        </p>
    </form>
);
}