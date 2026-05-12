import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CreditCard, CheckCircle, Lock, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';

type Step = 'address' | 'shipping' | 'payment' | 'confirmation';

const steps: { id: Step; label: string }[] = [
  { id: 'address', label: 'Endereço' },
  { id: 'shipping', label: 'Entrega' },
  { id: 'payment', label: 'Pagamento' },
  { id: 'confirmation', label: 'Confirmação' },
];

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('address');

  const [address, setAddress] = useState({
    name: '', email: '', cpf: '',
    cep: '', street: '', number: '', complement: '', city: '', state: '',
  });
  const [shipping, setShipping] = useState<'express' | 'standard'>('standard');
  const [payment, setPayment] = useState({
    cardNumber: '', cardName: '', expiry: '', cvv: '',
  });

  const shippingCost = shipping === 'express' ? 29.90 : totalPrice >= 300 ? 0 : 14.90;
  const total = totalPrice + shippingCost;

  const stepIndex = steps.findIndex(s => s.id === currentStep);

  const handleNext = () => {
    const next = steps[stepIndex + 1];
    if (next) setCurrentStep(next.id);
  };

  const handleFinish = () => {
    clearCart();
    setCurrentStep('confirmation');
  };

  if (items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-20 bg-nude-50 dark:bg-neutral-950">
        <div className="w-20 h-20 flex items-center justify-center bg-nude-100 dark:bg-neutral-900">
          <ShoppingBag size={32} className="text-nude-400" />
        </div>
        <p className="font-display text-2xl font-light text-neutral-500">Seu carrinho está vazio</p>
        <Link to="/catalog" className="btn-primary">Ver Produtos</Link>
      </div>
    );
  }

  if (currentStep === 'confirmation') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 pt-20 bg-nude-50 dark:bg-neutral-950">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-24 h-24 flex items-center justify-center bg-green-50 dark:bg-green-900/20"
        >
          <CheckCircle size={48} className="text-green-500" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-3">
            Pedido Confirmado!
          </h1>
          <p className="font-sans text-neutral-500 dark:text-neutral-400 mb-2">
            Seu pedido foi realizado com sucesso.
          </p>
          <p className="font-sans text-sm text-nude-500">
            Você receberá um e-mail de confirmação em breve.
          </p>
          <div className="mt-6 p-6 bg-white dark:bg-neutral-900 shadow-luxury max-w-sm mx-auto">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-neutral-400 mb-1">Número do Pedido</p>
            <p className="font-display text-2xl font-light text-neutral-800 dark:text-neutral-200">
              #CB{Math.floor(Math.random() * 900000 + 100000)}
            </p>
          </div>
        </motion.div>
        <div className="flex gap-4">
          <Link to="/" className="btn-outline">Voltar ao Início</Link>
          <Link to="/catalog" className="btn-primary">Continuar Comprando</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nude-50 dark:bg-neutral-950 pt-20 md:pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-10"
        >
          Finalizar Compra
        </motion.h1>

        {/* Step indicators */}
        <div className="flex items-center mb-10 overflow-x-auto scrollbar-hide">
          {steps.slice(0, 3).map((step, i) => (
            <div key={step.id} className="flex items-center flex-shrink-0">
              <div className={`flex items-center gap-2 ${i <= stepIndex ? 'text-nude-700 dark:text-nude-400' : 'text-neutral-400'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 ${
                  i < stepIndex
                    ? 'bg-nude-700 border-nude-700 text-white'
                    : i === stepIndex
                    ? 'border-nude-600 text-nude-700 dark:text-nude-400 dark:border-nude-400'
                    : 'border-neutral-300 dark:border-neutral-700 text-neutral-400'
                }`}>
                  {i < stepIndex ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span className="font-sans text-xs font-medium tracking-wide">{step.label}</span>
              </div>
              {i < 2 && <div className={`mx-3 h-px w-8 ${i < stepIndex ? 'bg-nude-400' : 'bg-neutral-200 dark:bg-neutral-700'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 'address' && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-neutral-900 p-8 shadow-luxury"
                >
                  <h2 className="font-display text-2xl font-light text-neutral-800 dark:text-neutral-200 mb-6">
                    Dados Pessoais
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block font-sans text-xs text-neutral-500 mb-1.5 tracking-wide">Nome Completo</label>
                      <input value={address.name} onChange={e => setAddress(p => ({...p, name: e.target.value}))} className="input-field" placeholder="Seu nome completo" />
                    </div>
                    <div>
                      <label className="block font-sans text-xs text-neutral-500 mb-1.5 tracking-wide">E-mail</label>
                      <input type="email" value={address.email} onChange={e => setAddress(p => ({...p, email: e.target.value}))} className="input-field" placeholder="seu@email.com" />
                    </div>
                    <div>
                      <label className="block font-sans text-xs text-neutral-500 mb-1.5 tracking-wide">CPF</label>
                      <input value={address.cpf} onChange={e => setAddress(p => ({...p, cpf: e.target.value}))} className="input-field" placeholder="000.000.000-00" />
                    </div>
                    <div>
                      <label className="block font-sans text-xs text-neutral-500 mb-1.5 tracking-wide">CEP</label>
                      <input value={address.cep} onChange={e => setAddress(p => ({...p, cep: e.target.value}))} className="input-field" placeholder="00000-000" />
                    </div>
                    <div>
                      <label className="block font-sans text-xs text-neutral-500 mb-1.5 tracking-wide">Número</label>
                      <input value={address.number} onChange={e => setAddress(p => ({...p, number: e.target.value}))} className="input-field" placeholder="123" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-sans text-xs text-neutral-500 mb-1.5 tracking-wide">Rua</label>
                      <input value={address.street} onChange={e => setAddress(p => ({...p, street: e.target.value}))} className="input-field" placeholder="Nome da rua" />
                    </div>
                    <div>
                      <label className="block font-sans text-xs text-neutral-500 mb-1.5 tracking-wide">Cidade</label>
                      <input value={address.city} onChange={e => setAddress(p => ({...p, city: e.target.value}))} className="input-field" placeholder="Sua cidade" />
                    </div>
                    <div>
                      <label className="block font-sans text-xs text-neutral-500 mb-1.5 tracking-wide">Estado</label>
                      <input value={address.state} onChange={e => setAddress(p => ({...p, state: e.target.value}))} className="input-field" placeholder="SP" />
                    </div>
                  </div>
                  <button onClick={handleNext} className="btn-primary mt-8 group">
                    Continuar para Entrega
                    <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.div>
              )}

              {currentStep === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-neutral-900 p-8 shadow-luxury"
                >
                  <h2 className="font-display text-2xl font-light text-neutral-800 dark:text-neutral-200 mb-6">
                    Método de Entrega
                  </h2>
                  <div className="space-y-3">
                    {[
                      { id: 'standard', label: 'Entrega Padrão', sub: '5-8 dias úteis', price: totalPrice >= 300 ? 'Grátis' : 'R$ 14,90' },
                      { id: 'express', label: 'Entrega Expressa', sub: '1-3 dias úteis', price: 'R$ 29,90' },
                    ].map(opt => (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between p-5 border-2 cursor-pointer transition-all ${
                          shipping === opt.id
                            ? 'border-nude-600 bg-nude-50 dark:bg-nude-950/20'
                            : 'border-neutral-200 dark:border-neutral-700 hover:border-nude-300'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            shipping === opt.id ? 'border-nude-600' : 'border-neutral-300'
                          }`}>
                            {shipping === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-nude-600" />}
                          </div>
                          <div>
                            <p className="font-sans text-sm font-medium text-neutral-800 dark:text-neutral-200">{opt.label}</p>
                            <p className="font-sans text-xs text-neutral-400">{opt.sub}</p>
                          </div>
                        </div>
                        <span className="font-display text-lg font-light text-nude-700 dark:text-nude-400">{opt.price}</span>
                        <input
                          type="radio"
                          className="sr-only"
                          checked={shipping === opt.id}
                          onChange={() => setShipping(opt.id as 'express' | 'standard')}
                        />
                      </label>
                    ))}
                  </div>
                  <button onClick={handleNext} className="btn-primary mt-8 group">
                    Continuar para Pagamento
                    <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.div>
              )}

              {currentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-neutral-900 p-8 shadow-luxury"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl font-light text-neutral-800 dark:text-neutral-200">
                      Pagamento
                    </h2>
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <Lock size={13} />
                      <span className="font-sans text-xs">Seguro</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-sans text-xs text-neutral-500 mb-1.5 tracking-wide">Número do Cartão</label>
                      <div className="relative">
                        <input
                          value={payment.cardNumber}
                          onChange={e => setPayment(p => ({...p, cardNumber: e.target.value}))}
                          className="input-field pr-12"
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                        />
                        <CreditCard size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block font-sans text-xs text-neutral-500 mb-1.5 tracking-wide">Nome no Cartão</label>
                      <input value={payment.cardName} onChange={e => setPayment(p => ({...p, cardName: e.target.value}))} className="input-field" placeholder="Nome como no cartão" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-xs text-neutral-500 mb-1.5 tracking-wide">Validade</label>
                        <input value={payment.expiry} onChange={e => setPayment(p => ({...p, expiry: e.target.value}))} className="input-field" placeholder="MM/AA" maxLength={5} />
                      </div>
                      <div>
                        <label className="block font-sans text-xs text-neutral-500 mb-1.5 tracking-wide">CVV</label>
                        <input value={payment.cvv} onChange={e => setPayment(p => ({...p, cvv: e.target.value}))} className="input-field" placeholder="000" maxLength={4} type="password" />
                      </div>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-neutral-400 flex items-center gap-1.5 mt-4">
                    <Lock size={11} />
                    Seus dados são criptografados com SSL de 256 bits.
                  </p>
                  <button onClick={handleFinish} className="btn-gold mt-8 w-full">
                    Confirmar Pedido — R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-900 p-6 shadow-luxury sticky top-28">
              <h3 className="font-display text-xl font-light text-neutral-800 dark:text-neutral-200 mb-6">
                Resumo do Pedido
              </h3>
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto scrollbar-hide">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-nude-50 dark:bg-neutral-800">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate">{item.product.name}</p>
                      <p className="font-sans text-xs text-neutral-400">Qtd: {item.quantity}</p>
                      <p className="font-sans text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                        R$ {(item.product.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-nude-100 dark:border-neutral-800 pt-4 space-y-2.5">
                <div className="flex justify-between font-sans text-sm text-neutral-600 dark:text-neutral-400">
                  <span>Subtotal</span>
                  <span>R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between font-sans text-sm text-neutral-600 dark:text-neutral-400">
                  <span>Frete</span>
                  <span>{shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-nude-100 dark:border-neutral-800">
                  <span className="font-sans font-semibold text-neutral-800 dark:text-neutral-200">Total</span>
                  <span className="font-display text-xl font-light text-neutral-900 dark:text-neutral-100">
                    R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
