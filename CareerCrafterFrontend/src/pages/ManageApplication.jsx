import { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getEmployerJobs } from "../api/JobAxiosApi";
import { getApplicationsByJob,updateApplicationStatus } from "../api/ApplicationAxiosApi";
import { ApplicationTable } from "../components/ApplicationTable";
import { CandidateProfileModal } from "../components/CandidateProfileModal";
import { getCandidateProfile } from "../api/EmployerAxiosApi";
export function ManageApplications() {

    const { user } = useAuth();

    const [applications, setApplications] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [selectedCandidate, setSelectedCandidate] = useState(null);
const [showCandidateModal, setShowCandidateModal] = useState(false);

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
            setMessage("Application status updated successfully.");
            setTimeout(() => {
                setMessage("");
            }, 3000);

        }
        catch (error) {

            setError(error.message);

        }

    }

    async function handleViewCandidate(jobSeekerId) {

        try {

            const candidate =
                await getCandidateProfile(
                    jobSeekerId,
                    user.token
                );

            setSelectedCandidate(candidate);

            setShowCandidateModal(true);

        }
        catch (error) {

            setError(error.message);

        }

    }

    return (

        <div>

            <h2>Manage Applications</h2>
            {
                message &&
                <p style={{ color: "green" }}>
                    {message}
                </p>
            }

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}
             <ApplicationTable
                applications={applications}
                onStatusUpdate={handleStatusUpdate}
                onViewCandidate={handleViewCandidate}
            />
            {
                showCandidateModal &&

                <CandidateProfileModal
                    candidate={selectedCandidate}
                    onClose={() => {

                        setShowCandidateModal(false);
                        setSelectedCandidate(null);

                    }}
                />

            }


        </div>

    );

}