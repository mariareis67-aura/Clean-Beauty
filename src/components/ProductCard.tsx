import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="card-product cursor-pointer group"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-nude-50 dark:bg-neutral-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`px-2.5 py-1 text-[10px] font-sans font-semibold tracking-wider uppercase ${
              product.isBestseller
                ? 'bg-nude-800 text-white'
                : product.isNew
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                : 'bg-nude-600 text-white'
            }`}>
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="px-2.5 py-1 text-[10px] font-sans font-semibold tracking-wider uppercase bg-red-500 text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); setWishlisted(p => !p); }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white dark:hover:bg-neutral-900"
          aria-label="Favoritar"
        >
          <Heart
            size={14}
            className={`transition-colors ${wishlisted ? 'fill-red-400 text-red-400' : 'text-neutral-500'}`}
          />
        </button>

        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 flex items-center justify-center gap-2 text-xs font-sans font-medium tracking-widest uppercase transition-all duration-200 ${
              addedFeedback
                ? 'bg-green-500 text-white'
                : 'bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-nude-800 hover:text-white dark:hover:bg-nude-700'
            }`}
          >
            <ShoppingBag size={13} />
            {addedFeedback ? 'Adicionado!' : 'Adicionar ao Carrinho'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-nude-500 dark:text-nude-400 mb-1">
          {product.category}
        </p>
        <h3 className="font-sans text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-snug mb-2 line-clamp-2 group-hover:text-nude-700 dark:group-hover:text-nude-400 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={10}
                className={i < Math.floor(product.rating) ? 'fill-gold-400 text-gold-400' : 'fill-neutral-200 text-neutral-200'}
              />
            ))}
          </div>
          <span className="font-sans text-[10px] text-neutral-400">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg font-light text-neutral-900 dark:text-neutral-100">
            R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          {product.originalPrice && (
            <span className="font-sans text-xs text-neutral-400 line-through">
              R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
