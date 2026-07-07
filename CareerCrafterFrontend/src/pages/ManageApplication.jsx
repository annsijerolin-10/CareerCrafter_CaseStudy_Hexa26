import { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getEmployerJobs } from "../api/JobAxiosApi";
import { getApplicationsByJob,updateApplicationStatus } from "../api/ApplicationAxiosApi";
import { ApplicationTable } from "../components/ApplicationTable";
import { CandidateProfileModal } from "../components/CandidateProfileModal";
import { getCandidateProfile } from "../api/EmployerAxiosApi";
import { AlertMessage } from "../components/AlertMessage";
import { useLocation } from "react-router-dom";
import {markAllEmployerNotificationsRead} from "../api/EmployerNotificationAxiosApi";
export function ManageApplications() {

    const { user } = useAuth();

    const [applications, setApplications] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showCandidateModal, setShowCandidateModal] = useState(false);
    const location = useLocation();
    useEffect(() => {

        async function initialize() {

            if (!user.employerId)
                return;

            await markAllEmployerNotificationsRead(
                user.employerId,
                user.token
            );

            loadApplications();
        }

        initialize();

    }, [user.employerId]);

    async function loadApplications() {

        try {
            setError("");
            const jobs = await getEmployerJobs(
                user.employerId,
                user.token
            );
            const allApplications = [];
            for (const job of jobs) {
                const jobApplications =
                    await getApplicationsByJob(
                        job.jobId,
                        user.token
                    );

                allApplications.push(...jobApplications);
            }

            setApplications(allApplications);
            const applicationId =
    location.state?.applicationId;

if (applicationId) {

    setTimeout(() => {

        const row =
            document.getElementById(
                `application-${applicationId}`
            );

        if (row) {

            row.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            row.classList.add("table-warning");

            setTimeout(() => {

                row.classList.remove("table-warning");

            }, 5000);

        }

    }, 300);

}
        }
        catch (error) {

            setError(error.message);

        }
    }

    async function handleStatusUpdate(applicationId, status) {

        try {
            setError("");
            await updateApplicationStatus(
                applicationId,
                status,
                user.token
            );
            await loadApplications();
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
            setError("");
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
            <AlertMessage
                type="success"
                message={message}
            />

            <AlertMessage
                message={error}
            />
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