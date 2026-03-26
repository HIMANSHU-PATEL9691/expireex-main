import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Leaf, Bell, Search } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const navigate = useNavigate();
  
  const role = localStorage.getItem('role');
  const isCustomerOrGuest = role === 'customer' || !role;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-gradient">ExpireEx</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/browse" className="nav-link">Browse</Link>
            <Link to="/browse?cat=Food" className="nav-link">Food</Link>
            <Link to="/browse?cat=Medicine" className="nav-link">Medicine</Link>
            <Link to="/browse?cat=Cosmetics" className="nav-link">Cosmetics</Link>
            <Link to="/how-it-works" className="nav-link">How It Works</Link>
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-muted rounded-xl px-3 py-1.5">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none w-40"
              />
            </form>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {role === 'seller' && <Link to="/seller/dashboard" className="btn-outline text-sm py-2 px-4">Seller Dashboard</Link>}
            {role === 'admin' && <Link to="/admin" className="btn-outline text-sm py-2 px-4">Admin Dashboard</Link>}
            {role === 'customer' && <Link to="/profile" className="nav-link text-sm font-medium">My Profile</Link>}
            {!role && <Link to="/seller/register" className="btn-outline text-sm py-2 px-4">Become a Seller</Link>}
            
            {isCustomerOrGuest && (
              <button className="relative p-2 rounded-xl hover:bg-muted transition-colors" onClick={() => navigate('/cart')}>
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-xs text-primary-foreground flex items-center justify-center font-bold animate-pulse-green">
                    {totalItems}
                  </span>
                )}
              </button>
            )}
            
            {!role ? (
              <Link to="/auth" className="btn-primary text-sm py-2 px-5">Login</Link>
            ) : (
              <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} className="btn-secondary text-sm py-2 px-5">Logout</button>
            )}
          </div>

          {/* Mobile menu btn */}
          <div className="md:hidden flex items-center gap-3">
            {isCustomerOrGuest && (
              <button className="relative p-2" onClick={() => navigate('/cart')}>
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-xs text-white flex items-center justify-center font-bold">{totalItems}</span>
                )}
              </button>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-4">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none flex-1"
            />
          </form>
          <Link to="/browse" className="nav-link py-2" onClick={() => setMenuOpen(false)}>Browse Products</Link>
          <Link to="/browse?cat=Food" className="nav-link py-2" onClick={() => setMenuOpen(false)}>Food</Link>
          <Link to="/browse?cat=Medicine" className="nav-link py-2" onClick={() => setMenuOpen(false)}>Medicine</Link>
          <Link to="/browse?cat=Cosmetics" className="nav-link py-2" onClick={() => setMenuOpen(false)}>Cosmetics</Link>
          <Link to="/how-it-works" className="nav-link py-2" onClick={() => setMenuOpen(false)}>How It Works</Link>
          {role === 'seller' && <Link to="/seller/dashboard" className="nav-link py-2" onClick={() => setMenuOpen(false)}>Seller Portal</Link>}
          {role === 'admin' && <Link to="/admin" className="nav-link py-2" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>}
          {role === 'customer' && <Link to="/profile" className="nav-link py-2" onClick={() => setMenuOpen(false)}>My Profile</Link>}
          {!role ? (
            <Link to="/auth" className="btn-primary text-center mt-2" onClick={() => setMenuOpen(false)}>Login / Register</Link>
          ) : (
            <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} className="btn-secondary text-center mt-2">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};
