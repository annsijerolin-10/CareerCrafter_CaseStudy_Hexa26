import { useState } from "react";

function ApplicationRow({
    application,
    onStatusUpdate
}) {

    const [status, setStatus] = useState(application.status);

    return (

        <tr>

            <td>{application.jobSeekerName}</td>

            <td>{application.jobTitle}</td>

            <td>{application.companyName}</td>

            <td>
                {new Date(application.applicationDate)
                    .toLocaleDateString()}
            </td>

            <td>{application.status}</td>

            <td>{
                application.status==="Withdrawn"?(
                    <span>Not Editable</span>
                ):(
                    <>
                

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >

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

                    </select>

                    {" "}

                    <button
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
                )}

            </td>

        </tr>

    );

}


export function ApplicationTable({
    applications,
    onStatusUpdate
}) {

    if (applications.length === 0) {
        return <p>No Applications Found</p>;
    }

    return (

        <table border="1" cellPadding="10">

            <thead>

                <tr>

                    <th>Applicant</th>

                    <th>Job Title</th>

                    <th>Company</th>

                    <th>Applied Date</th>

                    <th>Current Status</th>

                    <th>Update Status</th>

                </tr>

            </thead>

            <tbody>

                {
                    applications.map(application =>

                        <ApplicationRow
                            key={application.applicationId}
                            application={application}
                            onStatusUpdate={onStatusUpdate}
                        />

                    )
                }

            </tbody>

        </table>

    );

}