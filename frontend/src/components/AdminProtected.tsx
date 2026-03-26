import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AdminProtected = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/admin-stats", {
          headers: { Authorization: token }
        });

        if (res.ok) {
          console.log("✅ Admin verified");
          setIsAdmin(true);
        } else {
          console.log("❌ Admin check failed:", res.status);
          localStorage.removeItem("adminToken");
          localStorage.removeItem("admin");
        }
      } catch (err) {
        console.error("❌ Admin check error:", err);
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-primary animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default AdminProtected;
