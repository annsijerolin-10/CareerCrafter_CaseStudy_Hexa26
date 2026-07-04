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

        <table border="1" cellPadding="10">

            <thead>

                <tr>

                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Resume</th>
                    <th>Applied Date</th>
                    <th>Status</th>
                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {

                    applications.map(application => (

                        <tr key={application.applicationId}>

                            <td>{application.jobTitle}</td>

                            <td>{application.companyName}</td>

                            <td>
                                {getResumeFileName(
                                    application.resumeFile
                                )}
                            </td>

                            <td>
                                {
                                    new Date(
                                        application.applicationDate
                                    ).toLocaleDateString()
                                }
                            </td>

                            <td>{application.status}</td>

                            <td>

                                {
                                    application.status === "Applied" ?

                                        <button onClick={()=> onWithdraw(application.applicationId)}>
                                            Withdraw
                                        </button>

                                        :

                                        "-"

                                }

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}