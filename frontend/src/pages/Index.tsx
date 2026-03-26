import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, TrendingDown, Users, Star, Package, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products, categoryConfig, Category } from '@/data/mockData';
import heroBanner from '@/assets/hero-banner.jpg';

const stats = [
  { label: 'Products Saved', value: '12,000+', icon: Package, desc: 'Items rescued from waste' },
  { label: 'Happy Customers', value: '8,500+', icon: Users, desc: 'Satisfied shoppers' },
  { label: 'Avg Discount', value: '38%', icon: TrendingDown, desc: 'Money saved per purchase' },
  { label: 'Verified Sellers', value: '340+', icon: ShieldCheck, desc: 'Trusted partners' },
];

const howItWorks = [
  { 
    step: '01', 
    title: 'Seller Lists Product', 
    desc: 'Sellers register and upload near-expiry products with photos, descriptions, and original pricing. Our verification team ensures quality standards.', 
    icon: '🏪',
    details: 'Free registration • Photo verification • Quality checks'
  },
  { 
    step: '02', 
    title: 'Smart Discount Engine', 
    desc: 'Our AI calculates optimal discounts based on expiry dates, ensuring fair pricing while maximizing savings and minimizing waste.', 
    icon: '🤖',
    details: 'Dynamic pricing • Fair algorithms • Real-time updates'
  },
  { 
    step: '03', 
    title: 'You Browse & Buy', 
    desc: 'Customers find amazing deals, read reviews, add to cart, and pay securely online. Fast delivery ensures products arrive fresh.', 
    icon: '🛒',
    details: 'Secure payments • Fast delivery • Customer reviews'
  },
  { 
    step: '04', 
    title: 'Save Money & Planet', 
    desc: 'Products reach their rightful homes instead of landfills. You save money while contributing to environmental sustainability.', 
    icon: '🌱',
    details: 'Reduce waste • Save money • Help environment'
  },
];

const categories: Category[] = ['Food', 'Cosmetics', 'Medicine', 'Beverages', 'Dairy', 'Snacks'];

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  const urgentDeals = products.filter(p => p.urgency === 'urgent');

  return (
    <>
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
                Save money on quality products approaching expiry. Help reduce food & product waste while getting the best deals in town. Join thousands of smart shoppers who save up to 60% on premium brands.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-lg">
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-sm">100% Quality Assured</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Up to 60% Off</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Fresh & Safe Products</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Verified Sellers</span>
                </div>
              </div>
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
          {stats.map(({ label, value, icon: Icon, desc }) => (
            <div key={label} className="stat-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-foreground">{value}</div>
                <div className="text-sm font-medium text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <h2 className="section-title mb-3">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Discover amazing deals across all product categories. From fresh groceries to premium cosmetics, find quality products at unbeatable prices.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => {
            const cfg = categoryConfig[cat];
            return (
              <Link key={cat} to={`/browse?cat=${cat}`} className={`${cfg.bg} ${cfg.color} rounded-2xl p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform border border-transparent hover:border-current/20 cursor-pointer group`}>
                <span className="text-4xl group-hover:scale-110 transition-transform">{cfg.icon}</span>
                <span className="text-sm font-semibold text-center">{cat}</span>
                <span className="text-xs text-center opacity-75">Up to 50% off</span>
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
            {howItWorks.map(({ step, title, desc, icon, details }) => (
              <div key={step} className="bg-card rounded-2xl p-6 border border-border relative hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{icon}</div>
                <div className="absolute top-4 right-4 text-4xl font-display font-black text-primary/10">{step}</div>
                <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{desc}</p>
                <div className="text-xs text-primary font-medium">{details}</div>
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

      {/* Why Choose ExpireEx */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="section-title mb-3">Why Choose ExpireEx?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">We're not just another marketplace. We're on a mission to reduce waste while delivering exceptional value to our customers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Quality Guaranteed</h3>
            <p className="text-sm text-muted-foreground">All products undergo strict quality checks. We ensure every item meets safety standards and arrives fresh.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingDown className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Best Prices</h3>
            <p className="text-sm text-muted-foreground">Our smart pricing algorithm ensures you get the best possible deals while sellers recover maximum value.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Eco-Friendly</h3>
            <p className="text-sm text-muted-foreground">Every purchase helps reduce food waste. Together, we're making a positive impact on the environment.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">Quick and reliable delivery ensures your purchases arrive fresh and on time, every time.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Community Driven</h3>
            <p className="text-sm text-muted-foreground">Join a community of conscious consumers making smart choices for their wallet and the planet.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Trusted Reviews</h3>
            <p className="text-sm text-muted-foreground">Read genuine reviews from real customers to make informed purchasing decisions.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="section-title text-center mb-12">What Our Community Says</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Ananya Singh', role: 'Customer', text: 'I saved over ₹2,000 last month buying quality products at 50% off. ExpireEx is a game-changer for budget-conscious families!', avatar: 'AS', rating: 5, savings: '₹2,000+' },
            { name: 'Rajesh Kumar', role: 'Seller – FreshMart', text: 'Instead of throwing out near-expiry items, I recover 60% of the cost. Brilliant platform that helps my business and the environment.', avatar: 'RK', rating: 5, savings: '60% recovery' },
            { name: 'Priya Sharma', role: 'Customer', text: 'The quality is exactly as described. Got premium skincare products at 40% discount. The delivery was fast and packaging excellent.', avatar: 'PS', rating: 4, savings: '₹1,500' },
            { name: 'Amit Patel', role: 'Customer', text: 'As a student, ExpireEx helps me afford healthy food options. The discounts on dairy and snacks are incredible!', avatar: 'AP', rating: 5, savings: '₹800/month' },
            { name: 'Sneha Gupta', role: 'Seller – BeautyHub', text: 'Our near-expiry cosmetics now find loving homes instead of being wasted. Customers love the authenticity and prices.', avatar: 'SG', rating: 5, savings: '₹50,000+' },
            { name: 'Vikram Rao', role: 'Customer', text: 'The urgent deals section is my favorite. Got fresh juice packs at 60% off that were expiring in 3 days. Perfect condition!', avatar: 'VR', rating: 5, savings: '₹1,200' },
          ].map(({ name, role, text, avatar, rating, savings }) => (
            <div key={name} className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />)}
                <span className="ml-2 text-sm font-medium text-primary">Saved {savings}</span>
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

      {/* Newsletter */}
      <section className="bg-primary py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
            Stay Updated with Best Deals
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-6">
            Get notified about new products, flash sales, and exclusive offers delivered to your inbox.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-primary-foreground/90">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-sm">Daily Deals</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-primary-foreground/90">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-sm">Flash Sales</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-primary-foreground/90">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-sm">New Arrivals</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-secondary text-secondary-foreground font-semibold rounded-xl px-6 py-3 hover:opacity-90 transition-all">
              Subscribe
            </button>
          </div>
          <p className="text-primary-foreground/60 text-sm mt-4">
            No spam, unsubscribe anytime. We respect your privacy and never share your data.
          </p>
        </div>
      </section>
    </>
  );
};

export default Index;
