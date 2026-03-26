import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SellerProtected = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const checkSeller = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("❌ No token found");
        setIsLoading(false);
        return;
      }

      try {
        console.log("🔍 Checking seller status...");
        const res = await fetch("http://localhost:5000/api/auth/get-seller", {
          headers: {
            Authorization: token,
          },
        });

        console.log("📡 Seller check response:", res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.log("❌ Seller check failed:", res.status, errorText);
          setIsSeller(false);
          setIsLoading(false);
          return;
        }

        const data = await res.json();
        console.log("✅ Seller verified:", data.seller?.name, "- Status:", data.seller?.status);
        setIsSeller(true);
      } catch (err) {
        console.error("❌ Error checking seller:", err);
        setIsSeller(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSeller();
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

  if (!isSeller) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default SellerProtected;
