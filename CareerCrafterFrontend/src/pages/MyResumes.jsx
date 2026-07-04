import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    getResumesByJobSeeker,
    uploadResume,
    //updateResume,
    deleteResume
} from "../api/ResumeAxiosApi";
import { ResumeTable } from "../components/ResumeTable";
import { ResumeForm } from "../components/ResumeForm";

export function MyResumes() {

    const { user } = useAuth();

    const [resumes, setResumes] = useState([]);
    //const [selectedResume, setSelectedResume] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        loadResumes();

    }, []);

    async function loadResumes() {

        try {

            const response = await getResumesByJobSeeker(
                user.jobSeekerId,
                user.token
            );

            setResumes(response);

        }
        catch (error) {

            setError(error.message);

        }

    }

    async function handleUpload(file) {

        try {

            const formData = new FormData();

            formData.append("ResumeFile", file);

            formData.append(
                "JobSeekerId",
                user.jobSeekerId
            );

            await uploadResume(
                formData,
                user.token
            );

            alert("Resume uploaded successfully.");

            loadResumes();

        }
        catch (error) {

            alert(error.message);

        }

    }

    
    async function handleDelete(resumeId) {

        if (!window.confirm("Delete this resume?"))
            return;

        try {

            await deleteResume(
                resumeId,
                user.token
            );

            alert("Resume deleted successfully.");

            loadResumes();

        }
        catch (error) {

            alert(error.message);

        }

    }

    return (

        <div>

            <h2>My Resumes</h2>

            {
                error &&
                <p style={{ color: "red" }}>
                    {error}
                </p>
            }

            <ResumeForm
                onUpload={handleUpload}
            
               
                
            />

            <ResumeTable
                resumes={resumes}
                
                onDelete={handleDelete}
            />

        </div>

    );

}