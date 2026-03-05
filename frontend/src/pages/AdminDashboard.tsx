import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingBag, Users, BarChart3, Bell, Settings, Leaf,
  ShieldCheck, CheckCircle, XCircle, Eye, TrendingUp, DollarSign, AlertTriangle
} from 'lucide-react';
import { sellers, products, orders, adminStats } from '@/data/mockData';

type Tab = 'dashboard' | 'sellers' | 'products' | 'orders' | 'analytics';

const statusColors: Record<string, string> = {
  approved: 'bg-primary/10 text-primary',
  pending: 'bg-secondary-light text-secondary-foreground',
  rejected: 'bg-destructive/10 text-destructive',
  delivered: 'bg-primary/10 text-primary',
  shipped: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-accent text-accent-foreground',
  cancelled: 'bg-destructive/10 text-destructive',
};

const AdminDashboard = () => {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [sellerData, setSellerData] = useState(sellers);

  const stats = [
    { label: 'Total Users', value: adminStats.totalUsers.toLocaleString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Sellers', value: adminStats.totalSellers, icon: ShieldCheck, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Total Orders', value: adminStats.totalOrders.toLocaleString(), icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Revenue', value: `₹${(adminStats.totalRevenue / 100000).toFixed(1)}L`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Sellers', value: adminStats.pendingSellers, icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Active Products', value: adminStats.activeProducts.toLocaleString(), icon: Package, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: 'Waste Saved (kg)', value: adminStats.wasteSaved.toLocaleString(), icon: Leaf, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Avg Discount', value: `${adminStats.avgDiscount}%`, icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const nav = [
    { id: 'dashboard' as Tab, label: 'Overview', icon: LayoutDashboard },
    { id: 'sellers' as Tab, label: 'Sellers', icon: ShieldCheck },
    { id: 'products' as Tab, label: 'Products', icon: Package },
    { id: 'orders' as Tab, label: 'Orders', icon: ShoppingBag },
    { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart3 },
  ];

  const approveSeller = (id: string) => setSellerData(prev => prev.map(s => s.id === id ? { ...s, status: 'approved' as const } : s));
  const rejectSeller = (id: string) => setSellerData(prev => prev.map(s => s.id === id ? { ...s, status: 'rejected' as const } : s));

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
              <div className="text-xs text-sidebar-foreground/50">Admin Panel</div>
            </div>
          </Link>
        </div>

        <div className="p-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center font-bold text-white text-sm">SA</div>
            <div>
              <div className="font-medium text-sidebar-foreground text-sm">Super Admin</div>
              <div className="text-xs text-sidebar-foreground/50">admin@expireex.com</div>
            </div>
          </div>
        </div>

        <nav className="p-4 flex-1 space-y-1">
          {nav.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)} className={`sidebar-item w-full ${tab === id ? 'active' : ''}`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button className="sidebar-item w-full"><Settings className="w-4 h-4" /> Settings</button>
          <Link to="/" className="sidebar-item w-full mt-1 block text-center text-xs">← Back to Store</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                {tab === 'dashboard' && 'Admin Overview'}
                {tab === 'sellers' && 'Seller Management'}
                {tab === 'products' && 'Product Management'}
                {tab === 'orders' && 'Order Management'}
                {tab === 'analytics' && 'Platform Analytics'}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">ExpireEx Super Admin Panel</p>
            </div>
            {adminStats.pendingSellers > 0 && (
              <div className="flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl px-4 py-2 text-sm">
                <AlertTriangle className="w-4 h-4" />
                {adminStats.pendingSellers} sellers pending approval
              </div>
            )}
          </div>

          {/* Mobile nav */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 mb-6">
            {nav.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors ${tab === id ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                <Icon className="w-3.5 h-3.5" />{label}
              </button>
            ))}
          </div>

          {/* Overview */}
          {tab === 'dashboard' && (
            <div>
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

              {/* Pending Sellers */}
              <div className="bg-card rounded-2xl border border-border p-6 mb-6">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" /> Pending Seller Approvals
                </h3>
                <div className="space-y-3">
                  {sellerData.filter(s => s.status === 'pending').map(s => (
                    <div key={s.id} className="flex items-center justify-between p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">{s.avatar}</div>
                        <div>
                          <div className="font-medium text-foreground text-sm">{s.name}</div>
                          <div className="text-xs text-muted-foreground">{s.shopName} • {s.email}</div>
                          <div className="text-xs text-muted-foreground">Applied: {s.joinDate}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => approveSeller(s.id)} className="flex items-center gap-1 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button onClick={() => rejectSeller(s.id)} className="flex items-center gap-1 bg-destructive text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                  {sellerData.filter(s => s.status === 'pending').length === 0 && (
                    <p className="text-center text-muted-foreground py-6">✅ All seller requests have been reviewed!</p>
                  )}
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
                      {orders.map(o => (
                        <tr key={o.id}>
                          <td className="py-3 font-mono text-xs">{o.id}</td>
                          <td className="py-3">{o.customerName}</td>
                          <td className="py-3 font-semibold text-primary">₹{o.total}</td>
                          <td className="py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[o.status] || 'bg-muted text-muted-foreground'}`}>{o.status}</span></td>
                          <td className="py-3 text-muted-foreground">{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Sellers Tab */}
          {tab === 'sellers' && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr className="text-left text-muted-foreground">
                      <th className="px-6 py-4 font-medium">Seller</th>
                      <th className="px-6 py-4 font-medium">Shop</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Products</th>
                      <th className="px-6 py-4 font-medium">Revenue</th>
                      <th className="px-6 py-4 font-medium">Joined</th>
                      <th className="px-6 py-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {sellerData.map(s => (
                      <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">{s.avatar}</div>
                            <div>
                              <div className="font-medium text-foreground">{s.name}</div>
                              <div className="text-xs text-muted-foreground">{s.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium">{s.shopName}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[s.status] || 'bg-muted text-muted-foreground'}`}>{s.status}</span>
                        </td>
                        <td className="px-6 py-4">{s.products}</td>
                        <td className="px-6 py-4 font-semibold text-primary">₹{s.revenue.toLocaleString()}</td>
                        <td className="px-6 py-4 text-muted-foreground">{s.joinDate}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {s.status === 'pending' && (
                              <>
                                <button onClick={() => approveSeller(s.id)} className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-lg font-medium hover:opacity-90">Approve</button>
                                <button onClick={() => rejectSeller(s.id)} className="bg-destructive text-white text-xs px-2 py-1 rounded-lg font-medium hover:opacity-90">Reject</button>
                              </>
                            )}
                            <button className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-accent transition-colors">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {tab === 'products' && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr className="text-left text-muted-foreground">
                      <th className="px-6 py-4 font-medium">Product</th>
                      <th className="px-6 py-4 font-medium">Category</th>
                      <th className="px-6 py-4 font-medium">Seller</th>
                      <th className="px-6 py-4 font-medium">Price</th>
                      <th className="px-6 py-4 font-medium">Discount</th>
                      <th className="px-6 py-4 font-medium">Expiry</th>
                      <th className="px-6 py-4 font-medium">Stock</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="font-medium text-foreground max-w-32 truncate">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{p.category}</td>
                        <td className="px-6 py-4">{p.sellerName}</td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-primary">₹{p.discountPrice}</div>
                          <div className="text-xs text-muted-foreground line-through">₹{p.originalPrice}</div>
                        </td>
                        <td className="px-6 py-4"><span className={`badge-${p.urgency}`}>{p.discountPercent}%</span></td>
                        <td className="px-6 py-4 text-muted-foreground">{p.expiryDate}</td>
                        <td className="px-6 py-4">{p.stock}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.urgency === 'urgent' ? 'bg-destructive/10 text-destructive' : p.urgency === 'moderate' ? 'bg-secondary-light text-secondary-foreground' : 'bg-primary/10 text-primary'}`}>
                            {p.urgency}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {tab === 'orders' && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr className="text-left text-muted-foreground">
                      <th className="px-6 py-4 font-medium">Order ID</th>
                      <th className="px-6 py-4 font-medium">Customer</th>
                      <th className="px-6 py-4 font-medium">Items</th>
                      <th className="px-6 py-4 font-medium">Total</th>
                      <th className="px-6 py-4 font-medium">Payment</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Delivery</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders.map(o => (
                      <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs">{o.id}</td>
                        <td className="px-6 py-4 font-medium">{o.customerName}</td>
                        <td className="px-6 py-4 text-muted-foreground">{o.products.length} item(s)</td>
                        <td className="px-6 py-4 font-bold text-primary">₹{o.total}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${o.paymentStatus === 'paid' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>{o.paymentStatus}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[o.status] || 'bg-muted text-muted-foreground'}`}>{o.status}</span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{o.date}</td>
                        <td className="px-6 py-4 text-muted-foreground">{o.deliveryDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics */}
          {tab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Total Platform Revenue', value: `₹${(adminStats.totalRevenue / 100000).toFixed(1)}L`, icon: DollarSign, color: 'text-primary', bg: 'bg-primary/10', change: '+18% this month' },
                { label: 'Total Users', value: adminStats.totalUsers.toLocaleString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', change: '+340 this week' },
                { label: 'Product Waste Saved', value: `${adminStats.wasteSaved} kg`, icon: Leaf, color: 'text-green-600', bg: 'bg-green-50', change: '🌱 Environmental impact' },
                { label: 'Avg Discount Offered', value: `${adminStats.avgDiscount}%`, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50', change: 'Across all categories' },
              ].map(({ label, value, icon: Icon, color, bg, change }) => (
                <div key={label} className="stat-card flex items-center gap-5">
                  <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-7 h-7 ${color}`} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{label}</div>
                    <div className="text-2xl font-display font-bold text-foreground">{value}</div>
                    <div className="text-xs text-primary font-medium">{change}</div>
                  </div>
                </div>
              ))}

              <div className="md:col-span-2 bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Sales Distribution by Category</h3>
                <div className="space-y-4">
                  {[
                    { cat: '🥗 Food', pct: 35, val: '₹14.9L', color: 'bg-green-500' },
                    { cat: '💊 Medicine', pct: 28, val: '₹11.9L', color: 'bg-blue-500' },
                    { cat: '💄 Cosmetics', pct: 18, val: '₹7.7L', color: 'bg-pink-500' },
                    { cat: '🧃 Beverages', pct: 12, val: '₹5.1L', color: 'bg-orange-500' },
                    { cat: '🥛 Dairy', pct: 7, val: '₹3.0L', color: 'bg-yellow-500' },
                  ].map(({ cat, pct, val, color }) => (
                    <div key={cat}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-foreground">{cat}</span>
                        <span className="text-muted-foreground">{val} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className={`${color} h-2.5 rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Top Performing Sellers</h3>
                <div className="space-y-3">
                  {sellers.filter(s => s.status === 'approved').map((s, i) => (
                    <div key={s.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">#{i + 1}</div>
                      <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">{s.avatar}</div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground text-sm">{s.shopName}</div>
                        <div className="text-xs text-muted-foreground">{s.name} • {s.products} products</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary text-sm">₹{s.revenue.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Total Revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
