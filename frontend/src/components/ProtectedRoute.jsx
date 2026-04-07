import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem("adminToken") === "zencode_authenticated";

    if (!isAuthenticated) {
        return <Navigate to="/platform" replace />;
    }

    useEffect(() => {
        return () => {
            console.log("Cleaning up session...");
            sessionStorage.removeItem("adminToken");
        };
    }, []);

    return children;
};

export default ProtectedRoute;