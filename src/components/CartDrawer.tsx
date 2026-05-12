import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md bg-white dark:bg-neutral-950 shadow-luxury-lg flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-nude-100 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-nude-600" />
                <span className="font-display text-xl font-light text-neutral-900 dark:text-neutral-100">
                  Seu Carrinho
                </span>
                {totalItems > 0 && (
                  <span className="px-2 py-0.5 bg-nude-100 dark:bg-nude-900 text-nude-700 dark:text-nude-300 text-xs font-medium rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-nude-50 dark:bg-neutral-900 flex items-center justify-center">
                    <ShoppingBag size={32} className="text-nude-300" />
                  </div>
                  <p className="font-display text-xl font-light text-neutral-500 dark:text-neutral-400">
                    Seu carrinho está vazio
                  </p>
                  <p className="text-sm text-neutral-400 font-sans">
                    Descubra nossa coleção premium de skincare
                  </p>
                  <button
                    onClick={() => { closeCart(); navigate('/catalog'); }}
                    className="btn-outline text-xs mt-2"
                  >
                    Ver Catálogo
                  </button>
                </div>
              ) : (
                <div className="px-6 space-y-5">
                  <AnimatePresence mode="popLayout">
                    {items.map(item => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4"
                      >
                        <div className="w-20 h-20 flex-shrink-0 overflow-hidden bg-nude-50 dark:bg-neutral-900">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">
                            {item.product.name}
                          </p>
                          <p className="font-sans text-xs text-neutral-400 mt-0.5">
                            {item.product.volume}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2 border border-nude-200 dark:border-neutral-700">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="px-2 py-1 text-neutral-500 hover:text-nude-700 transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="font-sans text-sm font-medium text-neutral-800 dark:text-neutral-200 min-w-[1.5rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="px-2 py-1 text-neutral-500 hover:text-nude-700 transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-sans text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                R$ {(item.product.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="text-neutral-300 hover:text-red-400 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-nude-100 dark:border-neutral-800 px-6 py-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-neutral-500">Subtotal</span>
                  <span className="font-display text-xl font-light text-neutral-900 dark:text-neutral-100">
                    R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="font-sans text-xs text-nude-400 text-center">
                  Frete calculado no checkout
                </p>
                <button onClick={handleCheckout} className="btn-primary w-full">
                  Finalizar Compra
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
