export function JobList({
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

        <table border="1" cellPadding="10">

            <thead>

                <tr>

                    <th>Title</th>
                    {/* <th>Company</th> */}
                    <th>Location</th>
                    <th>Salary</th>
                    <th>Required Skills</th>
                    <th>Posted Date</th>
                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {

                    jobs.map(job => (

                        <tr key={job.jobId}>

                            <td>{job.jobTitle}</td>
                            {/* <td>{job.companyName}</td> */}
                            <td>{job.location}</td>
                            <td>{job.salary}</td>
                            <td>{job.requiredSkills}</td>
                            <td>{new Date(job.postedDate).toLocaleDateString()}</td>

                           
                            <td>

                            {
                                appliedJobIds.includes(job.jobId)?(
                                <>
                                        <button disabled>
                                            ✓ Applied
                                        </button>
                                        <button
                                            style={{
                                                marginTop: "5px",
                                                fontSize: "12px"
                                            }}
                                            onClick={() => onViewApplication(job.jobId)}
                                        >
                                            View Application
                                        </button>
                                    </>
                                        
                                    )
                                    : (
                                        <button
                                            onClick={() => onApply(job)}
                                        >
                                            Apply
                                        </button>
                                    )
                                
                            }

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}