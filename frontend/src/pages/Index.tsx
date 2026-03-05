import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, TrendingDown, Users, Star, Package, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { products, categoryConfig, Category } from '@/data/mockData';
import heroBanner from '@/assets/hero-banner.jpg';

const stats = [
  { label: 'Products Saved', value: '12,000+', icon: Package },
  { label: 'Happy Customers', value: '8,500+', icon: Users },
  { label: 'Avg Discount', value: '38%', icon: TrendingDown },
  { label: 'Verified Sellers', value: '340+', icon: ShieldCheck },
];

const howItWorks = [
  { step: '01', title: 'Seller Lists Product', desc: 'Sellers register and upload near-expiry products with photos and pricing.', icon: '🏪' },
  { step: '02', title: 'Auto Discount Applied', desc: 'Our system calculates discounts based on how close the expiry date is.', icon: '💰' },
  { step: '03', title: 'You Browse & Buy', desc: 'Customers find amazing deals, add to cart, and pay securely online.', icon: '🛒' },
  { step: '04', title: 'Save & Reduce Waste', desc: 'Products reach their rightful homes instead of landfills.', icon: '🌱' },
];

const categories: Category[] = ['Food', 'Cosmetics', 'Medicine', 'Beverages', 'Dairy', 'Snacks'];

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  const urgentDeals = products.filter(p => p.urgency === 'urgent');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/20">
                <Leaf className="w-4 h-4" />
                Smart Savings • Zero Waste
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
                Buy Near-Expiry<br />
                <span className="text-secondary">Products</span> at<br />
                Huge Discounts
              </h1>
              <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-lg">
                Save money on quality products approaching expiry. Help reduce food & product waste while getting the best deals in town.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/browse" className="btn-secondary flex items-center gap-2">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/seller/register" className="bg-white/15 backdrop-blur-sm text-white border border-white/30 font-semibold rounded-xl px-6 py-3 hover:bg-white/25 transition-all flex items-center gap-2">
                  Become a Seller <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img src={heroBanner} alt="ExpireEx Platform" className="rounded-3xl shadow-2xl w-full object-cover h-96 animate-float" />
            </div>
          </div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60H1440V30C1200 0 960 60 720 30C480 0 240 60 0 30V60Z" fill="hsl(120 20% 98%)" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="stat-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-foreground">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Shop by Category</h2>
          <Link to="/browse" className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categories.map(cat => {
            const cfg = categoryConfig[cat];
            return (
              <Link key={cat} to={`/browse?cat=${cat}`} className={`${cfg.bg} ${cfg.color} rounded-2xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform border border-transparent hover:border-current/20 cursor-pointer`}>
                <span className="text-3xl">{cfg.icon}</span>
                <span className="text-xs font-semibold text-center">{cat}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Urgent Deals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title flex items-center gap-2">
              🔴 Expiring Soon – Best Deals
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Grab these before they're gone!</p>
          </div>
          <Link to="/browse?urgency=urgent" className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {urgentDeals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Featured Products</h2>
          <Link to="/browse" className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted py-20 mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">How ExpireEx Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A simple, transparent process to save money and reduce waste together.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map(({ step, title, desc, icon }) => (
              <div key={step} className="bg-card rounded-2xl p-6 border border-border relative">
                <div className="text-5xl mb-4">{icon}</div>
                <div className="absolute top-4 right-4 text-4xl font-display font-black text-primary/10">{step}</div>
                <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            Are You a Shop Owner?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Don't let near-expiry products go to waste. List them on ExpireEx and recover your losses instantly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/seller/register" className="btn-secondary flex items-center gap-2">
              Register as Seller <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/how-it-works" className="bg-white/15 backdrop-blur-sm text-white border border-white/30 font-semibold rounded-xl px-6 py-3 hover:bg-white/25 transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="section-title text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Ananya Singh', role: 'Customer', text: 'I saved over ₹2,000 last month buying quality products at 50% off. ExpireEx is a game-changer!', avatar: 'AS', rating: 5 },
            { name: 'Rajesh Kumar', role: 'Seller – FreshMart', text: 'Instead of throwing out near-expiry items, I recover 60% of the cost. Brilliant platform!', avatar: 'RK', rating: 5 },
            { name: 'Priya Sharma', role: 'Customer', text: 'The quality is exactly as described. Got premium skincare products at 40% discount. Highly recommend!', avatar: 'PS', rating: 4 },
          ].map(({ name, role, text, avatar, rating }) => (
            <div key={name} className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />)}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">{avatar}</div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{name}</div>
                  <div className="text-xs text-muted-foreground">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
