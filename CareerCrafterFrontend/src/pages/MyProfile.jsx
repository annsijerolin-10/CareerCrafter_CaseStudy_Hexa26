import { useAuth } from "../context/AuthContext";
import { JobSeekerProfileForm } from "../components/JobSeekerProfileForm";
// import { EmployerProfileForm } from "../components/EmployerProfileForm";

export function MyProfile() {

    const { user } = useAuth();

    return (
        <div>

            <h2>My Profile</h2>

            {
                user.role === "JobSeeker"
                    ?
                    <JobSeekerProfileForm />
                    :
                    <p>Employer Profile Coming Soon</p>
                    // <EmployerProfileForm />
            }

        </div>
    );

}