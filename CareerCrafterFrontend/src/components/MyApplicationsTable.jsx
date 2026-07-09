function getResumeFileName(path) {

    if (!path) return "";

    const fileName = path.split("/").pop();

    return fileName.substring(fileName.indexOf("_") + 1);

}

export function MyApplicationsTable({
    applications,
    onWithdraw
}) {

    if (applications.length === 0) {
        return <p>No Applications Found.</p>;
    }

    return (
        <div className="card table-card">

        <div className="card-body">

        <div className="table-responsive">

                    <table className="table  table-hover align-middle">

                        <thead className="table-primary">

                            <tr>

                                <th>Job Title</th>
                                <th>Company</th>
                                <th>Resume</th>
                                <th>Applied On</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>
                       {applications.map(application => (

                                <tr key={application.applicationId}>

                                    <td>{application.jobTitle}</td>

                                    <td>{application.companyName}</td>
                                   <td>
                                    <a
                                        href={`https://localhost:7109/${application.resumeFile}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >

                                        {getResumeFileName(application.resumeFile)}
                                    </a>
                                    </td>

                                    <td>
                                        {new Date(
                                            application.applicationDate
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>{application.status}</td>

                                    <td>

                                        {application.status === "Applied" ? (

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    onWithdraw(application.applicationId)
                                                }
                                            >
                                                Withdraw
                                            </button>

                                        ) : (

                                            "-"

                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}