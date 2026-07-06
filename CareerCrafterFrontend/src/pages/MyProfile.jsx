import { useAuth } from "../context/AuthContext";
import { JobSeekerProfileForm } from "../components/JobSeekerProfileForm";
import { EmployerProfileForm } from "../components/EmployerProfileForm";
import { ChangePasswordForm } from "../components/ChangePasswordForm";

export function MyProfile() {

    const { user } = useAuth();

    return (
        <div className="container">

            <h2>My Profile</h2>

            {
                (user.role === "JobSeeker")?
                    <JobSeekerProfileForm />
                    :           
                    <EmployerProfileForm />
            }
            <hr className="my-5"/>
            <ChangePasswordForm />


        </div>
    );

}