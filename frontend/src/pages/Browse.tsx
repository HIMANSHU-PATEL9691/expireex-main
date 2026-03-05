import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { products, Category, categoryConfig } from '@/data/mockData';

const sortOptions = [
  { value: 'discount', label: 'Highest Discount' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'expiry', label: 'Expiring Soon' },
  { value: 'rating', label: 'Best Rated' },
];

const urgencyLabels = { urgent: '🔴 Expiring Soon', moderate: '🟡 Moderate', safe: '🟢 Safe' };
const categories: Category[] = ['Food', 'Cosmetics', 'Medicine', 'Beverages', 'Dairy', 'Snacks'];

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<Category | 'All'>('All');
  const [selectedUrgency, setSelectedUrgency] = useState<'all' | 'urgent' | 'moderate' | 'safe'>('all');
  const [sortBy, setSortBy] = useState('discount');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [showFilters, setShowFilters] = useState(false);

  // URL params sync
  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setSelectedCat(cat as Category);

    const urgency = searchParams.get('urgency');
    if (urgency) setSelectedUrgency(urgency as any);
  }, [searchParams]);

  // ✅ SCROLL TO TOP ON FILTER CHANGE
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [selectedCat, selectedUrgency, sortBy, maxPrice, search]);

  const filtered = products
    .filter(p => {
      if (selectedCat !== 'All' && p.category !== selectedCat) return false;
      if (selectedUrgency !== 'all' && p.urgency !== selectedUrgency) return false;
      if (p.discountPrice > maxPrice) return false;
      if (
        search &&
        !p.name.toLowerCase().includes(search.toLowerCase()) &&
        !p.category.toLowerCase().includes(search.toLowerCase())
      ) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'discount': return b.discountPercent - a.discountPercent;
        case 'price-low': return a.discountPrice - b.discountPrice;
        case 'price-high': return b.discountPrice - a.discountPrice;
        case 'expiry': return a.daysLeft - b.daysLeft;
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="bg-muted border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            Browse Products
          </h1>

          <div className="flex gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products, categories..."
                className="input-field pl-11"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 btn-outline py-3 px-4"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>

            {/* Sort */}
            <select
              className="input-field w-auto"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64`}>
            <div className="bg-card rounded-2xl border border-border p-5 sticky top-24">

              <h3 className="font-display font-semibold mb-4">Filters</h3>

              {/* Category */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Category</h4>

                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCat('All')}
                    className={`w-full text-left px-3 py-2 rounded-xl ${
                      selectedCat === 'All' ? 'bg-primary text-white' : 'hover:bg-muted'
                    }`}
                  >
                    🏷️ All Categories
                  </button>

                  {categories.map(cat => {
                    const cfg = categoryConfig[cat];

                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCat(cat)}
                        className={`w-full text-left px-3 py-2 rounded-xl flex gap-2 ${
                          selectedCat === cat ? 'bg-primary text-white' : 'hover:bg-muted'
                        }`}
                      >
                        <span>{cfg.icon}</span> {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Urgency */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Expiry Status</h4>

                {(['all', 'urgent', 'moderate', 'safe'] as const).map(u => (
                  <button
                    key={u}
                    onClick={() => setSelectedUrgency(u)}
                    className={`w-full text-left px-3 py-2 rounded-xl ${
                      selectedUrgency === u ? 'bg-primary text-white' : 'hover:bg-muted'
                    }`}
                  >
                    {u === 'all' ? '🏷️ All Status' : urgencyLabels[u]}
                  </button>
                ))}
              </div>

              {/* Price */}
              <div>
                <h4 className="text-sm font-semibold mb-3">Max Price: ₹{maxPrice}</h4>

                <input
                  type="range"
                  min={50}
                  max={1000}
                  step={50}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </aside>

          {/* Products */}
          <main className="flex-1">

            <div className="flex justify-between mb-6">
              <p>
                <b>{filtered.length}</b> products found
              </p>

              {(selectedCat !== 'All' || selectedUrgency !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedCat('All');
                    setSelectedUrgency('all');
                  }}
                  className="text-primary flex gap-1"
                >
                  <X className="w-3 h-3" /> Clear filters
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <h3>No products found</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Browse;