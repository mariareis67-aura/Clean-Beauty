import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function BannerCTA() {
  return (
    <section className="relative py-0 overflow-hidden">
      <div className="relative h-[60vh] min-h-[400px] flex items-center">
        <img
          src="https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nude-900/80 to-nude-800/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-lg"
          >
            <p className="section-subtitle text-nude-300 mb-4">Rotina Premium</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-tight mb-6">
              Seu Kit de
              <br />
              <em>Skincare Completo</em>
            </h2>
            <p className="font-sans text-white/70 mb-8 leading-relaxed">
              Monte sua rotina de beleza personalizada com os produtos que mais amamos.
              Frete grátis acima de R$ 300.
            </p>
            <Link to="/catalog" className="btn-gold group inline-flex">
              Montar Minha Rotina
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
