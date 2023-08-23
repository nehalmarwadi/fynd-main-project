/* eslint-disable react/prop-types */
import {  Navigate } from "react-router-dom";
import { useAuth } from "../Contexts";

export function PrivateRoute({ children }) {
    const { authState } = useAuth();
    return authState.isUserLoggedIn ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" />
    );
}
