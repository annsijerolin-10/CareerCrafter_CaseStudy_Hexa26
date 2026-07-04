import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllJobs,searchJobs,getRecommendedJobs } from "../api/JobSeekerJobAxiosApi";
import { JobCardList } from "../components/JobCardList";
import { getResumesByJobSeeker } from "../api/ResumeAxiosApi";
import { applyJob,getApplicationsByJobSeeker } from "../api/ApplicationAxiosApi";
import { ApplyJobModal } from "../components/ApplyJobModal";
import { useNavigate } from "react-router-dom";


export function BrowseJobs() {

    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");
    const [selectedJob, setSelectedJob] = useState(null);
    const [resumes, setResumes] = useState([]);
    const [selectedResumeId, setSelectedResumeId] = useState("");
    const [applications, setApplications] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [recommendedJobs, setRecommendedJobs] = useState([]);

const [searchLocation, setSearchLocation] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        loadJobs();

    }, []);

    useEffect(() => {

        handleSearch();

    }, [searchTitle, searchLocation]);

    async function loadJobs() {

    try {

        const response = await getAllJobs(user.token);

        console.log("Response:", response);
        console.log("Is Array:", Array.isArray(response));
        console.log("Length:", response.length);

        setJobs(response);
        const applicationResponse =
        await getApplicationsByJobSeeker(
            user.jobSeekerId,
            user.token
        );

setApplications(applicationResponse);
const recommended = await getRecommendedJobs(
    user.jobSeekerId,
    user.token
);

setRecommendedJobs(recommended);

    }
    catch (error) {

        console.log(error);

        setError(error.message);

    }

}

   async function handleApply(job) {

        try {
//             console.log(user);
// console.log(user.token);
// console.log(user.jobSeekerId);
            const resumes = await getResumesByJobSeeker(
                user.jobSeekerId,
                user.token
            );

            setSelectedJob(job);
            setResumes(resumes);
            setSelectedResumeId("");

        }
        catch (error) {

            console.log(error);

            alert(error.message);

        }

    }
    function handleCancel() {

    setSelectedJob(null);
    setResumes([]);
    setSelectedResumeId("");

}
async function handleConfirmApply() {

    try {

        const applicationData = {

            jobId: selectedJob.jobId,
            jobSeekerId: user.jobSeekerId,
            resumeId: selectedResumeId

        };

        await applyJob(
            applicationData,
            user.token
        );
        const updatedApplications =
    await getApplicationsByJobSeeker(
        user.jobSeekerId,
        user.token
    );

    setApplications(updatedApplications);

        alert("Application submitted successfully.");

        handleCancel();

    }
    catch (error) {

        alert(error.message);

    }

}
function handleViewApplication(jobId) {

    navigate("/jobseeker/dashboard/applications");

}
async function handleSearch() {

    try {
         setError("");

        if (
            searchTitle.trim() === "" &&
            searchLocation.trim() === ""
        ) {

            loadJobs();
            return;

        }

        const jobs = await searchJobs(
            searchTitle,
            searchLocation,
            user.token
        );

        setJobs(jobs);

    }
    catch (error) {

        setError(error.message);

    }

}
const filteredJobs = jobs.filter(
    job =>
        !recommendedJobs.some(
            recommended => recommended.jobId === job.jobId
        )
);

// function getResumeFileName(path) {

//     if (!path) return "";

//     const fileName = path.split("/").pop();

//     return fileName.substring(fileName.indexOf("_") + 1);

// }

    return (

        <div>

            <h2>Browse Jobs</h2>
            {

                error &&
                <p style={{ color: "red" }}>
                    {error}
                </p>

            }
            {
            recommendedJobs.length > 0 && (
                <>
                    <h3>Recommended Jobs</h3>

                    <JobCardList
                        jobs={recommendedJobs}
                        applications={applications}
                        onApply={handleApply}
                        onViewApplication={handleViewApplication}
                    />

                    <hr />
                </>
            )
        }
            <div style={{ marginBottom: "20px" }}>

                <input
                    type="text"
                    placeholder="Search by Job Title"
                    value={searchTitle}
                    onChange={(e) =>
                        setSearchTitle(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={searchLocation}
                    onChange={(e) =>
                        setSearchLocation(e.target.value)
                    }
                    style={{ marginLeft: "10px" }}
                />

                

            </div>

            <JobCardList
                jobs={filteredJobs}
                applications={applications}
                onApply={handleApply}
                 onViewApplication={handleViewApplication}
            />
            <ApplyJobModal
                job={selectedJob}
                resumes={resumes}
                selectedResumeId={selectedResumeId}
                setSelectedResumeId={setSelectedResumeId}
                 onApply={handleConfirmApply}
                onCancel={handleCancel}
                
            />

        </div>

    );

}