import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllJobs,searchJobs,getRecommendedJobs } from "../api/JobSeekerJobAxiosApi";
import { JobCardList } from "../components/JobCardList";
import { getResumesByJobSeeker } from "../api/ResumeAxiosApi";
import { applyJob,getApplicationsByJobSeeker } from "../api/ApplicationAxiosApi";
import { ApplyJobModal } from "../components/ApplyJobModal";
import { useNavigate } from "react-router-dom";
import { getJobSeekerProfile } from "../api/JobSeekerAxiosApi";

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
    const [jobSeekerProfile, setJobSeekerProfile] = useState(null);
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

        setJobs(response);

        const applicationResponse =
            await getApplicationsByJobSeeker(
                user.jobSeekerId,
                user.token
            );

        setApplications(applicationResponse);

        const profile =
            await getJobSeekerProfile(
                user.jobSeekerId,
                user.token
            );

        setJobSeekerProfile(profile);

        const recommended =
            await getRecommendedJobs(
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


// function getResumeFileName(path) {

//     if (!path) return "";

//     const fileName = path.split("/").pop();

//     return fileName.substring(fileName.indexOf("_") + 1);

// }
const profileCompleted =
    jobSeekerProfile &&
    (jobSeekerProfile.phone ?? "").trim() !== "" &&
    (jobSeekerProfile.address ?? "").trim() !== "" &&
    (jobSeekerProfile.skills ?? "").trim() !== "" &&
    jobSeekerProfile.experienceYears > 0;

const filteredJobs =
    profileCompleted
        ? jobs.filter(
              job =>
                  !recommendedJobs.some(
                      recommended =>
                          recommended.jobId === job.jobId
                  )
          )
        : jobs;

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
    !profileCompleted
    ?
    (
        <div
            style={{
                border: "1px solid orange",
                padding: "15px",
                marginBottom: "20px",
                borderRadius: "8px"
            }}
        >

            <h3>
                Recommended Jobs
            </h3>

            <p>

                Complete your profile by adding your
                <strong> Skills </strong>

                to receive personalized job recommendations.

            </p>

            <button
                onClick={() =>
                    navigate("/jobseeker/dashboard/profile")
                }
            >

                Complete Profile

            </button>

        </div>
    )
    :
    recommendedJobs.length > 0 &&
    (
        <>
            <h3>
                Recommended Jobs
            </h3>

            <JobCardList
                jobs={recommendedJobs}
                applications={applications}
                onApply={profileCompleted ? handleApply : null}
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