import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Leaf, Eye, EyeOff, ArrowRight } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("📩 Admin Login Attempt");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const res = await fetch("http://localhost:5000/api/auth/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      console.log("📡 Response Status:", res.status);

      const data = await res.json();

      console.log("📦 Response Data:", data);

      if (!res.ok) {
        console.log("❌ Login Failed");
        alert(data.msg || "Invalid credentials");
        return;
      }

      console.log("✅ Admin Login Success");

      // Save admin session
      localStorage.setItem("admin", "true");

      console.log("🔐 Admin stored in localStorage");

      // Redirect
      navigate("/admin/dashboard");

    } catch (err) {
      console.error("🔥 Server Error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex bg-background">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient flex-col justify-center px-16 text-white">
        <Link to="/" className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold">ExpireEx</span>
        </Link>

        <h2 className="text-4xl font-bold mb-6">
          Admin Control Panel ⚙️
        </h2>

        <p className="text-white/80 text-lg">
          Manage sellers, products and platform analytics.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center px-6">

        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-sm"
        >

          {/* LOGO */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Admin Login</span>
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm mb-1 block">Email</label>
            <input
              className="input-field w-full"
              placeholder="admin@expireex.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                console.log("✏️ Email changed:", e.target.value);
              }}
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4 relative">
            <label className="text-sm mb-1 block">Password</label>

            <input
              className="input-field w-full pr-10"
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                console.log("🔑 Password typing...");
              }}
            />

            <button
              type="button"
              className="absolute right-3 top-9"
              onClick={() => {
                setShowPass(!showPass);
                console.log("👁 Toggle Password View:", !showPass);
              }}
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* BUTTON */}
          <button
            className="w-full btn-primary flex items-center justify-center gap-2 mt-2"
            onClick={() => console.log("🚀 Login Button Clicked")}
          >
            Login as Admin
            <ArrowRight size={18} />
          </button>

          {/* BACK */}
          <p className="text-center text-sm mt-5 text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              ← Back to Home
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;