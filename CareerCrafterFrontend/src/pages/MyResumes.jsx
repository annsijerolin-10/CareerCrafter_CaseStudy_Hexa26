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
import { AlertMessage } from "../components/AlertMessage";

export function MyResumes() {

    const { user } = useAuth();

    const [resumes, setResumes] = useState([]);
    //const [selectedResume, setSelectedResume] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedResumeId, setSelectedResumeId] = useState(null);

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

            setMessage("Resume uploaded successfully.");
            await loadResumes();
            setTimeout(() => {
                setMessage("");
            }, 3000);
            

        }
        catch (error) {
            setError(error.message);

        }

    }

    
    // async function handleDelete(resumeId) {

        

    //     try {

    //         await deleteResume(
    //             resumeId,
    //             user.token
    //         );

    //         setMessage("Resume deleted successfully.");
    //         await loadResumes();

    //         setTimeout(() => {
    //             setMessage("");
    //         }, 3000);

    //         //loadResumes();

    //     }
    //     catch (error) {

    //         setError(error.message);

    //     }

    function handleDelete(resumeId) {

        setSelectedResumeId(resumeId);
        setShowDeleteModal(true);

    }
    async function confirmDelete() {

    try {

        await deleteResume(
            selectedResumeId,
            user.token
        );

        setMessage("Resume deleted successfully.");
            setTimeout(() => {
                setMessage("");
            },3000);

        await loadResumes();

    }
    catch(error){

        setError(error.message);

        setTimeout(() => {

            setError("");

        },3000);

    }

    setShowDeleteModal(false);

}

    return (

        <div>
            
    

            <h2>My Resumes</h2>
            
                 <AlertMessage
                    type="success"
                    message={message}
                />
                <AlertMessage
                    message={error}
                />
                            
            

            

            <ResumeForm
                onUpload={handleUpload}
            
               
                
            />

            <ResumeTable
                resumes={resumes}
                
                onDelete={handleDelete}
            />
            {
    showDeleteModal &&

    <div
        className="modal fade show d-block"
        style={{ background: "rgba(0,0,0,.5)" }}
    >

        <div className="modal-dialog">

            <div className="modal-content">
                <div className="modal-body">
                    Are you sure you want to delete this resume?
                </div>

                <div className="modal-footer">

                    <button
                        className="btn btn-secondary"
                        onClick={() =>
                            setShowDeleteModal(false)
                        }
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={confirmDelete}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    </div>
}

        </div>

    );

}