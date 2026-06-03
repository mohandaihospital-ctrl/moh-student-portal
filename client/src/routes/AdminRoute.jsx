import { useContext } from "react";

import { Navigate } from "react-router-dom";

import { AuthContext } from "@/context/AuthContext";
import PageLoader from "@/common/PageLoader";


const AdminRoute = ({ children }) => {
  const { user, loading } =
    useContext(AuthContext);

  if (loading) {
return (
    <PageLoader
      text="Loading dashboard..."
    />
  );
}
 

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;