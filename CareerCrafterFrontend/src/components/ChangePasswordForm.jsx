import { useState} from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { AlertMessage } from "./AlertMessage";
import { changePassword } from "../api/AuthAxiosApi";

export function ChangePasswordForm() {

    const { user } = useAuth();

    const [passwordData, setPasswordData] = useState({

        currentPassword: "",

        newPassword: "",

        confirmPassword: ""

    });

    const [errorMessage, setErrorMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

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

        try {

            await changePassword({

                userId: user.userId,

                currentPassword:
                    passwordData.currentPassword,

                newPassword:
                    passwordData.newPassword,

                confirmPassword:
                    passwordData.confirmPassword

            });

            setSuccessMessage(
                "Password changed successfully."
            );

            setPasswordData({

                currentPassword: "",

                newPassword: "",

                confirmPassword: ""

            });

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

                <div className="form-row">

                    <label>
                        Current Password
                    </label>

                    <input
                        type="password"
                        name="currentPassword"
                        className="form-control"
                        placeholder="Enter Current Password"
                        value={passwordData.currentPassword}
                        onChange={handleChange}
                    />

                    <div className="text-end mt-2">

                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>

                    </div>

                </div>

                <div className="form-row">

                    <label>
                        New Password
                    </label>

                    <input
                        type="password"
                        name="newPassword"
                        className="form-control"
                        placeholder="Enter New Password"
                        value={passwordData.newPassword}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-row">

                    <label>
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Confirm New Password"
                        value={passwordData.confirmPassword}
                        onChange={handleChange}
                    />

                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                >
                    Change Password
                </button>

            </form>

        </div>

    </div>

);

}