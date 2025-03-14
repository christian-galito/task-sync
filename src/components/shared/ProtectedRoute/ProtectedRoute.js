import { Navigate } from "react-router-dom";
import { useAuth } from "../../../config/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
