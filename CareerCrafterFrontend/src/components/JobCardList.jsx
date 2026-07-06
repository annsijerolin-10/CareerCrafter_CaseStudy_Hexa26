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

    return (

        <div className="row g-4">

            {jobs.map(job => {

                const deadline = new Date(job.applicationDeadline);
                deadline.setHours(0, 0, 0, 0);

                const isDeadlinePassed = deadline < today;

                return (

                    <div
                        key={job.jobId}
                        className="col-md-6 col-lg-4"
                    >

                    <div className="card card-hover h-100 shadow-sm">

                    <div className="card-body">

                        <h5 className="card-title">
                            {job.jobTitle}
                        </h5>

                        <p className="mb-2">
                            <strong>Company:</strong> {job.companyName}
                        </p>

                        <p className="mb-2">
                            <strong>Location:</strong> {job.location}
                        </p>

                        <p className="mb-2">
                            <strong>Salary:</strong> ₹ {job.salary}
                        </p>

                        <p className="mb-2">
                            <strong>Skills:</strong> {job.requiredSkills}
                        </p>

                        <p className="mb-2">
                            <strong>Posted:</strong>{" "}
                            {new Date(job.postedDate).toLocaleDateString()}
                        </p>

                        <p className="mb-2">
                            <strong>Apply Before:</strong>{" "}
                            {deadline.toLocaleDateString()}
                        </p>

                        

                        {
                            appliedJobIds.includes(job.jobId)
                                ? (
                                    <>
                                        <button
                                            className="btn btn-success"
                                            disabled
                                        >
                                            ✓ Applied
                                        </button>

                                        <button
                                            className="btn btn-outline-primary mt-2 d-block"
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
                                            className="btn btn-secondary"
                                            disabled
                                        >
                                            Closed
                                        </button>
                                    )

                                    : (
                                        <button
                                            className={`btn ${
                                                profileCompleted
                                                    ? "btn-primary"
                                                    : "btn-warning"
                                            }`}
                                            disabled={!profileCompleted}
                                            onClick={() => onApply(job)}
                                        >
                                            {
                                                profileCompleted
                                                    ? "Apply"
                                                    : "Complete Profile First"
                                            }
                                        </button>
                                    )
                        }

                    </div>
                    </div></div>

                );

            })}

        </div>


    );

}