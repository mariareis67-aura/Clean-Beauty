import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { products, categories } from '../data/products';
import { Category } from '../types';
import ProductCard from '../components/ProductCard';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory as Category);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-nude-50 dark:bg-neutral-950 pt-20 md:pt-24">
      {/* Header */}
      <div className="relative h-52 md:h-72 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Catálogo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nude-50/90 dark:from-neutral-950/90 via-black/40 to-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-subtitle text-nude-300 mb-2"
          >
            Nossa Coleção
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-light text-white"
          >
            Catálogo
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-neutral-900 border border-nude-100 dark:border-neutral-800 font-sans text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none focus:border-nude-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="px-4 py-3 bg-white dark:bg-neutral-900 border border-nude-100 dark:border-neutral-800 font-sans text-sm text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-nude-400 transition-colors cursor-pointer"
            >
              <option value="default">Ordenar por</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="rating">Melhor Avaliação</option>
              <option value="newest">Mais Novos</option>
            </select>
            <button
              onClick={() => setFiltersOpen(p => !p)}
              className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-neutral-900 border border-nude-100 dark:border-neutral-800 font-sans text-sm text-neutral-700 dark:text-neutral-300 hover:border-nude-400 transition-colors sm:hidden"
            >
              <SlidersHorizontal size={14} />
              Filtros
            </button>
          </div>
        </div>

        <div className="flex gap-8 lg:gap-12">
          {/* Sidebar Categories */}
          <aside className={`hidden sm:block w-48 flex-shrink-0`}>
            <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400 mb-4">
              Categorias
            </h3>
            <ul className="space-y-1">
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2.5 font-sans text-sm transition-all duration-150 ${
                      selectedCategory === cat.id
                        ? 'bg-nude-800 text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-nude-700 dark:hover:text-nude-400 hover:bg-nude-50 dark:hover:bg-neutral-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Mobile category filter */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="sm:hidden overflow-hidden mb-4 w-full"
              >
                <div className="flex flex-wrap gap-2 pb-4">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.id); setFiltersOpen(false); }}
                      className={`px-4 py-2 text-xs font-sans font-medium tracking-wide border transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-nude-800 text-white border-nude-800'
                          : 'border-nude-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-nude-400'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="font-sans text-sm text-neutral-500 dark:text-neutral-400">
                {filtered.length} produto{filtered.length !== 1 ? 's' : ''}
              </p>
              {/* Desktop category pills */}
              <div className="hidden md:flex flex-wrap gap-2">
                {categories.slice(0, 5).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 text-[11px] font-sans font-medium tracking-wide border transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-nude-800 text-white border-nude-800'
                        : 'border-nude-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:border-nude-400'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <p className="font-display text-2xl font-light text-neutral-400">Nenhum produto encontrado</p>
                <p className="font-sans text-sm text-neutral-400">Tente ajustar os filtros ou a busca</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="btn-outline text-xs mt-2"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
