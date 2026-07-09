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
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Apply for {job.jobTitle}
                        </h5>

                        <button
                            className="btn-close"
                            onClick={onCancel}
                        />

                    </div>

                    <div className="modal-body">

                        <label className="form-label">
                            Select Resume
                        </label>

                        <select
                            className="form-select"
                            value={selectedResumeId}
                            onChange={(e) =>
                                setSelectedResumeId(
                                    Number(e.target.value)
                                )
                            }
                        >

                            <option value="">
                                -- Select Resume --
                            </option>

                            {
                                resumes.map(resume => (

                                    <option
                                        key={resume.resumeId}
                                        value={resume.resumeId}
                                    >
                                        {getResumeFileName(
                                            resume.resumeFile
                                        )}
                                    </option>

                                ))
                            }

                        </select>

                        <hr />
                        <p>
                            OR
                        </p>

                        <label className="form-label">
                            Upload New Resume
                        </label>

                        <input
                            className="form-control"
                            type="file"
                            accept=".pdf"
                            onChange={onUploadResume}
                        />

                        {
                            uploading &&
                            <div className="text-primary mt-2">
                                Uploading...
                            </div>
                        }

                        {
                            resumeMessage &&
                            <div
                                className={`alert mt-3 ${
                                    resumeMessage.includes("successfully")
                                        ? "alert-success"
                                        : "alert-danger"
                                }`}
                            >
                                {resumeMessage}
                            </div>
                        }

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-primary"
                            disabled={!selectedResumeId}
                            onClick={onApply}
                        >
                            Confirm Apply
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}