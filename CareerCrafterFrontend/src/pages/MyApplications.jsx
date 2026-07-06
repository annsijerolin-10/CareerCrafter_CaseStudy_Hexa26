import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getApplicationsByJobSeeker,withdrawApplication } from "../api/ApplicationAxiosApi";
import { MyApplicationsTable } from "../components/MyApplicationsTable";
import { AlertMessage } from "../components/AlertMessage";
export function MyApplications() {

    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState("");
    const [message,setMessage]=useState("");
    useEffect(() => {
        loadApplications();
    }, []);

    async function loadApplications() {

        try {

            const data = await getApplicationsByJobSeeker(
                user.jobSeekerId,
                user.token
            );

            setApplications(data);

        }
        catch (error) {

            setError(error.message);

        }

    }

    async function handleWithdraw(applicationId) {

        try {

            await withdrawApplication(
                applicationId,
                user.token
            );

            setMessage( "Application withdrawn successfully.");
            await loadApplications();

            setTimeout(()=>{

            setMessage("");

            },3000);

        }
        catch (error) {

            setError(error.message);

        }

    }

    return (

        <div>

            <h2>My Applications</h2>
            <AlertMessage
                message={error}
            />

            <AlertMessage
                type="success"
                message={message}
                />


           

            <MyApplicationsTable
                applications={applications}
                onWithdraw={handleWithdraw}
            />

        </div>

    );

}