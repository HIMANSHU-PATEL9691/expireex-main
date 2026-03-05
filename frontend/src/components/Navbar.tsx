import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Leaf, Bell } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

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
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/seller/dashboard" className="btn-outline text-sm py-2 px-4">Seller Portal</Link>
            <Link to="/admin" className="nav-link text-sm">Admin</Link>
            <button className="relative p-2 rounded-xl hover:bg-muted transition-colors" onClick={() => navigate('/cart')}>
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-xs text-primary-foreground flex items-center justify-center font-bold animate-pulse-green">
                  {totalItems}
                </span>
              )}
            </button>
            <Link to="/auth" className="btn-primary text-sm py-2 px-5">Login</Link>
          </div>

          {/* Mobile menu btn */}
          <div className="md:hidden flex items-center gap-3">
            <button className="relative p-2" onClick={() => navigate('/cart')}>
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-xs text-white flex items-center justify-center font-bold">{totalItems}</span>
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-3">
          <Link to="/browse" className="nav-link py-2" onClick={() => setMenuOpen(false)}>Browse Products</Link>
          <Link to="/seller/dashboard" className="nav-link py-2" onClick={() => setMenuOpen(false)}>Seller Portal</Link>
          <Link to="/admin" className="nav-link py-2" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
          <Link to="/auth" className="btn-primary text-center mt-2" onClick={() => setMenuOpen(false)}>Login / Register</Link>
        </div>
      )}
    </nav>
  );
};
