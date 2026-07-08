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
    const [successMessage, setSuccessMessage] = useState("");

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

    useEffect(() => {

        if (!errorMessage && !successMessage)
            return;

        const timer = setTimeout(() => {

            setErrorMessage("");
            setSuccessMessage("");

        }, 3000);

        return () => clearTimeout(timer);

    }, [errorMessage, successMessage]);

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
            setSuccessMessage("Job updated successfully.");

        }
        else {

            await addJob(
                {
                    ...jobData,
                    employerId: user.employerId
                },
                user.token
            );
            setSuccessMessage("Job added successfully.");
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

            <h5>
                {selectedJob ? "Update Job" : "Add New Job"}
            </h5>

            <fieldset disabled={!profileCompleted}>
                
                 <AlertMessage
                    type="success"
                    message={successMessage}
                />
                

                <AlertMessage message={errorMessage}/>
               
                <div className="form-row">

                <label>
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

                <div className="form-row">

                <label>
                    Job Description
                    </label>
                <textarea
                    className="form-control"
                    name="jobDescription"
                    value={jobData.jobDescription}
                    onChange={handleChange}
                    placeholder="Enter job description..."
                    rows={4}
                />
                </div>


                <div className="form-row">

                <label>
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

                <div className="form-row">

                <label>
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

               <div className="form-row">

                <label>
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

                <div className="form-row">

                <label>
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