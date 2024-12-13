import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { Navigate } from "react-router-dom";

export const ProtectedAdminRoute = ({ children }) => {
    const { isLoading, isLoggedIn, isAdmin } = useContext(AuthContext);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (!isAdmin) {
        return <Navigate to="/user" />;
    }

    return <>{children}</>;
};