import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    getEmployerDashboard,
    getEmployerProfile
} from "../api/EmployerAxiosApi";
import { useAuth } from "../context/AuthContext";

export function EmployerHome() {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [dashboard, setDashboard] = useState(null);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        if (user.employerId) {
            loadDashboard();
            loadProfile();
        }

    }, [user.employerId]);

    async function loadDashboard() {

        try {

            const response =
                await getEmployerDashboard(
                    user.employerId,
                    user.token
                );

            setDashboard(response.data);

        }
        catch {

            setError("Failed to load dashboard");

        }

    }

    async function loadProfile() {

        try {

            const response =
                await getEmployerProfile(
                    user.employerId,
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
        (profile.companyName ?? "").trim() !== "" &&
        (profile.companyDescription ?? "").trim() !== "";

    return (

        <div>

            <h2>Employer Dashboard</h2>

            <h3>Welcome, {user.fullName}</h3>

            {
                !profileCompleted && (

                    <div
                        style={{
                            border: "1px solid orange",
                            padding: "15px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                            
                        }}
                    >

                        <h3>Complete Company Profile</h3>

                        <p>
                            Complete your company profile to                  
                            Post new jobs
                            Receive applications
                            Increase company credibility
                        </p>

                        <button
                            onClick={() =>
                                navigate("/employer/dashboard/profile")
                            }
                        >
                            Complete Profile
                        </button>

                    </div>

                )
            }
            {error &&

                <p style={{ color: "red" }}>
                    {error}
                </p>

            }

            {
                dashboard &&

                <>

                    <h3>Dashboard Summary</h3>

                    <p>
                        <strong>Total Job Posts:</strong>{" "}
                        {dashboard.totalJobsPosted}
                    </p>

                    <p>
                        <strong>Total Applications:</strong>{" "}
                        {dashboard.totalApplications}
                    </p>

                    <p>
                        <strong>Applied:</strong>{" "}
                        {dashboard.appliedCount}
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

                </>

            }

        </div>

    );

}