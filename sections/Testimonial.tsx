import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/products';

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-subtitle mb-3"
          >
            Depoimentos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-neutral-900 dark:text-neutral-100"
          >
            O que dizem
            <br />
            <em>nossas clientes</em>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative p-8 bg-nude-50 dark:bg-neutral-900 group hover:bg-nude-100 dark:hover:bg-neutral-800 transition-colors duration-300"
            >
              <Quote
                size={32}
                className="text-nude-200 dark:text-nude-800 mb-4"
              />
              <div className="flex mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} className="fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                "{t.comment}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-sans text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    {t.name}
                  </p>
                  <p className="font-sans text-xs text-nude-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-8 lg:gap-16"
        >
          {[
            { value: '50.000+', label: 'Clientes Satisfeitas' },
            { value: '4.9/5', label: 'Avaliação Média' },
            { value: '12', label: 'Prêmios de Beleza' },
            { value: '5 Anos', label: 'de Excelência' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-light text-nude-600 dark:text-nude-400">{stat.value}</p>
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-neutral-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
