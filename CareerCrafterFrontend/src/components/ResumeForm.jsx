import { useState } from "react";

export function ResumeForm({
    onUpload
}) {

    const [resumeFile, setResumeFile] = useState(null);

    function handleSubmit(e) {

        e.preventDefault();

        if (!resumeFile) {

            alert("Please select a PDF.");

            return;

        }

        onUpload(resumeFile);

        setResumeFile(null);

        e.target.reset();

    }

    return (

        <form onSubmit={handleSubmit}>

            <h3>Upload Resume</h3>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                    setResumeFile(e.target.files[0])
                }
            />

            <br /><br />

            <button type="submit">

                Upload

            </button>

        </form>

    );

}