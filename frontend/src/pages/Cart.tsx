import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const deliveryFee = totalPrice > 499 ? 0 : 49;
  const savings = items.reduce((acc, i) => acc + (i.originalPrice - i.discountPrice) * i.quantity, 0);
  const grandTotal = totalPrice + deliveryFee;

  if (items.length === 0) return (
    <>
      <div className="flex flex-col items-center justify-center py-32">
        <ShoppingBag className="w-20 h-20 text-muted-foreground/30 mb-6" />
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8">Discover amazing near-expiry deals and add them to your cart!</p>
        <Link to="/browse" className="btn-primary flex items-center gap-2">
          Browse Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-8">Shopping Cart ({totalItems} items)</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-card rounded-2xl border border-border p-4 flex gap-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-sm text-foreground line-clamp-2">{item.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{item.category} • Expires: {item.expiryDate}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-semibold w-8 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">₹{item.discountPrice * item.quantity}</div>
                      <div className="text-xs text-muted-foreground line-through">₹{item.originalPrice * item.quantity}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <Link to="/browse" className="text-primary text-sm font-medium hover:underline">+ Continue Shopping</Link>
              <button onClick={clearCart} className="text-destructive text-sm font-medium hover:underline">Clear Cart</button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
              <h2 className="font-display font-semibold text-foreground mb-5">Order Summary</h2>

              {/* Promo */}
              <div className="flex gap-2 mb-5">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" placeholder="Promo code" className="input-field pl-9 text-sm py-2" />
                </div>
                <button className="btn-outline py-2 px-4 text-sm">Apply</button>
              </div>

              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between text-foreground"><span>Subtotal ({totalItems} items)</span><span>₹{totalPrice}</span></div>
                <div className="flex justify-between text-primary font-semibold"><span>Total Savings 🎉</span><span>-₹{savings}</span></div>
                <div className="flex justify-between text-foreground"><span>Delivery Fee</span><span>{deliveryFee === 0 ? <span className="text-primary font-semibold">FREE</span> : `₹${deliveryFee}`}</span></div>
                {deliveryFee > 0 && <p className="text-xs text-muted-foreground">Add ₹{499 - totalPrice} more for free delivery</p>}
                <div className="border-t border-border pt-3 flex justify-between font-bold text-base text-foreground">
                  <span>Grand Total</span><span>₹{grandTotal}</span>
                </div>
              </div>

              <button onClick={() => navigate('/checkout')} className="w-full btn-primary flex items-center justify-center gap-2">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 mt-4">
                {['🔒 Secure', '✅ Verified', '🚀 Fast'].map(b => <span key={b} className="text-xs text-muted-foreground">{b}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
