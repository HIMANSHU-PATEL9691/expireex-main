import { useState, useEffect } from 'react';
import { CheckCircle, CreditCard, Smartphone, Wallet, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const steps = ['Delivery', 'Payment', 'Review'];

const Checkout = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', pincode: '' });
  const [payMethod, setPayMethod] = useState<'card' | 'upi' | 'wallet'>('upi');
  const [ordered, setOrdered] = useState(false);
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'customer') {
      alert('Please log in as a customer to place an order.');
      navigate('/auth');
    }
  }, [navigate]);

  const deliveryFee = totalPrice > 499 ? 0 : 49;
  const grandTotal = totalPrice + deliveryFee;

  const handleOrder = () => {
    setOrdered(true);
    clearCart();
  };

  if (ordered) return (
    <>
      <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse-green">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-display font-bold text-foreground mb-3">Order Placed Successfully! 🎉</h2>
        <p className="text-muted-foreground mb-2 max-w-md">Your order has been confirmed. You'll receive a confirmation email shortly.</p>
        <p className="text-primary font-semibold mb-8">Estimated delivery: 2-4 business days</p>
        <div className="flex gap-4">
          <button onClick={() => navigate('/browse')} className="btn-primary">Continue Shopping</button>
          <Link to="/" className="btn-outline">Back to Home</Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
        </button>
        <h1 className="text-2xl font-display font-bold text-foreground mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${i === step ? 'bg-primary text-primary-foreground' : i < step ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border-2 border-current">{i < step ? '✓' : i + 1}</span>
                {s}
              </div>
              {i < steps.length - 1 && <div className={`w-12 h-0.5 ${i < step ? 'bg-primary' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 0: Delivery */}
            {step === 0 && (
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="font-display font-semibold text-foreground mb-5">Delivery Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                    <input className="input-field" placeholder="Ananya Singh" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-sm font-medium text-foreground mb-1 block">Phone *</label>
                    <input className="input-field" placeholder="+919691365052 " value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-foreground mb-1 block">Email Address *</label>
                    <input className="input-field" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-foreground mb-1 block">Full Address *</label>
                    <textarea className="input-field resize-none" rows={3} placeholder="House no, Street, Area..." value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">City *</label>
                    <input className="input-field" placeholder="Bangalore" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Pincode *</label>
                    <input className="input-field" placeholder="560001" value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} />
                  </div>
                </div>
                <button className="w-full btn-primary mt-6" onClick={() => setStep(1)}>Continue to Payment →</button>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="font-display font-semibold text-foreground mb-5">Payment Method</h2>
                <div className="space-y-3 mb-6">
                  {[
                    { id: 'upi' as const, icon: Smartphone, label: 'UPI / PhonePe / GPay', desc: 'Instant payment via UPI apps' },
                    { id: 'card' as const, icon: CreditCard, label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay accepted' },
                    { id: 'wallet' as const, icon: Wallet, label: 'Paytm Wallet', desc: 'Pay using your Paytm balance' },
                  ].map(({ id, icon: Icon, label, desc }) => (
                    <button
                      key={id}
                      onClick={() => setPayMethod(id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${payMethod === id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${payMethod === id ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{label}</div>
                        <div className="text-xs text-muted-foreground">{desc}</div>
                      </div>
                      {payMethod === id && <CheckCircle className="w-5 h-5 text-primary ml-auto" />}
                    </button>
                  ))}
                </div>
                {payMethod === 'upi' && (
                  <div className="mb-4">
                    <label className="text-sm font-medium text-foreground mb-1 block">UPI ID</label>
                    <input className="input-field" placeholder="yourname@paytm" />
                  </div>
                )}
                {payMethod === 'card' && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="col-span-2"><input className="input-field" placeholder="Card Number" /></div>
                    <input className="input-field" placeholder="MM/YY" />
                    <input className="input-field" placeholder="CVV" />
                    <div className="col-span-2"><input className="input-field" placeholder="Cardholder Name" /></div>
                  </div>
                )}
                <div className="flex gap-3">
                  <button className="btn-outline flex-1" onClick={() => setStep(0)}>← Back</button>
                  <button className="btn-primary flex-1" onClick={() => setStep(2)}>Review Order →</button>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="font-display font-semibold text-foreground mb-5">Review Your Order</h2>
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{item.name}</div>
                        <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-sm font-bold text-primary">₹{item.discountPrice * item.quantity}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-muted rounded-xl p-4 mb-6 text-sm space-y-1">
                  <div className="font-semibold text-foreground mb-2">Delivery to:</div>
                  <div className="text-muted-foreground">{form.name || 'Ananya Singh'}</div>
                  <div className="text-muted-foreground">{form.address || '123, Sample Street, Area'}</div>
                  <div className="text-muted-foreground">{form.city || 'Bangalore'} – {form.pincode || '560001'}</div>
                </div>
                <div className="flex gap-3">
                  <button className="btn-outline flex-1" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn-primary flex-1 text-base" onClick={handleOrder}>
                    🎉 Place Order – ₹{grandTotal}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-card rounded-2xl border border-border p-5 sticky top-24">
              <h3 className="font-display font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                {items.map(i => (
                  <div key={i.id} className="flex justify-between text-muted-foreground">
                    <span className="truncate mr-2">{i.name} ×{i.quantity}</span>
                    <span className="flex-shrink-0">₹{i.discountPrice * i.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-foreground"><span>Subtotal</span><span>₹{totalPrice}</span></div>
                <div className="flex justify-between text-foreground"><span>Delivery</span><span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
                <div className="flex justify-between font-bold text-base text-foreground border-t border-border pt-2 mt-2">
                  <span>Total</span><span className="text-primary">₹{grandTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
