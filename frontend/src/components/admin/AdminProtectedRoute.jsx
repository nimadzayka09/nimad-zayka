import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loader2 } from "lucide-react";

export const AdminProtectedRoute = ({ children }) => {
    const { admin, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div
                data-testid="admin-loading"
                className="min-h-screen grid place-items-center bg-brand-black text-brand-parchment"
            >
                <Loader2 className="h-6 w-6 animate-spin text-brand-turmeric" />
            </div>
        );
    }
    if (!admin) {
        return (
            <Navigate
                to="/admin/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }
    return children;
};

export default AdminProtectedRoute;
