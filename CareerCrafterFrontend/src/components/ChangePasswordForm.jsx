import { useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { AlertMessage } from "./AlertMessage";
import { changePassword } from "../api/AuthAxiosApi";

export function ChangePasswordForm() {

    const { user,logout } = useAuth();
    const navigate=useNavigate();

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""

    });

    const [errorMessage, setErrorMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    useEffect(() => {

        if (!errorMessage && !successMessage)
            return;

        const timer = setTimeout(() => {

            setErrorMessage("");
            setSuccessMessage("");

        }, 3000);

        return () => clearTimeout(timer);

    }, [errorMessage, successMessage]);

    function handleChange(e) {

        setPasswordData({

            ...passwordData,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setErrorMessage("");

        setSuccessMessage("");
        if (passwordData.currentPassword.trim() === "") {
            setErrorMessage("Current Password is required.");
            return;
        }

        if (passwordData.newPassword.trim() === "") {
            setErrorMessage("New Password is required.");
            return;
        }

        if (passwordData.confirmPassword.trim() === "") {
            setErrorMessage("Confirm Password is required.");
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {

            setErrorMessage("New Password and Confirm Password do not match.");
            return;

        }

        try {

            await changePassword({

                userId: user.userId,
                currentPassword: passwordData.currentPassword,                 
                newPassword:passwordData.newPassword,                   
                confirmPassword:passwordData.confirmPassword
            });
            setSuccessMessage( "Password changed successfully.Redirecting to login page..");
             
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

            setTimeout(() => {
            logout();
            navigate("/");

        }, 2000);

           

        }

        catch (error) {
            setErrorMessage(error.message);
        }

    }

    return (

    <div className="card shadow-sm mt-4">

        <div className="card-body">

            <h3 className="mb-4 text-center">
                Change Password
            </h3>

            <AlertMessage
                message={errorMessage}
            />

            <AlertMessage
                type="success"
                message={successMessage}
            />

            <form onSubmit={handleSubmit}>

                <div className="row mb-3 align-items-center">

                    <label className="col-md-3 col-form-label">
                        Current Password
                    </label>

                    <div className="col-md-7">

                        <div className="input-group">

                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                className="form-control"
                                name="currentPassword"
                                placeholder="Enter Current Password"
                                value={passwordData.currentPassword}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    setShowCurrentPassword(!showCurrentPassword)
                                }
                            >
                                <i
                                    className={
                                        showCurrentPassword
                                            ? "bi bi-eye-slash"
                                            : "bi bi-eye"
                                    }
                                ></i>
                            </button>

                        </div>

                    </div>

                    <div className="col-md-2 text-end">

                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>

                    </div>

                </div>

                <div className="row mb-3 align-items-center">

                    <label className="col-md-3 col-form-label ">
                        New Password
                    </label>

                    <div className="col-md-9">

                        <div className="input-group">

                            <input
                                type={showNewPassword ? "text" : "password"}
                                className="form-control"
                                name="newPassword"
                                placeholder="Enter New Password"
                                value={passwordData.newPassword}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                }
                            >
                                <i
                                    className={
                                        showNewPassword
                                            ? "bi bi-eye-slash"
                                            : "bi bi-eye"
                                    }
                                ></i>
                            </button>

                        </div>

                    </div>

                </div>

                <div className="row mb-4 align-items-center">

                    <label className="col-md-3 col-form-label ">
                        Confirm Password
                    </label>

                    <div className="col-md-9">

                        <div className="input-group">

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-control"
                                name="confirmPassword"
                                placeholder="Confirm New Password"
                                value={passwordData.confirmPassword}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                <i
                                    className={
                                        showConfirmPassword
                                            ? "bi bi-eye-slash"
                                            : "bi bi-eye"
                                    }
                                ></i>
                            </button>

                        </div>

                    </div>

                </div>

               <button
                    className="btn btn-primary"
                    type="submit">

                    Change Password
                </button>

            </form>

        </div>

    </div>

);

}