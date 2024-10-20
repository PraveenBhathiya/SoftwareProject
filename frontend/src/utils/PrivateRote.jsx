import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  // If authenticated, render the protected component
  return children;
};

export default PrivateRoute;
