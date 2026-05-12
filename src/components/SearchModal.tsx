import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    setResults(products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    ).slice(0, 6));
  }, [query]);

  const handleSelect = (product: Product) => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[90] w-full max-w-xl mx-4"
            style={{ width: 'min(calc(100vw - 2rem), 40rem)' }}
          >
            <div className="bg-white dark:bg-neutral-900 shadow-luxury-lg overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-nude-100 dark:border-neutral-800">
                <Search size={18} className="text-nude-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="flex-1 bg-transparent font-sans text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none"
                />
                <button onClick={onClose} className="p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">
                  <X size={18} />
                </button>
              </div>
              <AnimatePresence>
                {results.length > 0 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    {results.map((product, i) => (
                      <motion.button
                        key={product.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => handleSelect(product)}
                        className="w-full flex items-center gap-4 px-5 py-3 hover:bg-nude-50 dark:hover:bg-neutral-800 transition-colors text-left"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">
                            {product.name}
                          </p>
                          <p className="font-sans text-xs text-neutral-400 capitalize">{product.category}</p>
                        </div>
                        <span className="font-sans text-sm font-semibold text-nude-700 dark:text-nude-400 flex-shrink-0">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
                {query.length >= 2 && results.length === 0 && (
                  <div className="px-5 py-8 text-center">
                    <p className="font-sans text-sm text-neutral-400">Nenhum produto encontrado para "{query}"</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
