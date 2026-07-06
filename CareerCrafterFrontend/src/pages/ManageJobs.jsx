import { useAuth } from "../context/AuthContext";
import { useState,useEffect } from "react";

import { getEmployerJobs,restoreJob,getArchivedJobs,deleteJob } from "../api/JobAxiosApi";
import { JobForm } from "../components/JobForm";
import { JobTable } from "../components/JobTable";
import { useNavigate } from "react-router-dom";
import { getEmployerProfile } from "../api/EmployerAxiosApi";

export function ManageJobs() {

    const { user } = useAuth();


    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showArchived, setShowArchived] = useState(false);
    const [error, setError] = useState("");
    const [employerProfile, setEmployerProfile] = useState(null);
    const navigate = useNavigate();

   useEffect(() => {
    if (user.employerId) {
        loadJobs();
        loadEmployerProfile();
    }

}, [user.employerId]);

   async function loadJobs() {
        try {
            const response = await getEmployerJobs(
                user.employerId,
                user.token
            );

            setJobs(response);
            setShowArchived(false);  
        }
        catch (error) {
            setError(error.message);
        }
    }
    async function loadEmployerProfile() {

        try {

            const profile =
                await getEmployerProfile(
                    user.employerId,
                    user.token
                );
            setEmployerProfile(profile);
        }
        catch (error) {

            setError(error.message);

        }
    }

    async function handleDeleteJob(jobId) {

        try {

            await deleteJob(jobId, user.token);

            await loadJobs();

        }
        catch (error) {

            setError(error.message);

        }

    }

    async function loadArchivedJobs() {

        try {

            const jobs = await getArchivedJobs(
                user.employerId,
                user.token
            );

            setJobs(jobs);

            setShowArchived(true);

        }
        catch (error) {

            setError(error.message);

        }

    }
    async function handleRestoreJob(jobId) {
        try {

            await restoreJob(jobId, user.token);
            await loadJobs();

        }
        catch (error) {

            setError(error.message);

        }

    }

    function handleEditJob(job) {
        setSelectedJob(job);
    }

    const profileCompleted =
        employerProfile &&
        (employerProfile.companyName ?? "").trim() !== "" &&
        (employerProfile.companyDescription ?? "").trim() !== "";

    return (
        <div>

            <h2>Manage Jobs</h2>

            <AlertMessage
                message={error}
                />

            {
            showArchived?
                <button btn btn-secondary mb-3 onClick={loadJobs}>Back to Active Jobs</button>
            :
                <button btn btn-primary mb-3 onClick={loadArchivedJobs}>View Archived Jobs</button>
            }
            

           

            {
            !showArchived &&

            <>
                {
                    !profileCompleted &&
                    <div className="alert alert-warning">

                        <h3>
                            Complete Company Profile
                        </h3>

                        <p>
                            Complete your company profile before
                            posting new jobs.
                        </p>

                        <button className="btn btn-warning"
                            onClick={() =>
                                navigate(
                                    "/employer/dashboard/profile"
                                )
                            }
                        >
                            Complete Profile
                        </button>

                    </div>
                }

                <JobForm
                    selectedJob={selectedJob}
                    setSelectedJob={setSelectedJob}
                    loadJobs={loadJobs}
                    profileCompleted={profileCompleted}
                />
            </>
           }

            <JobTable
                jobs={jobs}
                onEditJob={handleEditJob}
                onDeleteJob={handleDeleteJob}
                onRestoreJob={handleRestoreJob}
                showArchived={showArchived}
            />

        </div>
    );
}