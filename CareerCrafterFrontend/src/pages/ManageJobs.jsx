import { useAuth } from "../context/AuthContext";
import { useState,useEffect } from "react";

import { getEmployerJobs,restoreJob,getArchivedJobs,deleteJob } from "../api/JobAxiosApi";
import { JobForm } from "../components/JobForm";
import { JobTable } from "../components/JobTable";


export function ManageJobs() {

    const { user } = useAuth();


    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showArchived, setShowArchived] = useState(false);
    const [error, setError] = useState("");

   useEffect(() => {
    if(user.employerId){
        loadJobs();
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

    return (
        <div>

            <h2>Manage Jobs</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {
            showArchived?
                <button onClick={loadJobs}>Back to Active Jobs</button>
            :
                <button onClick={loadArchivedJobs}>View Archived Jobs</button>
            }
            

           

            {
                !showArchived &&
            <JobForm
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
                loadJobs={loadJobs}
            />
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