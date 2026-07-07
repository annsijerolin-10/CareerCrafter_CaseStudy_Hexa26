

export function JobTable({
    jobs,
    onEditJob,
    onDeleteJob,
    onRestoreJob,
    showArchived
}) {

    if (jobs.length === 0) {
        return <p>No Jobs Found</p>;
    }

    return (
        <div className="card shadow-sm mt-4">

        <div className="card-body">

        <div className="table-responsive">

        <table className="table table-striped table-hover align-middle">

            <thead className="table-primary">
                <tr>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Salary</th>
                    <th>Required Skills</th>
                    <th>Posted Date</th>
               
                    <th>Actions</th>
                    
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
                            {
                                showArchived?(
                                    <button className="btn btn-success btn-sm" onClick={()=> onRestoreJob(job.jobId)}>Restore</button>
                                ):(
                                    <>
                                     <button className= "btn btn-warning btn-sm me-2" 
                                        onClick={() => onEditJob(job)}>  
                                        Edit                                                                                                                 
                                    </button>

                                    <button className= "btn btn-danger btn-sm" onClick={() => onDeleteJob(job.jobId)}>                                                                        
                                        Archive
                                    </button>
                                    

                                    </>
                                )
                            }

                           

                        </td>

                    </tr>

                )}

            </tbody>

        </table>
        </div>
        </div>
        </div>
    );
}

    