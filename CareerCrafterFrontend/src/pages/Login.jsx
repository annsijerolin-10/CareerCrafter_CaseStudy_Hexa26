import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { loginUser } from "../api/AuthAxiosApi.js";
import {useAuth} from "../context/AuthContext.jsx"
import { AlertMessage } from "../components/AlertMessage.jsx";

export function Login(){
    const [loginData,setLoginData]=useState({
        email:"",
        password:""
    })
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const { login } = useAuth();

    function handleChange(e){
        setLoginData({
            ...loginData,
            [e.target.name]:e.target.value
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");
        if(loginData.email.trim()===""){
          setErrorMessage("Email is required");
          return;
        }
        if(loginData.password.trim()===""){
          setErrorMessage("Password is required");
          return;
        }
        try{
          const response=await loginUser(loginData);
          setErrorMessage("");
          setSuccessMessage("Login successful! Redirecting...");
          setTimeout(() => {
            login(response.data);
            
            if (response.data.role === "Employer") {

              navigate("/employer/dashboard");

            }
            else if (response.data.role === "JobSeeker") {

              navigate("/jobseeker/dashboard");

          }
        },1200);


    }
    catch (error) {

      setSuccessMessage("");

      setErrorMessage(
          error.response?.data?.message ||
          "Invalid Email or Password."
      );

  }

    
  }

  return (
  <div className="container d-flex justify-content-center align-items-center min-vh-100">

      
        <div className="card auth-card shadow-lg p-4">
      

          <h2 className="text-center mb-4">
              CareerCrafter Login
          </h2>
          <AlertMessage
            message={errorMessage}
        />

        <AlertMessage
            type="success"
            message={successMessage}
        />

          <form onSubmit={handleSubmit}>

              <div className="mb-3">

                  <label className="form-label">
                      Email
                  </label>

                  <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={loginData.email}
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
                      placeholder="Enter Password"
                      value={loginData.password}
                      onChange={handleChange}
                  />

              </div>

              

              <button
                  className="btn btn-primary w-100"
                  type="submit"
              >
                  Login
              </button>

          </form>

          <div className="text-center mt-3">

              <Link to="/forgot-password">
                  Forgot Password?
              </Link>

          </div>

          <div className="text-center mt-2">

              Don't have an account?

              <Link
                  to="/register"
                  className="ms-2"
              >
                  Register
              </Link>

          </div>


      </div>

  </div>
  );
}