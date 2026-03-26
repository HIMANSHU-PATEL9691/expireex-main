import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'customer' | 'seller'>('customer');
  const [showPass, setShowPass] = useState(false);

  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [shopType, setShopType] = useState('');
  const [licenseNo, setLicenseNo] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'warning' | 'error' | ''>('');

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
      shopName,
      ...(role === 'seller' && {
        phone,
        address,
        city,
        pincode,
        shopType,
        licenseNo,
        yearsExperience,
        businessDescription
      })
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
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("🔐 Token saved");

        // Check if there's a warning (seller not approved)
        if (data.warning) {
          setStatusMessage(data.warning);
          setMessageType('warning');
          console.log("⚠️ Warning:", data.warning);
          // Show warning but still redirect
          setTimeout(() => {
            if (data.user.role === "seller") {
              console.log("➡️ Redirecting to Seller Dashboard");
              navigate("/seller/dashboard");
            } else {
              console.log("➡️ Redirecting to Browse Page");
              navigate("/browse");
            }
          }, 2000);
        } else {
          if (data.user.role === "seller") {
            console.log("➡️ Redirecting to Seller Dashboard");
            navigate("/seller/dashboard");
          } else {
            console.log("➡️ Redirecting to Browse Page");
            navigate("/browse");
          }
        }

      } else {
        console.log("✅ Signup Success");
        setStatusMessage("Signup successful! Please login to continue.");
        setMessageType('success');
        localStorage.setItem("role", role);
        
        setTimeout(() => {
          setIsLogin(true);
        setStatusMessage('');
        setMessageType(''); 
        }, 2000);
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

          {/* STATUS MESSAGE */}
          {statusMessage && (
            <div className={`p-4 rounded-lg mb-6 flex items-start gap-3 ${
              messageType === 'warning' ? 'bg-orange-50 border border-orange-200' :
              messageType === 'success' ? 'bg-green-50 border border-green-200' :
              'bg-red-50 border border-red-200'
            }`}>
              <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                messageType === 'warning' ? 'text-orange-600' :
                messageType === 'success' ? 'text-green-600' :
                'text-red-600'
              }`} />
              <p className={`text-sm ${
                messageType === 'warning' ? 'text-orange-800' :
                messageType === 'success' ? 'text-green-800' :
                'text-red-800'
              }`}>
                {statusMessage}
              </p>
            </div>
          )}

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
              <>
                <input
                  className="input-field"
                  placeholder="Shop Name *"
                  value={shopName}
                  required
                  onChange={(e) => {
                    setShopName(e.target.value);
                    console.log("🏪 Shop Name:", e.target.value);
                  }}
                />
                <input
                  className="input-field"
                  placeholder="Phone Number *"
                  value={phone}
                  type="tel"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  className="input-field"
                  placeholder="Shop Address *"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    className="input-field"
                    placeholder="City *"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <input
                    className="input-field"
                    placeholder="Pincode *"
                    value={pincode}
                    type="number"
                    required
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
                <select 
                  className="input-field" 
                  value={shopType}
                  required
                  onChange={(e) => setShopType(e.target.value)}
                >
                  <option value="">Select Shop Type *</option>
                  <option value="grocery">Grocery</option>
                  <option value="pharmacy">Pharmacy</option>
                  <option value="dairy">Dairy</option>
                  <option value="bakery">Bakery</option>
                  <option value="cosmetics">Cosmetics</option>
                  <option value="other">Other</option>
                </select>
                <input
                  className="input-field"
                  placeholder="Business License No *"
                  value={licenseNo}
                  required
                  onChange={(e) => setLicenseNo(e.target.value)}
                />
                <input
                  className="input-field"
                  placeholder="Years in Business *"
                  value={yearsExperience}
                  type="number"
                  min="0"
                  required
                  onChange={(e) => setYearsExperience(e.target.value)}
                />
                <textarea
                  className="input-field"
                  placeholder="Business Description *"
                  value={businessDescription}
                  rows={3}
                  required
                  onChange={(e) => setBusinessDescription(e.target.value)}
                />
              </>
            )}

            <input
              className="input-field"
              type="email"
              placeholder="Email *"
              value={email}
              required={!isLogin}
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
            <Link to="/admin-login">Admin Login →</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Auth;