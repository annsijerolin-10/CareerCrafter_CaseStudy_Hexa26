import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getJobSeekerProfile } from "../api/JobSeekerAxiosApi";

export function JobSeekerHome() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);

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
            console.log(error);
        }
    }

    const profileCompleted =
        profile &&
        (profile.phone ?? "").trim() !== "" &&
        (profile.address ?? "").trim() !== "" &&
        (profile.skills ?? "").trim() !== "" &&
        profile.experienceYears > 0;

    return (

        <div>

            <h2>Job Seeker Dashboard</h2>

            {
                !profileCompleted
                &&(
                <div
                    style={{
                        border: "1px solid orange",
                        padding: "15px",
                        borderRadius: "8px",
                        marginBottom: "20px"
                    }}
                >

                    <h3>
                        Complete Your Profile
                    </h3>

                    <p>
                        Complete your profile to
                    
                    
                        Get Recommended Jobs,
                        Apply for Jobs
                    </p>


                    <button
                        onClick={() =>
                            navigate("/jobseeker/dashboard/profile")
                        }
                    >
                        Complete Profile
                    </button>

                </div>

                    )
            }

            <p>
                Welcome to CareerCrafter.
            </p>

            <p>
                Use the navigation above to browse jobs,
                manage resumes and applications.
            </p>

        </div>
    );
}