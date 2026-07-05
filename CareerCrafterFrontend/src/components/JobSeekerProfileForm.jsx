import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
    getJobSeekerProfile,
    updateJobSeekerProfile
} from "../api/JobSeekerAxiosApi";

export function JobSeekerProfileForm() {

    const { user } = useAuth();

    const [profile, setProfile] = useState({

        fullName: "",
        email: "",
        phone: "",
        address: "",
        skills: "",
        experienceYears: 0

    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            const response =
                await getJobSeekerProfile(
                    user.jobSeekerId,
                    user.token
                );

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

            await updateJobSeekerProfile(

                user.jobSeekerId,

                {

                    phone: profile.phone,
                    address: profile.address,
                    skills: profile.skills,
                    experienceYears:
                        Number(profile.experienceYears)

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
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Phone"
            />

            <br /><br />

            <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Address"
            />

            <br /><br />

            <input
                type="text"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                placeholder="Skills"
            />

            <br /><br />

            <input
                type="number"
                name="experienceYears"
                value={profile.experienceYears}
                onChange={handleChange}
                placeholder="Experience"
            />

            <br /><br />

            <button type="submit">

                Save Changes

            </button>

        </form>

    );

}