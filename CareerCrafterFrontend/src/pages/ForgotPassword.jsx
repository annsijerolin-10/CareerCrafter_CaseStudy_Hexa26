import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/AuthAxiosApi";
import { AlertMessage } from "../components/AlertMessage";

export function ForgotPassword() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");

        if (formData.email.trim() === "") {
            setErrorMessage("Email is required.");
            return;
        }

        if (formData.newPassword.trim() === "") {
            setErrorMessage("New Password is required.");
            return;
        }

        if (formData.confirmPassword.trim() === "") {
            setErrorMessage("Confirm Password is required.");
            return;
        }

        try {

            const response =
                await forgotPassword(formData);

            setSuccessMessage(response.message);

            setTimeout(() => {
                navigate("/");
            }, 1500);

        }
        catch (error) {

            setErrorMessage(error.message);

        }

    }

    return (
        
        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div className="card auth-card shadow-lg p-4">

                <h2 className="text-center mb-4">
                    Forgot Password
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
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            New Password
                        </label>

                        <input
                            type="password"
                            name="newPassword"
                            className="form-control"
                            placeholder="Enter New Password"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            placeholder="Confirm New Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Reset Password
                    </button>

                </form>

                <div className="text-center mt-3">

                    <Link to="/">
                        ← Back to Login
                    </Link>

                </div>

            </div>

        </div>
    );
}