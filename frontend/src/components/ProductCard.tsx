import { ShoppingCart, Star, Clock } from 'lucide-react';
import { Product, categoryConfig } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const cfg = categoryConfig[product.category];

  const urgencyLabel = {
    urgent: `🔴 ${product.daysLeft}d left`,
    moderate: `🟡 ${product.daysLeft}d left`,
    safe: `🟢 ${product.daysLeft}d left`,
  }[product.urgency];

  return (
    <div className="card-product cursor-pointer group" onClick={() => navigate(`/product/${product.id}`)}>
      {/* Image */}
      <div className="relative overflow-hidden h-44">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-3 left-3">
          <span className={`badge-${product.urgency}`}>{product.discountPercent}% OFF</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />{urgencyLabel}
          </span>
        </div>
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
          <span className="text-xs text-muted-foreground ml-auto">{product.sellerName}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">₹{product.discountPrice}</span>
            <span className="text-xs text-muted-foreground line-through ml-1">₹{product.originalPrice}</span>
          </div>
          <button
            className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-all hover:scale-110 active:scale-95"
            onClick={e => { e.stopPropagation(); addToCart(product); }}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Stock */}
        <p className="text-xs text-muted-foreground mt-2">{product.stock} units left</p>
      </div>
    </div>
  );
};
