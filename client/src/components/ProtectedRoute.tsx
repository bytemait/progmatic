import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./Store"; 

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const user = useSelector((state: RootState) => state.user.details);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  // Check if the user is logged in and has admin privileges
  return isLoggedIn && user?.site_admin ? element : <Navigate to="/404" />;
};

export default ProtectedRoute;
