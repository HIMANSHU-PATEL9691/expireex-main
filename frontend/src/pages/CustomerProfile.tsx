import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, Settings, LogOut, Package } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

const CustomerProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>('profile');
  const [userData, setUserData] = useState<any>(null);
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    
    if (role !== 'customer' || !token) {
      navigate('/auth');
      return;
    }

    const fetchCustomerData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/customer-dashboard', {
          headers: { Authorization: token }
        });
        if (res.ok) {
          const data = await res.json();
          setUserData(data.customer);
          localStorage.setItem('user', JSON.stringify(data.customer));
        } else {
          setUserData(JSON.parse(localStorage.getItem('user') || '{}'));
        }
      } catch (err) {
        setUserData(JSON.parse(localStorage.getItem('user') || '{}'));
      }
    };
    fetchCustomerData();
    setWishlist(JSON.parse(localStorage.getItem('wishlist') || '[]'));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!userData) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-card rounded-2xl border border-border p-6 mb-6 text-center">
            <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              {userData.name?.charAt(0).toUpperCase() || 'C'}
            </div>
            <h2 className="font-display font-bold text-foreground">{userData.name}</h2>
            <p className="text-sm text-muted-foreground">{userData.email}</p>
            <p className="text-xs text-primary font-medium mt-2 bg-primary/10 inline-block px-2 py-1 rounded-full">
              ID: {userData.customerId || 'CUST-XXXXXX'}
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-3 space-y-1">
            <button 
              onClick={() => setActiveTab('profile')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-foreground'}`}
            >
              <User className="w-4 h-4" /> My Profile
            </button>
            <button 
              onClick={() => setActiveTab('orders')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-foreground'}`}
            >
              <ShoppingBag className="w-4 h-4" /> Order History
            </button>
            <button 
              onClick={() => setActiveTab('wishlist')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'wishlist' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-foreground'}`}
            >
              <Heart className="w-4 h-4" /> Wishlist
            </button>
            <button 
              onClick={handleLogout} 
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors mt-4"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-card rounded-2xl border border-border p-6 sm:p-8">
          {activeTab === 'profile' && (
            <div>
              <h3 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" /> Account Settings
              </h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                  <input type="text" className="input-field opacity-70" defaultValue={userData.name} readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                  <input type="email" className="input-field opacity-70" defaultValue={userData.email} readOnly />
                </div>
                <p className="text-xs text-muted-foreground mt-4">Contact support to change your email address or password.</p>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
              <button onClick={() => navigate('/browse')} className="btn-primary">Browse Products</button>
            </div>
          )}

          {activeTab === 'wishlist' && (
            wishlist.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground mb-6">Save items you love by clicking the heart icon.</p>
                <button onClick={() => navigate('/browse')} className="btn-primary">Browse Products</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {wishlist.map(p => <ProductCard key={p._id || p.id} product={p} />)}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;