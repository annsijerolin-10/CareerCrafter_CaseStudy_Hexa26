

export function JobTable({
    jobs,
     onEditJob,
    onDeleteJob
}) {

    if (jobs.length === 0) {
        return <p>No Jobs Found</p>;
    }

    return (
        <table border="1" cellPadding="10">

            <thead>
                <tr>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Salary</th>
                    <th>Required Skills</th>
                    <th>Actions</th>
                    <th>Posted Date</th>
                </tr>
            </thead>

            <tbody>

                {jobs.map(job =>

                    <tr key={job.jobId}>

                        <td>{job.jobTitle}</td>
                        <td>{job.location}</td>
                        <td>{job.salary}</td>
                        <td>{job.requiredSkills}</td>
                        <td>{new Date(job.postedDate).toLocaleDateString()}</td>


                        <td>

                            <button
                                onClick={() => onEditJob(job)}
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => onDeleteJob(job.jobId)}
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                )}

            </tbody>

        </table>
    );
}

    