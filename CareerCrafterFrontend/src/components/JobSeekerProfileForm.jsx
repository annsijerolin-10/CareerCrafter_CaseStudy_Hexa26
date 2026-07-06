import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AlertMessage } from "./AlertMessage";
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
        <div className="card dashboard-card">
        <div className="card-body">

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
                FullName
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
                Phone Number
                </label>

            <input
                className="form-control"
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Phone"
            />
            </div>

            <br /><br />
            <div className="mb-3">

                <label className="form-label">
                Address
                </label>

            <input
                className="form-control"
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Address"
            />
            </div>

            <br /><br />
            <div className="mb-3">

                <label className="form-label">
                Skills
                </label>

            <input
                className="form-control"
                type="text"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                placeholder="Skills"
            />
            </div>

            <br /><br />
            <div className="mb-3">

                <label className="form-label">
                Work Experience
                </label>

            <input
                className="form-control"
                type="number"
                name="experienceYears"
                value={profile.experienceYears}
                onChange={handleChange}
                placeholder="Experience"
            />
            </div>

            <br /><br />

            <button className="form-control" type="submit">

                Save Changes

            </button>

        </form>
        </div>
        </div>

    );

}