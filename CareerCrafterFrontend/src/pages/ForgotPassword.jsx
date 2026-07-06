import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/AuthAxiosApi";

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

        <form onSubmit={handleSubmit}>

            <h2>Forgot Password</h2>

            {
                errorMessage &&
                <p style={{ color: "red" }}>
                    {errorMessage}
                </p>
            }

            {
                successMessage &&
                <p style={{ color: "green" }}>
                    {successMessage}
                </p>
            }

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />

            <br /><br />

            <button type="submit">

                Reset Password

            </button>

            <br /><br />

            <Link to="/">

                Back to Login

            </Link>

        </form>

    );

}