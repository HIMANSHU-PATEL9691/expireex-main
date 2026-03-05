import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingBag, BarChart3, Bell, Settings, Leaf,
  Plus, Edit, Trash2, AlertTriangle, TrendingUp, DollarSign, Users, Eye
} from 'lucide-react';
import { products, orders, sellerStats } from '@/data/mockData';

type Tab = 'dashboard' | 'products' | 'orders' | 'analytics' | 'notifications';

const SellerDashboard = () => {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [showAddProduct, setShowAddProduct] = useState(false);

  const stats = [
    { label: 'Total Products', value: sellerStats.totalProducts, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Orders', value: sellerStats.activeOrders, icon: ShoppingBag, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Monthly Revenue', value: `₹${sellerStats.monthlyRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Expiry Alerts', value: sellerStats.expiringAlerts, icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const nav = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products' as Tab, label: 'My Products', icon: Package },
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

        {/* Seller info */}
        <div className="p-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sidebar-primary/20 flex items-center justify-center font-bold text-sidebar-primary text-sm">RK</div>
            <div>
              <div className="font-medium text-sidebar-foreground text-sm">Rajesh Kumar</div>
              <div className="text-xs text-sidebar-foreground/50">FreshMart</div>
            </div>
          </div>
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
          <Link to="/" className="sidebar-item w-full mt-1 block text-center">← Back to Store</Link>
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
                {tab === 'orders' && 'Orders'}
                {tab === 'analytics' && 'Analytics'}
                {tab === 'notifications' && 'Notifications'}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">Welcome back, Rajesh! 👋</p>
            </div>
            {tab === 'products' && (
              <button className="btn-primary flex items-center gap-2 text-sm" onClick={() => setShowAddProduct(true)}>
                <Plus className="w-4 h-4" /> Add Product
              </button>
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
                  {products.filter(p => p.urgency === 'urgent').slice(0, 3).map(p => (
                    <div key={p.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
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
                      {orders.map(o => (
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
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {tab === 'products' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {products.map(p => (
                  <div key={p.id} className="bg-card rounded-2xl border border-border overflow-hidden">
                    <div className="relative h-36">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      <span className={`absolute top-2 left-2 badge-${p.urgency}`}>{p.discountPercent}% OFF</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-foreground text-sm line-clamp-1 mb-1">{p.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">Expires: {p.expiryDate} • Stock: {p.stock}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-primary">₹{p.discountPrice}</span>
                          <span className="text-xs text-muted-foreground line-through ml-1">₹{p.originalPrice}</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-destructive hover:text-white transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td className="py-4 font-mono text-xs">{o.id}</td>
                        <td className="py-4 font-medium">{o.customerName}</td>
                        <td className="py-4 text-muted-foreground text-xs">{o.products.length} item(s)</td>
                        <td className="py-4 font-bold text-primary">₹{o.total}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${o.paymentStatus === 'paid' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
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
                { label: 'Total Revenue', value: `₹${sellerStats.totalRevenue.toLocaleString()}`, change: '+12%', icon: DollarSign, color: 'text-primary', bg: 'bg-primary/10' },
                { label: 'Total Customers', value: sellerStats.totalCustomers, change: '+8%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Monthly Revenue', value: `₹${sellerStats.monthlyRevenue.toLocaleString()}`, change: '+24%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Products Listed', value: sellerStats.totalProducts, change: '+5', icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
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
                { type: 'alert', msg: '⚠️ "Organic Berry Yogurt" expires in 6 days! Consider increasing discount.', time: '2h ago' },
                { type: 'order', msg: '🛒 New order #ord-004 received from Arjun Nair for ₹910.', time: '4h ago' },
                { type: 'alert', msg: '⚠️ "Mango Juice Pack" expires in 9 days! 30 units remaining.', time: '5h ago' },
                { type: 'success', msg: '✅ Order #ord-002 has been shipped successfully.', time: '1d ago' },
                { type: 'success', msg: '✅ Order #ord-001 delivered to Ananya Singh.', time: '2d ago' },
                { type: 'info', msg: '📊 Your monthly revenue is up 24% compared to last month!', time: '3d ago' },
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddProduct(false)}>
          <div className="bg-card rounded-3xl p-8 w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="font-display font-bold text-xl text-foreground mb-6">Add New Product</h2>
            <div className="space-y-4">
              <div><label className="text-sm font-medium text-foreground mb-1 block">Product Name</label><input className="input-field" placeholder="e.g. Organic Yogurt 500g" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-sm font-medium text-foreground mb-1 block">Category</label>
                  <select className="input-field">
                    <option>Food</option><option>Cosmetics</option><option>Medicine</option><option>Beverages</option><option>Dairy</option><option>Snacks</option>
                  </select>
                </div>
                <div><label className="text-sm font-medium text-foreground mb-1 block">Expiry Date</label><input className="input-field" type="date" /></div>
                <div><label className="text-sm font-medium text-foreground mb-1 block">Original Price (₹)</label><input className="input-field" type="number" placeholder="500" /></div>
                <div><label className="text-sm font-medium text-foreground mb-1 block">Stock Qty</label><input className="input-field" type="number" placeholder="25" /></div>
              </div>
              <div className="bg-accent rounded-xl p-3 text-sm text-accent-foreground">
                <strong>Auto-Discount:</strong> System will calculate optimal discount based on expiry date.
              </div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Product Image</label>
                <div className="input-field border-dashed text-center py-6 cursor-pointer text-muted-foreground text-sm">📸 Click to upload image</div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 btn-outline" onClick={() => setShowAddProduct(false)}>Cancel</button>
              <button className="flex-1 btn-primary" onClick={() => setShowAddProduct(false)}>Add Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
