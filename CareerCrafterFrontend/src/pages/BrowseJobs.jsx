import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllJobs,searchJobs,getRecommendedJobs } from "../api/JobSeekerJobAxiosApi";
import { JobCardList } from "../components/JobCardList";
import { getResumesByJobSeeker,uploadResume } from "../api/ResumeAxiosApi";
import { applyJob,getApplicationsByJobSeeker } from "../api/ApplicationAxiosApi";
import { ApplyJobModal } from "../components/ApplyJobModal";
import { useNavigate } from "react-router-dom";
import { getJobSeekerProfile } from "../api/JobSeekerAxiosApi";
import { AlertMessage } from "../components/AlertMessage";
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
    const [uploading, setUploading] = useState(false);
    const [resumeMessage, setResumeMessage] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(6);    
    const [sortBy, setSortBy] = useState("postedDate");
    const [descending, setDescending] = useState(true);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        loadJobs();
    }, [
        pageNumber,
        sortBy,
        descending
    ]);

    useEffect(() => {

        handleSearch();

    }, [searchTitle, searchLocation]);

    async function loadJobs() {

        try {

            const response = await getAllJobs(
                user.jobSeekerId,
                pageNumber,
                pageSize,
                sortBy,
                descending,
                user.token
            );
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
            // console.log("Recommended Jobs:", recommended);
            // console.log("Recommended Count:", recommended.length);

            setRecommendedJobs(recommended);

        }
        catch (error) {

            console.log(error);

            setError(error.message);

        }

    }
    async function handleUploadResume(e) {

    try {

        const file = e.target.files[0];

        if (!file)
            return;

        setUploading(true);
        setResumeMessage("");

        const formData = new FormData();

        formData.append("ResumeFile",  file);

        formData.append("JobSeekerId",user.jobSeekerId);

        await uploadResume(
            formData,
            user.token
        );

        const updatedResumes =
            await getResumesByJobSeeker(
                user.jobSeekerId,
                user.token
            );

        setResumes(updatedResumes);

       const uploadedResume = updatedResumes.find(r =>
            r.resumeFile.endsWith(file.name)
        );

        if (uploadedResume) {
            setSelectedResumeId(uploadedResume.resumeId);
        }

        setResumeMessage(
            "Resume uploaded successfully. Click Confirm Apply."
        );

    }
    catch (error) {

        setResumeMessage(error.message);

    }
    finally {

        setUploading(false);

    }

}

   async function handleApply(job) {

        try {
            setResumeMessage("");
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
             setError(error.message);

        }

    }
    function handleCancel() {
        setResumeMessage("");
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
        const updatedApplications =await getApplicationsByJobSeeker(   
            user.jobSeekerId,
            user.token
        );

        setApplications(updatedApplications);
        setMessage("Job applied successfully.");
        setTimeout(() => {
            setMessage("");
        }, 3000);

        handleCancel();

        await loadJobs();
    }
    catch (error) {

         setError(error.message);

    }

}

