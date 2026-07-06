import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
    getEmployerProfile,
    updateEmployerProfile
} from "../api/EmployerAxiosApi";

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

        <h4 className="mb-4">
            Company Profile
        </h4>

        <form onSubmit={handleSubmit}>

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
                className="form-control"
                type="text"
                value={profile.fullName}
                disabled
                placeholder="Full Name"
            />
            </div>

            <br /><br />
            <div className="mb-3">

                <label className="form-label">
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

            <br /><br />
            <div className="mb-3">

                <label className="form-label">
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

            <br /><br />
            <div className="mb-3">

                <label className="form-label">
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

            <br /><br />

            <button className="btn btn-primary" type="submit">
                Save Changes
            </button>

        </form>
        </div>
        </div>

    );

}