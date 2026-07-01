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
function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/employer/dashboard" element={
        <ProtectedRoute role="Employer">
          <EmployerDashboard/>
        </ProtectedRoute>
      } />
      <Route path="/jobseeker/dashboard" element={
        <ProtectedRoute role="JobSeeker">
          <JobSeekerDashboard/>
        </ProtectedRoute>
      } />
    </Routes>

      
        
    </>
  );
}

export default App
