// We import the Navigate component from react-router-dom for routing
import { Navigate } from "react-router-dom";

// This Higher Order Component (HOC) protects routes that require authentication
const authRequired = (Component) => {
  // Create a new component that wraps the original component
  const AuthenticatedComponent = (props) => {
    // Check if there's a JWT token in localStorage
    const token = localStorage.getItem("jwt-token");
    
    // If no token is found, redirect to the login page
    if (!token) {
      return <Navigate to="/sign-in" replace />;
    }
    
    // If a token exists, render the protected component with its props
    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default authRequired;