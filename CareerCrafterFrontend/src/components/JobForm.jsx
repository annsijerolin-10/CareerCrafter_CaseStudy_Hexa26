import { useAuth } from "../context/AuthContext";
import { addJob,updateJob } from "../api/JobAxiosApi";
import { useState, useEffect } from "react";
import { AlertMessage } from "./AlertMessage";

export function JobForm({
    selectedJob,
    setSelectedJob,
    loadJobs,
    profileCompleted
}) {
    const { user } = useAuth();

    const [jobData, setJobData] = useState({
        jobTitle: "",
        jobDescription: "",
        location: "",
        salary: "",
        requiredSkills: "",
        applicationDeadline: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {

        if (selectedJob) {
            setJobData({
                jobTitle: selectedJob.jobTitle,
                jobDescription: selectedJob.jobDescription,
                location: selectedJob.location,
                salary: selectedJob.salary,
                requiredSkills: selectedJob.requiredSkills,
                applicationDeadline: selectedJob.applicationDeadline?.split("T")[0] ?? ""
       
            });
        }

    }, [selectedJob]);

    function handleChange(e) {
        setJobData({
            ...jobData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {

    e.preventDefault();

    setErrorMessage("");

    if (jobData.jobTitle.trim() === "") {
        setErrorMessage("Job Title is required");
        return;
    }

    if (jobData.jobDescription.trim() === "") {
        setErrorMessage("Job Description is required");
        return;
    }

    if (jobData.location.trim() === "") {
        setErrorMessage("Location is required");
        return;
    }

    if (jobData.salary === "" || Number(jobData.salary) <= 0) {
        setErrorMessage("Enter a valid salary");
        return;
    }

    if (jobData.requiredSkills.trim() === "") {
        setErrorMessage("Required Skills are required");
        return;
    }
    if (jobData.applicationDeadline === "") {
    setErrorMessage("Application Deadline is required");
    return;
}

const today = new Date().toISOString().split("T")[0];

if (jobData.applicationDeadline < today) {
    setErrorMessage(
        "Application Deadline cannot be in the past."
    );
    return;
}

    try {

        if (selectedJob) {

            await updateJob(
                selectedJob.jobId,
                jobData,
                user.token
            );

        }
        else {

            await addJob(
                {
                    ...jobData,
                    employerId: user.employerId
                },
                user.token
            );

        }

        await loadJobs();

        handleCancel();
        setErrorMessage("");

    }
    catch (error) {

        setErrorMessage(error.message);

    }

}

    function handleCancel() {

        setSelectedJob(null);

        setJobData({
            jobTitle: "",
            jobDescription: "",
            location: "",
            salary: "",
            requiredSkills: "",
            applicationDeadline: ""
        });
    }

    return (
        <div className="card shadow-sm mt-4">

            <div className="card-body">


        <form onSubmit={handleSubmit}>

            <h3>
                {selectedJob ? "Update Job" : "Add Job"}
            </h3>

            <fieldset disabled={!profileCompleted}>
                
            
                

                <AlertMessage message={errorMessage}/>
               
                <div className="mb-3">

                    <label className="form-label">
                    Job Title
                    </label>
                    

                <input
                    className="form-control"
                    type="text"
                    name="jobTitle"
                    placeholder="Job Title"
                    value={jobData.jobTitle}
                    onChange={handleChange}
                />
                </div>

                <br /><br />
                <div className="mb-3">

                    <label className="form-label">
                    Job Description
                    </label>
                <input
                    className="form-control"
                    type="text"
                    name="jobDescription"
                    placeholder="Job Description"
                    value={jobData.jobDescription}
                    onChange={handleChange}
                />
                </div>

                <br /><br />
                <div className="mb-3">
                    
                    <label className="form-label">
                    Job Location
                    </label>
                <input
                    className="form-control"
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={jobData.location}
                    onChange={handleChange}
                />
                </div>

                <br /><br />
                <div className="mb-3">

                    <label className="form-label">
                    Salary
                    </label>
                <input
                    className="form-control"
                    type="number"
                    name="salary"
                    placeholder="Salary"
                    value={jobData.salary}
                    onChange={handleChange}
                />
                </div>

                <br /><br />
                <div className="mb-3">

                    <label className="form-label">
                    Required Skills
                    </label>
                <input
                    className="form-control"
                    type="text"
                    name="requiredSkills"
                    placeholder="Required Skills"
                    value={jobData.requiredSkills}
                    onChange={handleChange}
                />
                </div>

                <br /><br />
                <div className="mb-3">

                    <label className="form-label">
                    Application DeadLine
                    </label>
                <input
                    className="form-control"
                    type="date"
                    name="applicationDeadline"
                    value={jobData.applicationDeadline}
                    min={
                        selectedJob
                            ? ""
                            : new Date().toISOString().split("T")[0]
                    }
                    onChange={handleChange}
                />
                </div>

                <br /><br />

                <button className="btn btn-primary me-2" type="submit">
                    {selectedJob ? "Update" : "Add"}
                </button>

                {selectedJob && (
                    <button className="btn btn-secondary"
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )}

            </fieldset>

        </form>
        </div>
        </div>
    );
}