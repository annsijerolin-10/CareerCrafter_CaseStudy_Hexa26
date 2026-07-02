import { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getEmployerJobs } from "../api/JobAxiosApi";
import { getApplicationsByJob,updateApplicationStatus } from "../api/ApplicationAxiosApi";
import { ApplicationTable } from "../components/ApplicationTable";
export function ManageApplications() {

    const { user } = useAuth();

    const [applications, setApplications] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
     if (user.employerId) {
            loadApplications();
        }

    }, [user.employerId]);

    async function loadApplications() {

        try {
            const jobs = await getEmployerJobs(
                user.employerId,
                user.token
            );
            let allApplications = [];
            for (const job of jobs) {
                const jobApplications =
                    await getApplicationsByJob(
                        job.jobId,
                        user.token
                    );

                allApplications = [
                    ...allApplications,
                    ...jobApplications
                ];
            }

            setApplications(allApplications);

        }
        catch (error) {

            setError(error.message);

        }
    }

    async function handleStatusUpdate(applicationId, status) {
        try {
            await updateApplicationStatus(
                applicationId,
                status,
                user.token
            );

            await loadApplications(); 
        }
        catch (error) {
            setError(error.message);
        }
    }

    return (

        <div>

            <h2>Manage Applications</h2>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}
             <ApplicationTable
                applications={applications}
                onStatusUpdate={handleStatusUpdate}
            />


        </div>

    );

}