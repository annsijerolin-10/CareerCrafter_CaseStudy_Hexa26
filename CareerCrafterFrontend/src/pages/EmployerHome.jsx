import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "../components/AlertMessage";
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

            setError(error.message);

        }

    }

    const profileCompleted =
        profile &&
        (profile.companyName ?? "").trim() !== "" &&
        (profile.companyDescription ?? "").trim() !== "";

    return (
       

        <div className="container-fluid">
             <AlertMessage
                message={error}
            />

            {/* <h2>Employer Dashboard</h2>

            <h3>Welcome, {user.fullName}</h3> */}

            {
                !profileCompleted && (

                    <div className="alert alert-warning">
                      <h3>Complete Company Profile</h3>

                        <p>
                            Complete your company profile to                  
                            Post new jobs
                            Receive applications
                            Increase company credibility
                        </p>

                        <button className="btn btn-warning"
                            onClick={() =>
                                navigate("/employer/dashboard/profile")
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

                    <h3 className="mb-4">Dashboard Summary</h3>

                    <div className="row g-4">

                        <div className="col-md-3">
                            <div className="card dashboard-card">
                                <div className="card-body text-center">
                                    <h6>Total Jobs</h6>
                                    <h2>{dashboard.totalJobsPosted}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card dashboard-card">
                                <div className="card-body text-center">
                                    <h6>Active Jobs</h6>
                                    <h2>{dashboard.activeJobsCount}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card dashboard-card">
                                <div className="card-body text-center">
                                    <h6>Archived Jobs</h6>
                                    <h2>{dashboard.archivedJobsCount}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card dashboard-card">
                                <div className="card-body text-center">
                                    <h6>Total Applications</h6>
                                    <h2>{dashboard.totalApplications}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card dashboard-card">
                                <div className="card-body text-center">
                                    <h6>Applied</h6>
                                    <h2>{dashboard.appliedCount}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card dashboard-card">
                                <div className="card-body text-center">
                                    <h6>Reviewed</h6>
                                    <h2>{dashboard.reviewedCount}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card dashboard-card">
                                <div className="card-body text-center">
                                    <h6>Shortlisted</h6>
                                    <h2>{dashboard.shortlistedCount}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card dashboard-card">
                                <div className="card-body text-center">
                                    <h6>Rejected</h6>
                                    <h2>{dashboard.rejectedCount}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card dashboard-card">
                                <div className="card-body text-center">
                                    <h6>Withdrawn</h6>
                                    <h2>{dashboard.withdrawnCount}</h2>
                                </div>
                            </div>
                        </div>

                    </div>

                </>

            }

        </div>
        

    );

}