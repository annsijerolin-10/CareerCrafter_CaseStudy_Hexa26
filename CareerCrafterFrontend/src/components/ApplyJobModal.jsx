function getResumeFileName(path) {

    if (!path) return "";

    const fileName = path.split("/").pop();

    return fileName.substring(fileName.indexOf("_") + 1);

}

export function ApplyJobModal({
    job,
    resumes,
    selectedResumeId,
    setSelectedResumeId,
    onApply,
    onCancel,
    onUploadResume,
    uploading,
    resumeMessage
}) {

    if (!job) return null;

    return (

        <div
            style={{
                border: "1px solid white",
                padding: "20px",
                marginTop: "20px"
            }}
        >

            <h3>Apply for {job.jobTitle}</h3>

            <p>Select Resume:</p>

            <select
                value={selectedResumeId}
                onChange={(e) =>
                    setSelectedResumeId(Number(e.target.value))
                }
            >

                <option value="">-- Select Resume --</option>

                {
                    resumes.map(resume => (

                        <option
                            key={resume.resumeId}
                            value={resume.resumeId}
                        >
                           {getResumeFileName(resume.resumeFile)}
                            {/* {" ("} */}
                            {/* {new Date(resume.uploadDate).toLocaleDateString()}
                            {")"} */}
                        </option>

                    ))
                }

            </select>

            <br /><br />
            <p>OR</p>
            <p>Add new Resume</p>
            <input
                type="file"
                accept=".pdf"
                onChange={onUploadResume}
            />
            {uploading && (
                <p style={{ color: "blue" }}>
                    Uploading resume...
                </p>
            )}

            {resumeMessage && (
                <p
                    style={{
                        color: resumeMessage.includes("successfully")
                            ? "green"
                            : "red"
                    }}
                >
                    {resumeMessage}
                </p>
            )}

            
            <br /><br />

            <button
                onClick={onApply}
                disabled={!selectedResumeId}
            >
                Confirm Apply
            </button>

            <button
                onClick={onCancel}
                style={{ marginLeft: "10px" }}
            >
                Cancel
            </button>

        </div>

    );

}