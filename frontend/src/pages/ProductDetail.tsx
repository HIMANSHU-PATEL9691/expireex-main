import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Zap, Shield, Truck, Clock, Package } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { products, categoryConfig } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === id);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl mb-4">Product not found</p>
        <button onClick={() => navigate('/browse')} className="btn-primary">Back to Browse</button>
      </div>
    </div>
  );

  const cfg = categoryConfig[product.category];
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const savings = product.originalPrice - product.discountPrice;

  const urgencyBanner = {
    urgent: { text: `⚠️ Only ${product.daysLeft} days left! Grab this deal now.`, cls: 'bg-danger-light border-danger/30 text-danger' },
    moderate: { text: `🟡 ${product.daysLeft} days to expiry. Don't miss this discount.`, cls: 'bg-secondary-light border-secondary/30 text-secondary-foreground' },
    safe: { text: `🟢 ${product.daysLeft} days to expiry. Plenty of time to enjoy!`, cls: 'bg-accent border-accent-foreground/20 text-accent-foreground' },
  }[product.urgency];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <div className="relative rounded-3xl overflow-hidden bg-muted h-80 sm:h-96 lg:h-[480px]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className={`badge-${product.urgency} text-base px-4 py-2`}>{product.discountPercent}% OFF</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            {/* Category */}
            <div className={`inline-flex items-center gap-1 ${cfg.bg} ${cfg.color} text-sm font-semibold px-3 py-1 rounded-full mb-3`}>
              <span>{cfg.icon}</span><span>{product.category}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-secondary fill-secondary' : 'text-muted-foreground'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">Sold by <span className="text-primary font-medium">{product.sellerName}</span></span>
            </div>

            {/* Urgency Banner */}
            <div className={`border rounded-xl px-4 py-3 mb-5 text-sm font-medium ${urgencyBanner.cls}`}>
              {urgencyBanner.text}
            </div>

            {/* Price */}
            <div className="bg-accent rounded-2xl p-5 mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-display font-bold text-primary">₹{product.discountPrice}</span>
                <span className="text-xl text-muted-foreground line-through mb-1">₹{product.originalPrice}</span>
                <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-1">Save ₹{savings}</span>
              </div>
              <p className="text-sm text-muted-foreground">Inclusive of all taxes</p>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: Clock, label: 'Expiry Date', val: product.expiryDate },
                { icon: Package, label: 'In Stock', val: `${product.stock} units` },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border">
                  <Icon className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className="text-sm font-medium text-foreground">{val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{product.description}</p>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 btn-primary flex items-center justify-center gap-2" onClick={() => { addToCart(product); navigate('/cart'); }}>
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <button className="flex-1 btn-secondary flex items-center justify-center gap-2" onClick={() => { addToCart(product); navigate('/checkout'); }}>
                <Zap className="w-5 h-5" /> Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex gap-4 mt-6 pt-6 border-t border-border">
              {[
                { icon: Shield, label: 'Verified Seller' },
                { icon: Truck, label: 'Fast Delivery' },
                { icon: Zap, label: 'Secure Payment' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Icon className="w-4 h-4 text-primary" />{label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
