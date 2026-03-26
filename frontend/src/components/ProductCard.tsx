import { ShoppingCart, Star, Clock, ShieldCheck, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Product, categoryConfig } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const cfg = categoryConfig[product.category] || { bg: 'bg-muted', color: 'text-foreground', icon: '📦' };
  
  const role = localStorage.getItem('role');
  const isCustomerOrGuest = role === 'customer' || !role;

  const [isWishlisted, setIsWishlisted] = useState(false);
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.some((p: any) => (p._id || p.id) === (product._id || product.id)));
  }, [product]);

  const urgencyLabel = {
    urgent: `🔴 ${product.daysLeft}d left`,
    moderate: `🟡 ${product.daysLeft}d left`,
    safe: `🟢 ${product.daysLeft}d left`,
  }[product.urgency || 'safe'] || `🟢 ${product.daysLeft || 0}d left`;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isCustomerOrGuest) return;
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const id = product._id || product.id;
    let newWishlist;
    if (isWishlisted) {
      newWishlist = wishlist.filter((p: any) => (p._id || p.id) !== id);
    } else {
      newWishlist = [...wishlist, product];
    }
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="card-product cursor-pointer group relative overflow-hidden" onClick={() => navigate(`/product/${product._id || product.id}`)}>
      {/* Image */}
      <div className="relative overflow-hidden h-44">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-3 left-3">
          <span className={`badge-${product.urgency}`}>{product.discountPercent}% OFF</span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />{urgencyLabel}
          </span>
        </div>
        {isCustomerOrGuest && (
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-muted-foreground hover:text-red-500 hover:bg-white transition-all z-10 shadow-sm"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        )}
        {/* Quick Add to Cart Overlay */}
        {isCustomerOrGuest && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              className="bg-white text-foreground font-semibold px-4 py-2 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2"
              onClick={e => { e.stopPropagation(); addToCart(product); }}
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className={`inline-flex items-center gap-1 ${cfg.bg} ${cfg.color} text-xs font-semibold px-2 py-0.5 rounded-full mb-2`}>
          <span>{cfg.icon}</span>
          <span>{product.category}</span>
        </div>

        <h3 className="font-semibold text-foreground text-sm leading-tight mb-1 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
          <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
          <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-primary" />
            {product.sellerName}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">₹{product.discountPrice}</span>
            <span className="text-xs text-muted-foreground line-through ml-1">₹{product.originalPrice}</span>
          </div>
        </div>

        {/* Stock */}
        <p className="text-xs text-muted-foreground mt-2">{product.stock} units left</p>
      </div>
    </div>
  );
};
