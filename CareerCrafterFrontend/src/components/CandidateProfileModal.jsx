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
            style={{
                border: "1px solid white",
                padding: "20px",
                marginTop: "20px"
            }}
        >

            <h3>Candidate Profile</h3>

            <p>
                <strong>Name:</strong>{" "}
                {candidate.fullName}
            </p>

            <p>
                <strong>Email:</strong>{" "}
                {candidate.email}
            </p>

            <p>
                <strong>Phone:</strong>{" "}
                {candidate.phone}
            </p>

            <p>
                <strong>Address:</strong>{" "}
                {candidate.address}
            </p>

            <p>
                <strong>Skills:</strong>{" "}
                {candidate.skills}
            </p>

            <p>
                <strong>Experience:</strong>{" "}
                {candidate.experienceYears} Years
            </p>

            <p>
                <strong>Resume:</strong>{" "}

                <a
                    href={`https://localhost:7109${candidate.resumeFile}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    {getResumeFileName(candidate.resumeFile)}
                </a>

            </p>

            <button onClick={onClose}>
                Close
            </button>

        </div>

    );

}