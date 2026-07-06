import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { loginUser } from "../api/AuthAxiosApi.js";
import {useAuth} from "../context/AuthContext.jsx"

export function Login(){
    const [loginData,setLoginData]=useState({
        email:"",
        password:""
    })
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
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
          console.log(response.data);
          login(response.data);
          setErrorMessage("");
          if (response.data.role === "Employer") {

            navigate("/employer/dashboard");

          }
          else if (response.data.role === "JobSeeker") {

            navigate("/jobseeker/dashboard");

          }


    }
    catch(error){
      setErrorMessage("Invalid Email or Password")
    }

    
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={loginData.email}
        onChange={handleChange}
      />

     

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={loginData.password}
        onChange={handleChange}
      />
      {errorMessage && 
      <p style={{ color: "red" }}>
        {errorMessage}

      </p>
      }

      <button type="submit">
        Login
      </button>

      <p>
    <Link to="/forgot-password">
        Forgot Password?
    </Link>
</p>

      <p>
        Don't have an account? 
        <Link to="/register">Register</Link>
      </p>
    </form>
  );

}
