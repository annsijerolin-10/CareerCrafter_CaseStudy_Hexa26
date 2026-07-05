export function JobCardList({
    jobs,
    applications,
    onApply,
    onViewApplication
}) {

    if (jobs.length === 0) {
        return <p>No Jobs Available.</p>;
    }

    const appliedJobIds = applications
        .filter(app => app.status !== "Withdrawn")
        .map(app => app.jobId);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (

        <div className="job-container">

            {jobs.map(job => {

                const deadline = new Date(job.applicationDeadline);
                deadline.setHours(0, 0, 0, 0);

                const isDeadlinePassed = deadline < today;

                return (

                    <div
                        key={job.jobId}
                        className="job-card"
                    >

                        <h3>{job.jobTitle}</h3>

                        <p>
                            <strong>Company:</strong> {job.companyName}
                        </p>

                        <p>
                            <strong>Location:</strong> {job.location}
                        </p>

                        <p>
                            <strong>Salary:</strong> ₹ {job.salary}
                        </p>

                        <p>
                            <strong>Skills:</strong> {job.requiredSkills}
                        </p>

                        <p>
                            <strong>Posted:</strong>{" "}
                            {new Date(job.postedDate).toLocaleDateString()}
                        </p>

                        <p>
                            <strong>Apply Before:</strong>{" "}
                            {deadline.toLocaleDateString()}
                        </p>

                        <hr />

                        {
                            appliedJobIds.includes(job.jobId)
                                ? (
                                    <>
                                        <button disabled>
                                            ✓ Applied
                                        </button>

                                        <br />

                                        <button
                                            style={{ marginTop: "10px" }}
                                            onClick={() =>
                                                onViewApplication(job.jobId)
                                            }
                                        >
                                            View Application
                                        </button>
                                    </>
                                )
                                : isDeadlinePassed
                                    ? (
                                        <button
                                            disabled
                                            style={{
                                                backgroundColor: "#888",
                                                cursor: "not-allowed"
                                            }}
                                        >
                                            Closed
                                        </button>
                                    )
                                    : (
                                        <button
                                            onClick={() => onApply(job)}
                                        >
                                            Apply
                                        </button>
                                    )
                        }

                    </div>

                );

            })}

        </div>

    );

}