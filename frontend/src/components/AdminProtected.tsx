import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }: any) => {
  const isAdmin = localStorage.getItem("admin");

  if (!isAdmin) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default AdminProtected;