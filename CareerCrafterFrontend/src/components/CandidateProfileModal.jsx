function getResumeFileName(path) {

    if (!path)
        return "";

    const fileName = path.split("/").pop();

    return fileName.substring(
        fileName.indexOf("_") + 1
    );

}

export function CandidateProfileModal({
    candidate,
    onClose
}) {

    if (!candidate)
        return null;

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-lg modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Candidate Profile
                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <div className="row mb-3">

                            <div className="col-4 fw-bold">
                                Name
                            </div>

                            <div className="col-8">
                                {candidate.fullName}
                            </div>

                        </div>

                        <div className="row mb-3">

                            <div className="col-4 fw-bold">
                                Email
                            </div>

                            <div className="col-8">
                                {candidate.email}
                            </div>

                        </div>

                        <div className="row mb-3">

                            <div className="col-4 fw-bold">
                                Phone
                            </div>

                            <div className="col-8">
                                {candidate.phone}
                            </div>

                        </div>

                        <div className="row mb-3">

                            <div className="col-4 fw-bold">
                                Address
                            </div>

                            <div className="col-8">
                                {candidate.address}
                            </div>

                        </div>

                        <div className="row mb-3">

                            <div className="col-4 fw-bold">
                                Skills
                            </div>

                            <div className="col-8">
                                {candidate.skills}
                            </div>

                        </div>

                        <div className="row mb-3">

                            <div className="col-4 fw-bold">
                                Experience
                            </div>

                            <div className="col-8">
                                {candidate.experienceYears} Years
                            </div>

                        </div>

                        <div className="row">

                            <div className="col-4 fw-bold">
                                Resume
                            </div>

                            <div className="col-8">

                                <a
                                    href={`https://localhost:7109${candidate.resumeFile}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {getResumeFileName(candidate.resumeFile)}
                                </a>

                            </div>

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Close
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}