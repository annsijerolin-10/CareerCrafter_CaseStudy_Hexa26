import { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext";


export function ManageApplications() {

    const { user } = useAuth();

    const [applications, setApplications] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        loadApplications();
    }, []);

    async function loadApplications() {

        // We'll implement this after creating the Axios API

    }

    return (

        <div>

            <h2>Manage Applications</h2>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

        </div>

    );

}