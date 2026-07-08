import { useState } from "react";

export function JobCardList({
    jobs,
    applications,
    onApply,
    onViewApplication,
    profileCompleted
}) {

    if (jobs.length === 0) {
        return <p>No Jobs Available.</p>;
    }

    const appliedJobIds = applications
        .filter(app => app.status !== "Withdrawn")
        .map(app => app.jobId);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [selectedJob, setSelectedJob] = useState(null);

    return (
        <>
            <div className="d-flex flex-column gap-3">

                {jobs.map(job => {

                    const deadline = new Date(job.applicationDeadline);
                    deadline.setHours(0, 0, 0, 0);

                    const isDeadlinePassed = deadline < today;

                    return (

                        <div
                            key={job.jobId}
                            className="card shadow-sm job-card"
                        >

                            <div className="card-body">

                     
                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <h4 className="job-title mb-1">
                                            {job.jobTitle}
                                        </h4>

                                        <div className="mt-2">

                                            <p className="mb-1">
                                                <strong>Company:</strong> {job.companyName}
                                            </p>

                                             <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() =>
                                            setSelectedJob({
                                                ...job,
                                                modalType: "Company"
                                            })
                                        }
                                    >
                                        About Company
                                    </button>


                                        </div>

                                    </div>

                                    <div className="d-flex flex-column align-items-end gap-2">

                                        <div className="job-salary">
                                            <span className="job-label"><strong>
                                                Salary:
                                                </strong>
                                            </span>{" "}
                                            ₹ {job.salary}
                                        </div>

                                        <div ><strong>
                                            Location: {job.location}
                                            </strong>
                                        </div>
                                        <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() =>
                                            setSelectedJob({
                                                ...job,
                                                modalType: "job"
                                            })
                                        }
                                    >
                                        View Job Description
                                    </button>

                                    </div>

                                </div>

                                <hr />


                                <div className="d-flex justify-content-between align-items-start mb-3">

                                    <div>

                                        <p className="mb-2">
                                            <strong>Skills Required:</strong>
                                        </p>

                                        <div className="d-flex flex-wrap gap-2">

                                            {job.requiredSkills
                                                ?.split(",")
                                                .map(skill => (

                                                    <span
                                                        key={skill}
                                                        className="badge bg-light text-dark border"
                                                    >
                                                        {skill.trim()}
                                                    </span>

                                                ))}

                                        </div>

                                    </div>

                                    

                                </div>

                                <hr />

                                <div className="d-flex justify-content-end gap-2">

                                    {appliedJobIds.includes(job.jobId) ? (

                                        <>
                                            <button
                                                className="btn btn-success"
                                                disabled
                                            >
                                                Applied
                                            </button>

                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() =>
                                                    onViewApplication(job.jobId)
                                                }
                                            >
                                                View Application
                                            </button>
                                        </>

                                    ) : isDeadlinePassed ? (

                                        <button
                                            className="btn btn-secondary"
                                            disabled
                                        >
                                            Closed
                                        </button>

                                    ) : (

                                        <button
                                            className={`btn ${
                                                profileCompleted
                                                    ? "btn-primary"
                                                    : "btn-warning"
                                            }`}
                                            disabled={!profileCompleted}
                                            onClick={() => onApply(job)}
                                        >
                                            {profileCompleted
                                                ? "Apply Now"
                                                : "Complete Profile First"}
                                        </button>

                                    )}

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

            {/* Modal */}

            {selectedJob && (

                <div
                    className="modal fade show d-block"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >

                    <div className="modal-dialog modal-lg">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h4 className="modal-title">

                                    {selectedJob.modalType === "job"
                                        ? "Job Description"
                                        : "Company Description"}

                                </h4>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setSelectedJob(null)}
                                ></button>

                            </div>

                            <div className="modal-body">

                                {selectedJob.modalType === "job" ? (

                                    <p style={{ whiteSpace: "pre-line" }}>
                                        {selectedJob.jobDescription}
                                    </p>

                                ) : (

                                    <p style={{ whiteSpace: "pre-line" }}>
                                        {selectedJob.companyDescription}
                                    </p>

                                )}

                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setSelectedJob(null)}
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}