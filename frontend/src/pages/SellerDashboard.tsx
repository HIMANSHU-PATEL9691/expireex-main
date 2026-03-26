import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingBag, BarChart3, Bell, Settings, Leaf,
  Plus, Edit, Trash2, AlertTriangle, TrendingUp, DollarSign, Users, Eye, LogOut, Archive
} from 'lucide-react';
import { Product, Category } from '@/data/mockData';
import SellerProtected from '@/components/SellerProtected';

type Tab = 'dashboard' | 'products' | 'expired' | 'orders' | 'analytics' | 'notifications';

interface SellerData {
  seller: {
    name: string;
    email: string;
    shopName: string;
    sellerId: string;
    status: string;
    profile: {
      phone: string;
      address: string;
      city: string;
      pincode: string;
      shopType: string;
      licenseNo: string;
      yearsExperience: number;
      businessDescription: string;
    };
  };
  stats: {
    totalProducts: number;
    activeOrders: number;
    monthlyRevenue: number;
    expiringAlerts: number;
    totalRevenue?: number;
    totalCustomers?: number;
  };
}

const SellerDashboardContent = () => {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [sellerData, setSellerData] = useState<SellerData | null>(null);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [sellerOrders, setSellerOrders] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, '_id' | 'id' | 'sellerId' | 'sellerName' | 'discountPercent' | 'urgency' | 'daysLeft' | 'rating' | 'reviews'>>({
    name: '',
    description: '',
    category: 'Food' as Category,
    expiryDate: '',
    originalPrice: 0,
    discountPrice: 0,
    image: '',
    stock: 0
  });

  useEffect(() => {
    fetchSellerData();
  }, []);

  useEffect(() => {
    if (sellerData?.seller.status === 'approved') {
      fetchSellerProducts();
      fetchSellerOrders();
    }
  }, [sellerData]);

  const fetchSellerProducts = async () => {
    if (sellerData?.seller.status !== 'approved') return;

    setLoadingProducts(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/seller/products', {
        headers: {
          Authorization: token || '',
        },
      });
      if (res.ok) {
        const data = await res.json();
        setSellerProducts(data);
      }
    } catch (err) {
      console.error('Error fetching seller products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchSellerOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/seller/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setSellerOrders(data);
      }
    } catch (err) {
      console.error('Error fetching seller orders:', err);
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingProductId 
        ? `http://localhost:5000/api/seller/products/${editingProductId}`
        : 'http://localhost:5000/api/seller/products';
      const method = editingProductId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token || '',
        },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        const data = await res.json();
        if (editingProductId) {
          setSellerProducts(sellerProducts.map(p => p._id === editingProductId ? data : p));
        } else {
          setSellerProducts([data, ...sellerProducts]);
        }
        closeModal();
      } else {
        const errData = await res.json().catch(() => null);
        alert(errData?.error || errData?.msg || `Failed to ${editingProductId ? 'update' : 'add'} product`);
      }
    } catch (err) {
      console.error('Error saving product:', err);
      alert('An error occurred while saving the product.');
    }
  };

  const closeModal = () => {
    setShowAddProduct(false);
    setEditingProductId(null);
    setNewProduct({
      name: '',
      description: '',
      category: 'Food' as const,
      expiryDate: '',
      originalPrice: 0,
      discountPrice: 0,
      image: '',
      stock: 0
    });
  };

  const openAddModal = () => {
    closeModal();
    setShowAddProduct(true);
  };

  const handleEditClick = (product: Product) => {
    setNewProduct({
      name: product.name,
      description: product.description,
      category: product.category,
      expiryDate: product.expiryDate ? product.expiryDate.substring(0, 10) : '',
      originalPrice: product.originalPrice,
      discountPrice: product.discountPrice,
      image: product.image,
      stock: product.stock
    });
    setEditingProductId(product._id || product.id);
    setShowAddProduct(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/seller/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token || '',
        },
      });
      if (res.ok) {
        setSellerProducts(sellerProducts.filter(p => p._id !== id));
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const fetchSellerData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('http://localhost:5000/api/auth/seller-dashboard', {
        headers: {
          Authorization: token,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setSellerData(data);
        console.log('✅ Seller data loaded:', data);
      } else {
        console.log('❌ Failed to fetch seller data');
      }
    } catch (err) {
      console.error('🔥 Error fetching seller data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/auth';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-primary animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!sellerData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Failed to load seller data</p>
        </div>
      </div>
    );
  }

  const seller = sellerData.seller;
  const dashboardStats = sellerData.stats;

  const activeSellerProducts = sellerProducts.filter(p => new Date(p.expiryDate) > new Date());
  const expiredSellerProducts = sellerProducts.filter(p => new Date(p.expiryDate) <= new Date());
  const initials = seller.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const stats = [
    { label: 'Total Products', value: dashboardStats.totalProducts, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Orders', value: dashboardStats.activeOrders, icon: ShoppingBag, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Monthly Revenue', value: `₹${dashboardStats.monthlyRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Expiry Alerts', value: dashboardStats.expiringAlerts, icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const nav = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products' as Tab, label: 'My Products', icon: Package },
    { id: 'expired' as Tab, label: 'Expired Items', icon: Archive },
    { id: 'orders' as Tab, label: 'Orders', icon: ShoppingBag },
    { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart3 },
    { id: 'notifications' as Tab, label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col" style={{ background: 'hsl(var(--sidebar-background))' }}>
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sidebar-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-sidebar-foreground text-sm">ExpireEx</div>
              <div className="text-xs text-sidebar-foreground/50">Seller Portal</div>
            </div>
          </Link>
        </div>

        {/* Enhanced Seller Profile */}
        <div className="p-5 border-b border-sidebar-border space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sidebar-primary/20 flex items-center justify-center font-bold text-sidebar-primary text-sm">{initials}</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sidebar-foreground text-sm truncate">{seller.name}</div>
              <div className="text-xs text-sidebar-foreground/50 truncate">{seller.shopName}</div>
            </div>
          </div>
          
          {/* Profile Details */}
          {seller.profile && (
            <div className="space-y-1">
              <div className="text-xs text-sidebar-foreground/70 flex items-center gap-1">
                📍 {seller.profile.address}, {seller.profile.city} - {seller.profile.pincode}
              </div>
              <div className="text-xs text-sidebar-foreground/70 flex items-center gap-1">
                📱 {seller.profile.phone}
              </div>
              <div className="text-xs text-sidebar-foreground/70">
                {seller.profile.shopType?.charAt(0).toUpperCase() + seller.profile.shopType?.slice(1)} Shop • {seller.profile.yearsExperience}+ yrs
              </div>
            </div>
          )}
          
          {/* Status Badge */}
          {seller.status === 'pending' && (
            <div className="px-2 py-1 rounded-lg bg-orange-100 text-orange-800 text-xs font-medium text-center">
              ⏳ Awaiting Approval
            </div>
          )}
          {seller.status === 'approved' && (
            <div className="px-2 py-1 rounded-lg bg-green-100 text-green-800 text-xs font-medium text-center">
              ✅ Approved
            </div>
          )}
        </div>

        <nav className="p-4 flex-1 space-y-1">
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`sidebar-item w-full ${tab === id ? 'active' : ''}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button className="sidebar-item w-full"><Settings className="w-4 h-4" /> Settings</button>
          <button onClick={handleLogout} className="sidebar-item w-full mt-1 text-red-600 hover:bg-red-50">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                {tab === 'dashboard' && 'Seller Dashboard'}
                {tab === 'products' && 'My Products'}
                {tab === 'expired' && 'Expired Items'}
                {tab === 'orders' && 'Orders'}
                {tab === 'analytics' && 'Analytics'}
                {tab === 'notifications' && 'Notifications'}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">Welcome back, {seller.name}! 👋</p>
            </div>
            {tab === 'products' && (
              <button className="btn-primary flex items-center gap-2 text-sm" onClick={openAddModal}>
                <Plus className="w-4 h-4" /> Add Product
              </button>
            )}
          </div>

          {/* Status Banner */}
          {seller.status === 'pending' && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900 mb-1">⏳ Approval Pending</h3>
                <p className="text-sm text-orange-800">Your seller account is pending admin approval. Once approved, you'll be able to receive orders and process payments. You can continue setting up your products meanwhile.</p>
              </div>
            </div>
          )}

          {seller.status === 'rejected' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-1">❌ Account Rejected</h3>
                <p className="text-sm text-red-800">Your seller account application has been rejected. Please contact support for more information.</p>
              </div>
            </div>
          )}

          {/* Mobile nav */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 mb-6">
            {nav.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors ${tab === id ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                <Icon className="w-3.5 h-3.5" />{label}
              </button>
            ))}
          </div>

          {/* Dashboard Tab */}
          {tab === 'dashboard' && (
            <div>
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map(({ label, value, icon: Icon, color, bg }) => (
                  <div key={label} className="stat-card">
                    <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div className="text-2xl font-display font-bold text-foreground">{value}</div>
                    <div className="text-sm text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>

              {/* Expiry Alerts */}
              <div className="bg-card rounded-2xl border border-border p-6 mb-6">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" /> Expiry Alerts
                </h3>
                <div className="space-y-3">
                  {activeSellerProducts.filter(p => p.urgency === 'urgent').slice(0, 3).map(p => (
                    <div key={p._id || p.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <div className="text-sm font-medium text-foreground">{p.name}</div>
                          <div className="text-xs text-orange-500 font-medium">⚠️ Expires in {p.daysLeft} days</div>
                        </div>
                      </div>
                      <span className="badge-urgent">{p.discountPercent}% OFF</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b border-border">
                        <th className="pb-3 font-medium">Order ID</th>
                        <th className="pb-3 font-medium">Customer</th>
                        <th className="pb-3 font-medium">Total</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {sellerOrders.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-muted-foreground">No recent orders</td>
                        </tr>
                      ) : (
                      sellerOrders.slice(0, 5).map(o => (
                        <tr key={o.id}>
                          <td className="py-3 font-mono text-xs">{o.id}</td>
                          <td className="py-3">{o.customerName}</td>
                          <td className="py-3 font-semibold text-primary">₹{o.total}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              o.status === 'delivered' ? 'bg-primary/10 text-primary' :
                              o.status === 'shipped' ? 'bg-blue-50 text-blue-700' :
                              o.status === 'confirmed' ? 'bg-secondary-light text-secondary-foreground' :
                              'bg-muted text-muted-foreground'
                            }`}>{o.status}</span>
                          </td>
                          <td className="py-3 text-muted-foreground">{o.date}</td>
                        </tr>
                      )))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
{tab === 'products' && (
            <div>
              {seller.status !== 'approved' ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Products Management Locked</h3>
                  <p className="text-muted-foreground mb-6">Your seller account is pending approval. You&apos;ll be able to manage products once approved.</p>
                </div>
              ) : loadingProducts ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
                      <div className="h-36 bg-muted rounded-t-xl"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                        <div className="flex justify-between">
                          <div className="h-4 bg-muted rounded w-16"></div>
                          <div className="flex gap-2">
                            <div className="w-8 h-8 bg-muted rounded-lg"></div>
                            <div className="w-8 h-8 bg-muted rounded-lg"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {activeSellerProducts.length === 0 ? (
                      <div className="col-span-full text-center py-12">
                        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2 text-foreground">No active products</h3>
                        <p className="text-muted-foreground mb-6">Get started by adding your first near-expiry product.</p>
                      </div>
                    ) : (
                      activeSellerProducts.map((p: Product) => (
                        <div key={p._id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all">
                          <div className="relative h-36">
                            <img src={p.image || '/placeholder.svg'} alt={p.name} className="w-full h-full object-cover" />
                            <span className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold badge-${p.urgency || 'safe'}`}>
                              {p.discountPercent}% OFF
                            </span>
                            {p.stock === 0 && (
                              <div className="absolute top-2 right-2 badge-destructive text-white text-xs px-2 py-1 rounded-full">
                                Out of Stock
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-foreground text-sm line-clamp-1 mb-1">{p.name}</h3>
                            <p className="text-xs text-muted-foreground mb-2">
                              Expires in <span className="font-semibold">{p.daysLeft || 0}</span> days • Stock: <span className="font-semibold">{p.stock}</span>
                            </p>
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <span className="text-lg font-bold text-primary">₹{p.discountPrice}</span>
                                <span className="text-xs text-muted-foreground line-through ml-1">₹{p.originalPrice}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleEditClick(p)} className="flex-1 h-9 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium">
                                Edit
                              </button>
                              <button onClick={() => handleDeleteProduct(p._id)} className="w-9 h-9 rounded-lg bg-destructive/10 hover:bg-destructive text-destructive hover:text-white transition-colors flex items-center justify-center">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Expired Items Tab */}
          {tab === 'expired' && (
            <div>
              <div className="mb-6 bg-card border border-border rounded-xl p-4">
                <p className="text-muted-foreground text-sm flex items-center gap-2"><Archive className="w-4 h-4"/> These products have passed their expiry date and are automatically hidden from the public store.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {expiredSellerProducts.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Archive className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2 text-foreground">No expired items</h3>
                    <p className="text-muted-foreground mb-6">Great job keeping your inventory fresh!</p>
                  </div>
                ) : (
                  expiredSellerProducts.map((p: Product) => (
                    <div key={p._id} className="bg-card rounded-2xl border border-destructive/30 overflow-hidden opacity-80 hover:opacity-100 transition-all shadow-sm">
                      <div className="relative h-36 grayscale">
                        <img src={p.image || '/placeholder.svg'} alt={p.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-destructive text-white font-bold px-3 py-1 rounded-full text-xs tracking-wider">EXPIRED</span>
                        </div>
                      </div>
                      <div className="p-4 bg-muted/30">
                        <h3 className="font-medium text-foreground text-sm line-clamp-1 mb-1">{p.name}</h3>
                        <p className="text-xs text-destructive font-semibold mb-4">
                          Expired on: {new Date(p.expiryDate).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <button onClick={() => handleDeleteProduct(p._id)} className="w-full h-9 rounded-lg bg-destructive hover:bg-destructive/90 text-white transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                            <Trash2 className="w-4 h-4" /> Delete Product
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {tab === 'orders' && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b border-border">
                      <th className="pb-3 font-medium">Order ID</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Products</th>
                      <th className="pb-3 font-medium">Total</th>
                      <th className="pb-3 font-medium">Payment</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {sellerOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-muted-foreground">You don't have any orders yet.</td>
                      </tr>
                    ) : sellerOrders.map(o => (
                      <tr key={o.id}>
                        <td className="py-4 font-mono text-xs">{o.id}</td>
                        <td className="py-4 font-medium">{o.customerName}</td>
                        <td className="py-4 text-muted-foreground text-xs">{o.products.length} item(s)</td>
                        <td className="py-4 font-bold text-primary">₹{o.total}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${o.paymentStatus?.toLowerCase() === 'paid' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                            {o.paymentStatus}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            o.status === 'delivered' ? 'bg-primary/10 text-primary' :
                            o.status === 'shipped' ? 'bg-blue-50 text-blue-700' :
                            o.status === 'confirmed' ? 'bg-secondary-light text-secondary-foreground' :
                            'bg-muted text-muted-foreground'
                          }`}>{o.status}</span>
                        </td>
                        <td className="py-4">
                          <button className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {tab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Total Revenue', value: `₹${(dashboardStats.totalRevenue || 0).toLocaleString()}`, change: '+12%', icon: DollarSign, color: 'text-primary', bg: 'bg-primary/10' },
                { label: 'Total Customers', value: dashboardStats.totalCustomers || 0, change: '+8%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Monthly Revenue', value: `₹${(dashboardStats.monthlyRevenue || 0).toLocaleString()}`, change: '+24%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Products Listed', value: dashboardStats.totalProducts || 0, change: '+5', icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map(({ label, value, change, icon: Icon, color, bg }) => (
                <div key={label} className="stat-card flex items-center gap-5">
                  <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-7 h-7 ${color}`} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{label}</div>
                    <div className="text-2xl font-display font-bold text-foreground">{value}</div>
                    <div className="text-xs text-primary font-medium">↑ {change} this month</div>
                  </div>
                </div>
              ))}

              <div className="md:col-span-2 bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Sales by Category</h3>
                <div className="space-y-4">
                  {[
                    { cat: '🥗 Food', pct: 42, val: '₹54,000' },
                    { cat: '🧃 Beverages', pct: 28, val: '₹36,000' },
                    { cat: '🥛 Dairy', pct: 20, val: '₹25,800' },
                    { cat: '🍿 Snacks', pct: 10, val: '₹12,700' },
                  ].map(({ cat, pct, val }) => (
                    <div key={cat}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-foreground">{cat}</span>
                        <span className="text-muted-foreground">{val} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {tab === 'notifications' && (
            <div className="space-y-3">
              {[
                { type: 'info', msg: 'Welcome to your seller dashboard! Update your products to start selling.', time: 'Just now' },
              ].map((n, i) => (
                <div key={i} className={`bg-card rounded-2xl border p-4 flex items-start gap-4 ${n.type === 'alert' ? 'border-orange-200 bg-orange-50/30' : n.type === 'order' ? 'border-primary/20 bg-primary/5' : 'border-border'}`}>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{n.msg}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Product Modal */}
{showAddProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-card rounded-3xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="font-display font-bold text-xl text-foreground mb-6">{editingProductId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmitProduct} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Product Name *</label>
                <input
                  required
                  className="input-field"
                  placeholder="e.g. Organic Yogurt 500g"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Description *</label>
                <textarea
                  required
                  className="input-field min-h-[80px]"
                  placeholder="Describe your product..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Category *</label>
                  <select 
                    required
                    className="input-field"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value as any})}
                  >
                    <option value="Food">Food</option>
                    <option value="Cosmetics">Cosmetics</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Snacks">Snacks</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Expiry Date *</label>
                  <input
                    required
                    type="date"
                    className="input-field"
                    value={newProduct.expiryDate}
                    onChange={(e) => setNewProduct({...newProduct, expiryDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Original Price (₹) *</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    className="input-field"
                    placeholder="500"
                    value={newProduct.originalPrice}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      setNewProduct({...newProduct, originalPrice: value});
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Discount Price (₹) *</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    className="input-field"
                    placeholder="250"
                    value={newProduct.discountPrice}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      setNewProduct({...newProduct, discountPrice: value});
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Stock Qty *</label>
                  <input
                    required
                    type="number"
                    className="input-field"
                    placeholder="25"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Image URL *</label>
                  <input
                    required
                    className="input-field"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  />
                </div>
              </div>
              <div className="bg-accent rounded-xl p-3 text-sm text-accent-foreground">
                <strong>💡 Tip:</strong> Backend auto-calculates discount % and urgency. Use unsplash or placeholder images for testing.
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" className="flex-1 btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="flex-1 btn-primary">{editingProductId ? 'Update Product' : 'Add Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const SellerDashboard = () => {
  return (
    <SellerProtected>
      <SellerDashboardContent />
    </SellerProtected>
  );
};

export default SellerDashboard;
