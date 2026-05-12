import { motion } from 'framer-motion';
import { Leaf, Shield, Award, Droplets } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Ingredientes Naturais',
    description: 'Selecionamos os melhores ativos da natureza para compor nossas fórmulas exclusivas.',
  },
  {
    icon: Shield,
    title: 'Clinicamente Testado',
    description: 'Todos os produtos são testados dermatologicamente e aprovados por especialistas.',
  },
  {
    icon: Award,
    title: 'Certificações Premium',
    description: 'Certificados Vegan, Cruelty-Free e com embalagens 100% recicláveis.',
  },
  {
    icon: Droplets,
    title: 'Fórmulas Concentradas',
    description: 'Concentrações otimizadas de ativos para máxima eficácia com menor quantidade.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-nude-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Images */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative z-10"
            >
              <img
                src="https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Sobre a Clean Beauty"
                className="w-full aspect-[3/4] object-cover shadow-luxury-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute -bottom-8 -right-6 w-2/3 aspect-square hidden md:block"
            >
              <img
                src="https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Ingredientes naturais"
                className="w-full h-full object-cover shadow-luxury"
              />
            </motion.div>
            <div className="absolute -bottom-4 left-8 w-full h-full border-2 border-nude-200 dark:border-nude-800 -z-10 hidden md:block" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-subtitle mb-4"
            >
              Nossa Essência
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-neutral-900 dark:text-neutral-100 mb-6"
            >
              Beleza que
              <br />
              <em>Transforma</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4"
            >
              Nascemos da crença de que beleza verdadeira vem de dentro para fora. Cada produto Clean Beauty
              é uma experiência sensorial cuidadosamente formulada para nutrir, proteger e revelar o melhor da sua pele.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10"
            >
              Combinamos ciência de ponta com ativos naturais premium em fórmulas inteligentes,
              transparentes e eficazes. Porque você merece o melhor — e a sua pele também.
            </motion.p>

            <div className="grid grid-cols-2 gap-6">
              {values.map((val, i) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i + 0.3 }}
                  className="group"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-nude-100 dark:bg-nude-900/50 mb-3 group-hover:bg-nude-200 dark:group-hover:bg-nude-800/50 transition-colors">
                    <val.icon size={18} className="text-nude-600 dark:text-nude-400" />
                  </div>
                  <h4 className="font-sans text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                    {val.title}
                  </h4>
                  <p className="font-sans text-xs text-neutral-500 dark:text-neutral-500 leading-relaxed">
                    {val.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
