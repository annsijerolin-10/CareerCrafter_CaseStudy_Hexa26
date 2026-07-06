import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getJobSeekerProfile,getJobSeekerDashboard } from "../api/JobSeekerAxiosApi";

export function JobSeekerHome() {

    const { user } = useAuth();
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState("");
    const [profile, setProfile] = useState(null);

    useEffect(() => {

    if (user.jobSeekerId) {
        loadProfile();
        loadDashboard();
    }

}, [user.jobSeekerId]);
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

    async function loadDashboard() {

    try {

        const response =
            await getJobSeekerDashboard(
                user.jobSeekerId,
                user.token
            );

        setDashboard(response);

    }
    catch (error) {

        setError("Failed to load dashboard.");

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
    error &&
    <p style={{ color: "red" }}>
        {error}
    </p>
}

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

            {
    dashboard &&
    <>
        <h3>Dashboard Summary</h3>

        <p>
            <strong>Total Applications:</strong>{" "}
            {dashboard.totalApplications}
        </p>

        <p>
            <strong>Applied:</strong>{" "}
            {dashboard.appliedCount}
        </p>
        <p>
    <strong>Reviewed:</strong>{" "}
    {dashboard.reviewedCount}
</p>

        <p>
            <strong>Shortlisted:</strong>{" "}
            {dashboard.shortlistedCount}
        </p>

        <p>
            <strong>Rejected:</strong>{" "}
            {dashboard.rejectedCount}
        </p>

        <p>
            <strong>Withdrawn:</strong>{" "}
            {dashboard.withdrawnCount}
        </p>

        <p>
            <strong>Total Resumes:</strong>{" "}
            {dashboard.totalResumes}
        </p>

        <p>
            <strong>Notifications:</strong>{" "}
            {dashboard.totalNotifications}
        </p>
    </>
}

        </div>
    );
}