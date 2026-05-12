import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart, ChevronLeft, ChevronRight, Minus, Plus, Shield, Truck, RefreshCw } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, toggleCart } = useCart();

  const product = products.find(p => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'details'>('description');
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-20">
        <p className="font-display text-2xl font-light text-neutral-500">Produto não encontrado</p>
        <button onClick={() => navigate('/catalog')} className="btn-outline">
          Ver Catálogo
        </button>
      </div>
    );
  }

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    setAdded(true);
    setTimeout(() => { setAdded(false); toggleCart(); }, 800);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-nude-50 dark:bg-neutral-950 pt-20 md:pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 font-sans text-xs text-neutral-400">
          <Link to="/" className="hover:text-nude-600 transition-colors">Início</Link>
          <ChevronRight size={12} />
          <Link to="/catalog" className="hover:text-nude-600 transition-colors">Catálogo</Link>
          <ChevronRight size={12} />
          <span className="text-neutral-600 dark:text-neutral-300 truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="space-y-3">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square overflow-hidden bg-white dark:bg-neutral-900"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-nude-800 text-white text-xs font-sans font-semibold tracking-wider uppercase">
                  {product.badge}
                </span>
              )}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 right-4 flex gap-1.5">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i === selectedImage ? 'bg-nude-700 w-4' : 'bg-nude-300'}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 overflow-hidden flex-shrink-0 border-2 transition-all ${
                      i === selectedImage
                        ? 'border-nude-600'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:py-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="section-subtitle mb-2">{product.category}</p>
              <h1 className="font-display text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 leading-tight mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-gold-400 text-gold-400' : 'fill-neutral-200 text-neutral-200'} />
                  ))}
                </div>
                <span className="font-sans text-sm text-neutral-500">
                  {product.rating} ({product.reviewCount} avaliações)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-display text-4xl font-light text-neutral-900 dark:text-neutral-100">
                  R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="font-sans text-lg text-neutral-400 line-through">
                      R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-sans font-semibold">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>

              <p className="font-sans text-xs text-nude-500 mb-6">Volume: {product.volume}</p>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-sans text-sm text-neutral-600 dark:text-neutral-400">Quantidade</span>
                <div className="flex items-center border border-nude-200 dark:border-neutral-700">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-3 text-neutral-500 hover:text-nude-700 hover:bg-nude-50 dark:hover:bg-neutral-900 transition-colors"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="px-4 py-3 font-sans text-sm font-medium text-neutral-800 dark:text-neutral-200 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-4 py-3 text-neutral-500 hover:text-nude-700 hover:bg-nude-50 dark:hover:bg-neutral-900 transition-colors"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-sans text-sm font-medium tracking-widest uppercase transition-all duration-300 ${
                    added
                      ? 'bg-green-500 text-white'
                      : 'bg-nude-800 text-white hover:bg-nude-900 active:scale-95'
                  }`}
                >
                  <ShoppingBag size={15} />
                  {added ? 'Adicionado!' : 'Adicionar ao Carrinho'}
                </button>
                <button
                  onClick={() => setWishlisted(p => !p)}
                  className={`px-4 py-4 border transition-all duration-200 ${
                    wishlisted
                      ? 'border-red-300 bg-red-50 dark:bg-red-900/20 text-red-400'
                      : 'border-nude-200 dark:border-neutral-700 text-neutral-500 hover:border-nude-400 hover:text-nude-600'
                  }`}
                >
                  <Heart size={18} className={wishlisted ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-3 py-6 border-t border-b border-nude-100 dark:border-neutral-800 mb-8">
                {[
                  { icon: Truck, label: 'Frete Grátis', sub: 'acima de R$ 300' },
                  { icon: RefreshCw, label: 'Troca Fácil', sub: 'em até 30 dias' },
                  { icon: Shield, label: 'Compra Segura', sub: 'pagamento criptografado' },
                ].map(item => (
                  <div key={item.label} className="flex flex-col items-center text-center gap-1.5">
                    <item.icon size={18} className="text-nude-500" />
                    <p className="font-sans text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">{item.label}</p>
                    <p className="font-sans text-[10px] text-neutral-400 leading-tight">{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div>
                <div className="flex gap-0 border-b border-nude-100 dark:border-neutral-800 mb-6">
                  {(['description', 'details', 'ingredients'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 font-sans text-xs tracking-[0.15em] uppercase transition-all border-b-2 -mb-px ${
                        activeTab === tab
                          ? 'border-nude-600 text-nude-700 dark:text-nude-400'
                          : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
                      }`}
                    >
                      {tab === 'description' ? 'Descrição' : tab === 'details' ? 'Detalhes' : 'Ingredientes'}
                    </button>
                  ))}
                </div>

                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeTab === 'description' && (
                    <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {product.description}
                    </p>
                  )}
                  {activeTab === 'details' && (
                    <ul className="space-y-2">
                      {product.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-3 font-sans text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-nude-400 flex-shrink-0 mt-2" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'ingredients' && (
                    <p className="font-sans text-xs text-neutral-500 dark:text-neutral-500 leading-relaxed">
                      {product.ingredients}
                    </p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-nude-100 dark:bg-neutral-800" />
              <h2 className="font-display text-2xl font-light text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
                Você também pode gostar
              </h2>
              <div className="h-px flex-1 bg-nude-100 dark:bg-neutral-800" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
