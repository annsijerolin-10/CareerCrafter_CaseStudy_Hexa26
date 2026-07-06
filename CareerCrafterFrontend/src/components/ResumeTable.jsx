function getResumeFileName(path) {

    if (!path) return "";

    const fileName = path.split("/").pop();

    return fileName.substring(fileName.indexOf("_") + 1);

}

export function ResumeTable({
    resumes,
   
    onDelete
}) {

    if (resumes.length === 0) {

        return <p>No resumes uploaded.</p>;

    }

    return (

        <table border="1" cellPadding="10">

            <thead>

                <tr>

                    <th>Resume</th>
                    <th>Upload Date</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {

                    resumes.map(resume => (

                        <tr key={resume.resumeId}>

                            <td>
                                <a
                                    href={`https://localhost:7109${resume.resumeFile}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {getResumeFileName(resume.resumeFile)}
                                </a>
                            </td>

                            <td>
                                {
                                    new Date(
                                        resume.uploadDate
                                    ).toLocaleDateString()
                                }
                            </td>

                            <td>
                                <button
                                    onClick={() => onDelete(resume.resumeId)}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}