async function handleSearch() {

    try {
         setError("");

        if (
            searchTitle.trim() === "" &&
            searchLocation.trim() === ""
        ) {
            await loadJobs();
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
function handleViewApplication() {
    navigate("/jobseeker/dashboard/applications");
}

// function getResumeFileName(path) {

//     if (!path) return "";

//     const fileName = path.split("/").pop();

//     return fileName.substring(fileName.indexOf("_") + 1);

// }
// const filteredJobs = jobs.filter(
//     job =>
//         !recommendedJobs.some(
//             recommended =>
//                 recommended.jobId === job.jobId
//         )
// );
const profileCompleted =
    jobSeekerProfile &&
    (jobSeekerProfile.phone ?? "").trim() !== "" &&
    (jobSeekerProfile.address ?? "").trim() !== "" &&
    (jobSeekerProfile.skills ?? "").trim() !== "" &&
    jobSeekerProfile.experienceYears > 0;



    return (

        <div>

            <h2 className="text-center mb-4">
                Browse Jobs
            </h2>
            <AlertMessage
                type="success"
                message={message}
            />
            <AlertMessage
                message={error}
            />
            {
                jobSeekerProfile &&
    (
                !profileCompleted
                ?
                (
                     <div className="alert alert-warning shadow-sm">              
                        <h3>
                            Recommended Jobs
                        </h3>

                        <p>
                            Complete your profile by adding your
                            <strong> phone number, address, skills and experience </strong>
                            to unlock personalized job recommendations and job applications.
                        </p>

                        <button
                            className="btn btn-warning"
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
                        <h3 className="text-center mb-4">
                                Jobs Recommended for you
                        </h3>

                        <JobCardList
                            jobs={recommendedJobs}
                            applications={applications}
                            onApply={handleApply}
                            onViewApplication={handleViewApplication}
                            profileCompleted={profileCompleted}
                        />

                    

                    </>


                ))
            } 
            <h3 className="text-center mb-4">
                Available Jobs
            </h3>

            <div className="card mb-4 shadow-sm">

                <div className="card-body">

                    <h5 className="mb-3 fw-semibold">
                        Find Your Dream Job
                    </h5>

                    <div className="row g-3">

                        <div className="col-md-3">

                            <select
                                className="form-select"
                                onChange={(e) => {

                                    switch (e.target.value) {

                                        case "Newest":
                                            setSortBy("postedDate");
                                            setDescending(true);
                                            break;

                                        case "Oldest":
                                            setSortBy("postedDate");
                                            setDescending(false);
                                            break;

                                        case "SalaryHigh":
                                            setSortBy("salary");
                                            setDescending(true);
                                            break;

                                        case "SalaryLow":
                                            setSortBy("salary");
                                            setDescending(false);
                                            break;
                                    }

                                    setPageNumber(1);

                                }}
                            >

                                <option value="">
                                    Sort Jobs
                                </option>

                                <option value="Newest">
                                    Newest First
                                </option>

                                <option value="Oldest">
                                    Oldest First
                                </option>

                                <option value="SalaryHigh">
                                    Salary High → Low
                                </option>

                                <option value="SalaryLow">
                                    Salary Low → High
                                </option>

                            </select>

                        </div>


                        <div className="col-md-4">

                            <div className="input-group">

                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>

                                <input
                                    className="form-control"
                                    placeholder="Search by Job Title"
                                    value={searchTitle}
                                    onChange={(e) =>
                                        setSearchTitle(e.target.value)
                                    }
                                />

                            </div>

                        </div>
                        <div className="col-md-5">

                            <div className="input-group">

                                <span className="input-group-text">
                                    <i className="bi bi-geo-alt"></i>
                                </span>

                                <input
                                    className="form-control"
                                    placeholder="Search by Location"
                                    value={searchLocation}
                                    onChange={(e) =>
                                        setSearchLocation(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </div>                                    
            <JobCardList
                jobs={jobs}
                applications={applications}
                onApply={handleApply}
                 onViewApplication={handleViewApplication}
                 profileCompleted={profileCompleted}
            />

            <div className="d-flex justify-content-center gap-3 mt-4">

                <button
                    className="btn btn-outline-primary"
                    disabled={pageNumber===1}
                    onClick={()=>
                        setPageNumber(pageNumber-1)
                    }
                >
                    Previous
                </button>

                <span className="align-self-center">

                    Page {pageNumber}

                </span>

                <button
                    className="btn btn-outline-primary"
                    disabled={jobs.length < pageSize}
                    onClick={()=>
                        setPageNumber(pageNumber+1)
                    }
                >
                    Next
                </button>

            </div>
            <ApplyJobModal
                job={selectedJob}
                resumes={resumes}
                selectedResumeId={selectedResumeId}
                setSelectedResumeId={setSelectedResumeId}
                onApply={handleConfirmApply}
                onCancel={handleCancel}
                onUploadResume={handleUploadResume}
                uploading={uploading}
                resumeMessage={resumeMessage}
                
            />

        </div>

    );

}