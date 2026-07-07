import { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { loginUser } from "../api/AuthAxiosApi.js";
import {useAuth} from "../context/AuthContext.jsx"
import { AlertMessage } from "../components/AlertMessage.jsx";
import { AuthLayout } from "../components/AuthLayout.jsx";

export function Login(){

    const [loginData,setLoginData]=useState({
        email:"",
        password:""
    })
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const { login } = useAuth();

    useEffect(() => {

    if (errorMessage) {

        const timer = setTimeout(() => {
            setErrorMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }

}, [errorMessage]);

useEffect(() => {

    if (successMessage) {

        const timer = setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }

}, [successMessage]);

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
    //       setTimeout(() => {
    //     setErrorMessage("");
    // }, 3000);

          return;
        }
        if(loginData.password.trim()===""){
          setErrorMessage("Password is required");
    //       setTimeout(() => {
    //     setErrorMessage("");
    // }, 3000);

          return;
        }
        try{
          const response=await loginUser(loginData);
          setErrorMessage("");
          setSuccessMessage("Login successful! Redirecting...");
          setTimeout(() => {
            login(response);

            if (response.role === "Employer") {
                navigate("/employer/dashboard");
            }
            else if (response.role === "JobSeeker") {
                navigate("/jobseeker/dashboard");
            }
        }, 1200);


    }
    catch (error) {  

    setSuccessMessage("");

    setErrorMessage(error.message);
    // setTimeout(() => {
    //     setErrorMessage("");
    // }, 3000);




  }

    
  }

  return (
  

      
        <AuthLayout title="CareerCrafter Login">

        <AlertMessage
        type="success"
        message={successMessage}
    />

    <AlertMessage
        message={errorMessage}/>

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
          </AuthLayout>


  );
}