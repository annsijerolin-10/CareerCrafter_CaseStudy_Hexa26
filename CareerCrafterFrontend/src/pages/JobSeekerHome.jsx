import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getJobSeekerProfile,getJobSeekerDashboard } from "../api/JobSeekerAxiosApi";
import { AlertMessage } from "../components/AlertMessage";
import { useNotification } from "../context/NotificationContext";
export function JobSeekerHome() {

    const { user } = useAuth();
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState("");
    const [profile, setProfile] = useState(null);
    const { setUnreadCount } = useNotification();

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
            setError("Failed to load dashboard");
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
        setUnreadCount(response.unreadNotifications);

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

            {/* <h2>Job Seeker Dashboard</h2> */}
            <AlertMessage message={error}/>

            {
                !profileCompleted
                &&(
                    <div className="alert alert-warning shadow-sm">
                    

                    <h3>
                        Complete Your Profile
                    </h3>

                    <p>
                        Complete your profile to   
                        Get Recommended Jobs,
                        Apply for Jobs
                    </p>


                    <button className="btn btn-warning"
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
                <h3 className="text-center mb-4">
                    Dashboard Summary
                </h3>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">

                    <div className="col">
                        <div className="card dashboard-card text-center">
                            <div className="card-body">
                                <h6>Total Jobs Applied</h6>
                                <h2 className="dashboard-stat text-dark">
                                    {dashboard.totalApplications}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card dashboard-card text-center">
                            <div className="card-body">
                                <h6>Application-Applied Status </h6>
                                <h2 className="dashboard-stat text-dark">
                                    {dashboard.appliedCount}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card dashboard-card text-center">
                            <div className="card-body">
                                <h6>Reviewed Applications</h6>
                                <h2 className="dashboard-stat text-dark">
                                    {dashboard.reviewedCount}
                                </h2>
                            </div>
                        </div>
                    </div>

                   <div className="col">
                        <div className="card dashboard-card text-center">
                            <div className="card-body">
                                <h6>Shortlisted Applications</h6>
                                <h2 className="dashboard-stat text-dark">
                                    {dashboard.shortlistedCount}
                                </h2>
                            </div>
                        </div>
                    </div>

                   <div className="col">
                        <div className="card dashboard-card text-center">
                            <div className="card-body">
                                <h6>Rejected Applications</h6>
                                <h2 className="dashboard-stat text-dark">
                                    {dashboard.rejectedCount}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card dashboard-card text-center">
                            <div className="card-body">
                                <h6>Withdrawn Applications</h6>
                                <h2 className="dashboard-stat text-dark">
                                    {dashboard.withdrawnCount}
                                </h2>
                            </div>
                        </div>
                    </div>

                   {/* <div className="col">
                        <div className="card dashboard-card text-center">
                            <div className="card-body">
                                <h6>Total Resumes</h6>
                                <h2 className="dashboard-stat text-dark">
                                    {dashboard.totalResumes}
                                </h2>
                            </div>
                        </div>
                    </div> */}

                   

                </div>
            </>
        }

        </div>
    );
}