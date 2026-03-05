import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">ExpireEx</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Smart platform reducing product wastage by connecting sellers of near-expiry products with conscious buyers.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-display">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[['/', 'Home'], ['/browse', 'Browse Products'], ['/seller/register', 'Become a Seller'], ['/auth', 'Login / Register']].map(([href, label]) => (
                <li key={href}><Link to={href} className="hover:text-primary transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-display">Categories</h4>
            <ul className="space-y-2 text-sm">
              {['🥗 Food', '💊 Medicine', '💄 Cosmetics', '🧃 Beverages', '🥛 Dairy', '🍿 Snacks'].map(cat => (
                <li key={cat}><Link to={`/browse?cat=${cat.split(' ')[1]}`} className="hover:text-primary transition-colors">{cat}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-display">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /><span>support@expireex.com</span></li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /><span>+919691365052 </span></li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary mt-1" /><span>Silicon city Indore </span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2025 ExpireEx. All rights reserved. Reducing waste, one deal at a time. 🌱</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
