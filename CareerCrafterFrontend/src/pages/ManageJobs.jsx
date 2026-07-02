import { useAuth } from "../context/AuthContext";
import { useState,useEffect } from "react";

import { getEmployerJobs,deleteJob } from "../api/JobAxiosApi";
import { JobForm } from "../components/JobForm";
import { JobTable } from "../components/JobTable";


export function ManageJobs() {

    const { user } = useAuth();

    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
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

   function handleEditJob(job) {
    setSelectedJob(job);
}

    return (
        <div>

            <h2>Manage Jobs</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <JobForm
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
                loadJobs={loadJobs}
            />

            <JobTable
                jobs={jobs}
                onEditJob={handleEditJob}
                onDeleteJob={handleDeleteJob}
            />

        </div>
    );
}