import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { EmployerDashboard } from './pages/EmployerDashboard'
import { JobSeekerDashboard } from './pages/JobSeekerDashboard'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Register } from './pages/Register'
import { EmployerHome } from './pages/EmployerHome'
import { CandidateProfile } from './pages/CandidateProfile'
import { ManageJobs } from './pages/ManageJobs'
import { ManageApplications } from './pages/ManageApplication'

import { JobSeekerHome } from './pages/JobSeekerHome'
import { MyResumes } from './pages/MyResumes'
import { MyApplications } from './pages/MyApplications'
import { BrowseJobs } from './pages/BrowseJobs'
import { Notifications } from './pages/Notifications'
import { MyApplicationsTable } from './components/MyApplicationsTable'
import { JobSeekerProfileForm } from './components/JobSeekerProfileForm'
import { MyProfile } from './pages/MyProfile'
import { ForgotPassword } from './pages/ForgotPassword'
function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
       <Route
    path="/forgot-password"
    element={<ForgotPassword />}
/>
      <Route
        path="/employer/dashboard"
        element={
            <ProtectedRoute role="Employer">
                <EmployerDashboard/>
            </ProtectedRoute>
        }
        >

            <Route
                index
                element={<EmployerHome/>}
            />

            <Route
                path="jobs"
                element={<ManageJobs/>}
            />

            <Route
                path="applications"
                element={<ManageApplications/>}
            />
            <Route
            path="profile"
            element={<MyProfile />}
        />
           
           

      </Route>
      <Route
        path="/jobseeker/dashboard"
        element={
            <ProtectedRoute role="JobSeeker">
                <JobSeekerDashboard />
            </ProtectedRoute>
        }
    >
        <Route index element={<JobSeekerHome />} />

        <Route path="jobs" element={<BrowseJobs />} />

        <Route
            path="applications"
            element={<MyApplications />}
        />

        <Route
            path="resumes"
            element={<MyResumes />}
        />

        <Route
            path="notifications"
            element={<Notifications />}
        />
        <Route
            path="profile"
            element={<MyProfile />}
        />
        

    </Route>
    </Routes>

      
        
    </>
  );
}

export default App
