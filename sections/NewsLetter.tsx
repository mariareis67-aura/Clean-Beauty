import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="py-20 lg:py-28 bg-neutral-900 dark:bg-neutral-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-nude-400 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-gold-400 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-subtitle text-nude-400 mb-4"
        >
          Comunidade Clean
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-light text-white leading-tight mb-4"
        >
          Receba dicas exclusivas
          <br />
          <em>de beleza</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans text-neutral-400 mb-10"
        >
          Assine nossa newsletter e ganhe 10% de desconto na primeira compra.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 text-green-400"
            >
              <CheckCircle size={40} />
              <p className="font-display text-xl font-light">Bem-vinda à família Clean Beauty!</p>
              <p className="font-sans text-sm text-neutral-400">
                Seu cupom de 10% foi enviado para {email}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-0 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="flex-1 px-5 py-4 bg-white/5 border border-white/10 text-white placeholder-neutral-500 font-sans text-sm focus:outline-none focus:border-nude-400 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-4 font-sans text-sm font-medium tracking-widest uppercase text-white flex items-center gap-2 transition-all duration-200 hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #c4955e, #f59e0b)' }}
              >
                <Send size={14} />
                Assinar
              </button>
            </form>
          )}
          <p className="font-sans text-xs text-neutral-600 mt-4">
            Sem spam. Cancele quando quiser.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
