import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'customer' | 'seller'>('customer');
  const [showPass, setShowPass] = useState(false);

  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🚀 Form Submit Triggered");
    console.log("Mode:", isLogin ? "LOGIN" : "SIGNUP");
    console.log("Role:", role);

    const payload = {
      name,
      email,
      password,
      role,
      shopName
    };

    console.log("📤 Payload:", payload);

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/signup";

    console.log("🌐 API URL:", url);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      console.log("📡 Response Status:", res.status);

      const data = await res.json();

      console.log("📦 Response Data:", data);

      if (!res.ok) {
        console.log("❌ Error:", data);
        alert(data.msg || data.error || "Something went wrong");
        return;
      }

      if (isLogin) {
        console.log("✅ Login Success");

        localStorage.setItem("token", data.token);
        console.log("🔐 Token saved");

        if (data.user.role === "seller") {
          console.log("➡️ Redirecting to Seller Dashboard");
          navigate("/seller/dashboard");
        } else {
          console.log("➡️ Redirecting to Browse Page");
          navigate("/browse");
        }

      } else {
        console.log("✅ Signup Success");
        alert("Signup successful");
        setIsLogin(true);
      }

    } catch (err) {
      console.error("🔥 Server Error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient flex-col justify-center px-16 text-white">
        <Link to="/" className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="font-display text-2xl font-bold">ExpireEx</span>
        </Link>

        <h2 className="text-4xl font-display font-bold mb-6 leading-tight">
          Save Money.<br />Reduce Waste.<br />Shop Smart. 🌱
        </h2>

        <p className="text-white/80 text-lg mb-8">
          Join thousands of conscious shoppers and sellers.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* LOGO MOBILE */}
          <Link to="/" className="flex items-center gap-2 justify-center mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-gradient">ExpireEx</span>
          </Link>

          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>

          <p className="text-muted-foreground mb-6">
            {isLogin ? 'Login to continue' : 'Create your account'}
          </p>

          {/* ROLE TOGGLE */}
          {!isLogin && (
            <div className="flex rounded-xl border p-1 mb-6 bg-muted">
              {['customer', 'seller'].map(r => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r as any);
                    console.log("👤 Role Selected:", r);
                  }}
                  className={`flex-1 py-2 rounded-lg text-sm ${
                    role === r ? 'bg-white shadow' : ''
                  }`}
                >
                  {r === 'customer' ? '🛒 Customer' : '🏪 Seller'}
                </button>
              ))}
            </div>
          )}

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSubmit}>

            {!isLogin && (
              <input
                className="input-field"
                placeholder="Full Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  console.log("✏️ Name:", e.target.value);
                }}
              />
            )}

            {!isLogin && role === 'seller' && (
              <input
                className="input-field"
                placeholder="Shop Name"
                value={shopName}
                onChange={(e) => {
                  setShopName(e.target.value);
                  console.log("🏪 Shop Name:", e.target.value);
                }}
              />
            )}

            <input
              className="input-field"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                console.log("📧 Email:", e.target.value);
              }}
            />

            <div className="relative">
              <input
                className="input-field pr-10"
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log("🔑 Password typing...");
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => {
                  setShowPass(!showPass);
                  console.log("👁 Toggle Password:", !showPass);
                }}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              className="w-full btn-primary flex items-center justify-center gap-2"
              onClick={() => console.log("🟢 Submit Button Clicked")}
            >
              {isLogin ? 'Login' : 'Signup'}
              <ArrowRight size={18} />
            </button>

          </form>

          <p className="text-center mt-6">
            {isLogin ? "Don't have account?" : "Already have account?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                console.log("🔄 Toggle Mode:", !isLogin ? "LOGIN" : "SIGNUP");
              }}
              className="text-primary ml-2"
            >
              {isLogin ? 'Signup' : 'Login'}
            </button>
          </p>

          <p className="text-center mt-4 text-sm">
            <Link to="/admin">Admin Login →</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Auth;