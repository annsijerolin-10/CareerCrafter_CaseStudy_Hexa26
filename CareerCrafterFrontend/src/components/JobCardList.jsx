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


    return (

        <div className="job-container">

            {jobs.map(job => (

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

                    <hr />

                    {
                        appliedJobIds.includes(job.jobId)
                            ?
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
                            :
                            <button
                                onClick={() => onApply(job)}
                            >
                                Apply
                            </button>
                    }

                </div>

            ))}

        </div>

    );

}