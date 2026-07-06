import { useState} from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

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

        <form onSubmit={handleSubmit}>

            <h3>Change Password</h3>

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

                type="password"

                name="currentPassword"

                placeholder="Current Password"

                value={passwordData.currentPassword}

                onChange={handleChange}
                

            />
                
            <p>
                <Link to="/forgot-password">
                    Forgot Password?
                </Link>
            </p>

            <br /><br />

            <input

                type="password"

                name="newPassword"

                placeholder="New Password"

                value={passwordData.newPassword}

                onChange={handleChange}

            />

            <br /><br />

            <input

                type="password"

                name="confirmPassword"

                placeholder="Confirm Password"

                value={passwordData.confirmPassword}

                onChange={handleChange}

            />

            <br /><br />

            <button type="submit">

                Change Password

            </button>

        </form>

    );

}