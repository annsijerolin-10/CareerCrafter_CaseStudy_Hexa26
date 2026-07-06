import {useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import {registerUser} from "../api/userAxiosApi";
import { AlertMessage } from "../components/AlertMessage";
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
        experienceYears: ""
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
                    experienceYears: ""
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
            await registerUser(userData);
            
            setErrorMessage("");
            setSuccessMessage("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
        catch (error) {

    setErrorMessage(error.message);

}
    }


return(
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card auth-card shadow-lg p-4">
    

    <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <AlertMessage
            message={errorMessage}
        />
        <AlertMessage
            type="success"
            message={successMessage}
        />
        <div className="mb-3">

            <label className="form-label">
                Full Name
            </label>
            <input
                type="text"
                name="fullName"
                className="form-control"
                placeholder="Enter your Full Name"
                value={userData.fullName}
                onChange={handleChange}
            />
        </div>

         <div className="mb-3">

            <label className="form-label">
                Email
            </label>
            <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter the Email"
                value={userData.email}
                onChange={handleChange}
            />   
        </div>  
         <div className="mb-3">

            <label className="form-label">
                Password
            </label>   
            <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter the Password"
                value={userData.password}
                onChange={handleChange}
            />
        </div>

        <div className="mb-3">

            <label className="form-label">
                Role
            </label>

            <select
                className="form-select"
                name="role"
                value={userData.role}
                onChange={handleChange}
            >
                <option value="">Select a role</option>
                <option value="Employer">Employer</option>
                <option value="JobSeeker">Job Seeker</option>
            </select>
        </div>
        {
            
            userData.role === "Employer" && (
                <>
                   <div className="mb-3">

                        <label className="form-label">
                        Comapny Name
                        </label>
                    
                    <input
                        type="text"
                        name="companyName"
                        className="form-control"
                        placeholder="Enter the Company Name (Optional)"
                        value={userData.companyName}
                        onChange={handleChange}
                    />
                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                        Company Description
                        </label>


                    <input
                        type="text"
                        name="companyDescription"
                        className="form-control"
                        placeholder="Company Description (Optional)"
                        value={userData.companyDescription}
                        onChange={handleChange}
                    />
                    </div>
                </>
            )
        }

        {
            userData.role === "JobSeeker" && (
                <>
                    <div className="mb-3">

                        <label className="form-label">
                        Phone Number
                        </label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter your Phone Number(Optional)"
                        value={userData.phone}
                        onChange={handleChange}
                    />
                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                        Address
                        </label>

                    <input
                        type="text"
                        name="address"
                        placeholder="Enter your Address (Optional)"
                        value={userData.address}
                        onChange={handleChange}
                    />
                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                        Skills
                        </label>


                    <input
                        type="text"
                        name="skills"
                        placeholder="Enter your Skills (Optional)"
                        value={userData.skills}
                        onChange={handleChange}
                    />
                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                        Experience
                        </label>


                    <input
                        type="number"
                        name="experienceYears"
                        placeholder="Enter your Work Experience (Optional)"
                        value={userData.experienceYears}
                        onChange={handleChange}
                    />
                    </div>
                </>
            )
        }
        <div>
        <button
            type="submit"
            className="btn btn-success w-100"
        >
            Register
        </button>
        </div>
        <div className="text-center mt-3">
            Already have an account?

            <Link
                to="/"
                className="ms-2"
            >
                Login
            </Link>

        </div>
    </form>
    </div>
    </div>
    
);
}