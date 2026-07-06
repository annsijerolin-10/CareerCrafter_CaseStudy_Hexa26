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

        <form onSubmit={handleSubmit}>

            {errorMessage &&
                <p style={{ color: "red" }}>
                    {errorMessage}
                </p>
            }

            {successMessage &&
                <p style={{ color: "green" }}>
                    {successMessage}
                </p>
            }

            <input
                type="text"
                value={profile.fullName}
                disabled
                placeholder="Full Name"
            />

            <br /><br />

            <input
                type="email"
                value={profile.email}
                disabled
                placeholder="Email"
            />

            <br /><br />

            <input
                type="text"
                name="companyName"
                value={profile.companyName}
                onChange={handleChange}
                placeholder="Company Name"
            />

            <br /><br />

            <textarea
                name="companyDescription"
                value={profile.companyDescription}
                onChange={handleChange}
                placeholder="Company Description"
                rows="5"
            />

            <br /><br />

            <button type="submit">

                Save Changes

            </button>

        </form>

    );

}