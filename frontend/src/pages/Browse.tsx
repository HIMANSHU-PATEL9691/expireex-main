import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Category, categoryConfig } from '@/data/mockData';

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

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [selectedCat, selectedUrgency, sortBy, maxPrice, search, page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        category: selectedCat === 'All' ? '' : selectedCat,
        urgency: selectedUrgency === 'all' ? '' : selectedUrgency,
        page: page.toString(),
        limit: '12',
        ...(search && { search }),
        ...(maxPrice < 1000 && { maxPrice: maxPrice.toString() })
      });
      const res = await fetch(`http://localhost:5000/api/products/products?${params}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
        setTotal(data.pagination.total);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = products;

  return (
    <>
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

            {/* Active Filters */}
            {(selectedCat !== 'All' || selectedUrgency !== 'all' || maxPrice < 1000) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCat !== 'All' && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {categoryConfig[selectedCat].icon} {selectedCat}
                    <button onClick={() => setSelectedCat('All')} className="ml-1 hover:bg-primary/20 rounded-full p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedUrgency !== 'all' && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {urgencyLabels[selectedUrgency]}
                    <button onClick={() => setSelectedUrgency('all')} className="ml-1 hover:bg-primary/20 rounded-full p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {maxPrice < 1000 && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    Max ₹{maxPrice}
                    <button onClick={() => setMaxPrice(1000)} className="ml-1 hover:bg-primary/20 rounded-full p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

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
                  <ProductCard key={p._id || p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Browse;
