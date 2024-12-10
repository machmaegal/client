import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const { isLoading, isLoggedIn } = useContext(AuthContext);

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return <div>{children}</div>;
}

