import {createContext, useContext, useState} from "react";
const AuthContext = createContext();
const initialUser = {
    token: "",
    email: "",
    role: "",
    userId: "",
    employerId: "",
    jobSeekerId: "",
    fullName: ""
};

export function AuthProvider({ children }) {

    const [user, setUser] = useState({
        ...initialUser,
    token: localStorage.getItem("token") || "",
    email: localStorage.getItem("email") || "",
    role: localStorage.getItem("role") || "",
    userId: localStorage.getItem("userId") || "",
    employerId: localStorage.getItem("employerId") || "",
    jobSeekerId: localStorage.getItem("jobSeekerId") || "",
    fullName: localStorage.getItem("fullName") || ""
});

    function login(loginResponse) {
        localStorage.setItem("token", loginResponse.token);
        localStorage.setItem("email", loginResponse.email);
        localStorage.setItem("role", loginResponse.role);
        localStorage.setItem("userId", loginResponse.userId);
        localStorage.setItem("fullName", loginResponse.fullName);
        
        if(loginResponse.employerId){
        localStorage.setItem("employerId", loginResponse.employerId);
        }else{
            localStorage.removeItem("employerId");
        }
        if(loginResponse.jobSeekerId){
            localStorage.setItem("jobSeekerId", loginResponse.jobSeekerId);
        }else{
            localStorage.removeItem("jobSeekerId");
        }
        setUser({
            ...initialUser,
            token: loginResponse.token,
            email: loginResponse.email,
            role: loginResponse.role,
            userId: loginResponse.userId,
            employerId: loginResponse.employerId,
            jobSeekerId: loginResponse.jobSeekerId,
            fullName: loginResponse.fullName
        });
    }

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("employerId");
        localStorage.removeItem("jobSeekerId");
        localStorage.removeItem("fullName");

        setUser(initialUser);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}