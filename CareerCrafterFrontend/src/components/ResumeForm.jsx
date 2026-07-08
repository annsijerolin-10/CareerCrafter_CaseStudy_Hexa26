import { useState } from "react";
import { AlertMessage } from "./AlertMessage";
export function ResumeForm({
    onUpload
}) {

    const [resumeFile, setResumeFile] = useState(null);
    const [error,setError]=useState("");

    function handleSubmit(e) {

        e.preventDefault();

           if(!resumeFile){
                setError("Please select a PDF.");
            return;

        }

        onUpload(resumeFile);

        setResumeFile(null);

        e.target.reset();
        setError("");
        

    }

    return (
        <div className="card shadow-sm mt-4">

            <div className="card-body">

        

            <h4>Upload Resume</h4>
            <AlertMessage
                message={error}
                />
            
            <form onSubmit={handleSubmit}>

            <div className="mb-3">
            <input
            className="form-control"
                type="file"
                accept=".pdf"
                onChange={(e) =>
                    setResumeFile(e.target.files[0])
                }
            />
            </div>

            

            <button className="btn btn-primary" type="submit">

                Upload

            </button>

        </form>
        </div></div>

    );

}