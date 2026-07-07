import { useState,useEffect } from "react";



function ApplicationRow({
    application,
    onStatusUpdate,
    onViewCandidate
}) {

    const [status, setStatus] = useState(application.status);
    useEffect(() => {

    setStatus(application.status);

}, [application.status]);
    return (

    <tr id={`application-${application.applicationId}`}>

        <td>{application.jobSeekerName}</td>

        <td>{application.jobTitle}</td>

        <td>{application.companyName}</td>

        <td>
            {new Date(application.applicationDate)
                .toLocaleDateString()}
        </td>

        <td>
            <a
                href={`https://localhost:7109${application.resumeFile}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-primary"
            >
                View Resume
            </a>
        </td>

        <td>{application.status}</td>

        <td>
            

            {
                
                application.status === "Withdrawn"
                    ? (
                        <span>Not Editable</span>
                    )
                    : (
                        <>
                            <select className="form-select form-select-sm d-inline w-auto"
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >
                                {
                                application.status === "Applied" && (
                                    <>
                                        <option value="Applied">
                                            Applied
                                        </option>

                                        <option value="Reviewed">
                                            Reviewed
                                        </option>

                                        <option value="Shortlisted">
                                            Shortlisted
                                        </option>

                                        <option value="Rejected">
                                            Rejected
                                        </option>
                                    </>
                                )
                            }

                            {
                                application.status === "Reviewed" && (
                                    <>
                                        <option value="Reviewed">
                                            Reviewed
                                        </option>

                                        <option value="Shortlisted">
                                            Shortlisted
                                        </option>

                                        <option value="Rejected">
                                            Rejected
                                        </option>
                                    </>
                                )
                            }

                            {
                                application.status === "Shortlisted" && (
                                    <>
                                        <option value="Shortlisted">
                                            Shortlisted
                                        </option>
                                    </>
                                )
                            }

                            {
                                application.status === "Rejected" && (
                                    <>
                                        <option value="Rejected">
                                            Rejected
                                        </option>
                                    </>
                                )
                            }

                            </select>

                            {" "}

                            <button className="btn btn-sm btn-success ms-2"
                                onClick={() =>
                                    onStatusUpdate(
                                        application.applicationId,
                                        status
                                    )
                                }
                            >
                                Update
                            </button>
                        </>
                    )
            }

        </td>

        <td>

            <button className="btn btn-sm btn-info ms-2"
                onClick={() =>
                    onViewCandidate(
                        application.jobSeekerId
                    )
                }
            >
                View Candidate
            </button>

        </td>

    </tr>

);

}


export function ApplicationTable({
    applications,
    onStatusUpdate,
    onViewCandidate
}) {

    if (applications.length === 0) {
        return (
        <div className="alert alert-info">
            No applications found.
        </div>

);
    }

    return (
        <div className="card shadow-sm">

    <div className="card-body">
        <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
            <thead className="table-primary">
                <tr>
                    <th>Applicant</th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Applied On</th>
                    <th>Resume</th>
                    <th>Current Status</th>
                    <th>Update Status</th>
                    <th>Candidate</th>
                </tr>

            </thead>

            <tbody>

                {
                    applications.map(application =>

                        <ApplicationRow
                            key={application.applicationId}
                            application={application}
                            onStatusUpdate={onStatusUpdate}
                            onViewCandidate={onViewCandidate}
                        />

                    )
                }

            </tbody>

        </table>
        </div>
        </div>
        </div>

    );

}