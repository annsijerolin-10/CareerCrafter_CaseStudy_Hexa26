import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
    getEmployerProfile,
    updateEmployerProfile
} from "../api/EmployerAxiosApi";
import { AlertMessage } from "./AlertMessage";
export function EmployerProfileForm() {

    const { user } = useAuth();

    const [profile, setProfile] = useState({

        fullName: "",

        email: "",

        companyName: "",

        companyDescription: ""

    });

    const [errorMessage, setErrorMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {

        loadProfile();

    }, []);

    useEffect(() => {

    if (!successMessage) return;

    const timer = setTimeout(() => {
        setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);

}, [successMessage]);

    useEffect(() => {
        if (!errorMessage) return;
        const timer = setTimeout(() => {
            setErrorMessage("");
        }, 3000);

        return () => clearTimeout(timer);

    }, [errorMessage]);

    async function loadProfile() {

        try {

            const response =await getEmployerProfile(           
                    user.employerId,
                    user.token
                );

            console.log(response);
            setProfile(response);

        }
        catch (error) {

            setErrorMessage(error.message);

        }

    }

    function handleChange(e) {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setErrorMessage("");

        setSuccessMessage("");

        try {

            await updateEmployerProfile(

                user.employerId,

                {

                    companyName:
                        profile.companyName,

                    companyDescription:
                        profile.companyDescription

                },

                user.token

            );

            setSuccessMessage(
                "Profile updated successfully."
            );

        }

        catch (error) {

            setErrorMessage(error.message);

        }

    }

    return (
        <div className="card shadow-sm">
            <div className="card-body">
        <form onSubmit={handleSubmit}>

            <AlertMessage
                message={errorMessage}
            />

            <AlertMessage
                type="success"
                message={successMessage}
            />

            <div className="form-row">

                    <label>
                Full Name
                </label>

            <input
                className="form-control"
                type="text"
                value={profile.fullName}
                disabled
                placeholder="Full Name"
            />
            </div>
            <div className="form-row">

                <label>
                Email
                </label>
            <input
                className="form-control"
                type="email"
                value={profile.email}
                disabled
                placeholder="Email"
            />
            </div>
           <div className="form-row">

                <label>
                Company Name
                </label>

            <input
                className="form-control"
                type="text"
                name="companyName"
                value={profile.companyName}
                onChange={handleChange}
                placeholder="Company Name"
            />
            </div>

            <div className="form-row">

                <label>
                Company Description
                </label>

            <textarea
                className="form-control"
                name="companyDescription"
                value={profile.companyDescription}
                onChange={handleChange}
                placeholder="Company Description"
                rows="5"
            />
            </div>
            <div className="form-actions">

                <button
                    className="btn btn-primary"
                    type="submit">
                Save Changes
            </button>
            </div>

        </form>
        </div>
        </div>

    );

}