import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950 text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <span className="font-display text-2xl font-light tracking-[0.25em] uppercase text-white">Clean</span>
              <br />
              <span className="font-display text-sm font-light tracking-[0.5em] uppercase text-nude-400">Beauty</span>
            </div>
            <p className="font-sans text-sm leading-relaxed text-neutral-500 mb-6">
              Ciência e natureza em harmonia para uma pele radiante e saudável.
            </p>
            <div className="flex gap-4">
              {[Instagram, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-white hover:border-nude-500 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-white mb-5">Comprar</h4>
            <ul className="space-y-3">
              {['Todos os Produtos', 'Séruns', 'Hidratantes', 'Protetor Solar', 'Limpeza', 'Olhos'].map(item => (
                <li key={item}>
                  <Link to="/catalog" className="font-sans text-sm text-neutral-500 hover:text-nude-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-white mb-5">Empresa</h4>
            <ul className="space-y-3">
              {['Sobre Nós', 'Nossa História', 'Ingredientes', 'Sustentabilidade', 'Imprensa', 'Carreiras'].map(item => (
                <li key={item}>
                  <a href="#" className="font-sans text-sm text-neutral-500 hover:text-nude-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-white mb-5">Suporte</h4>
            <ul className="space-y-3">
              {['FAQ', 'Frete e Entregas', 'Trocas e Devoluções', 'Rastreamento', 'Fale Conosco', 'Política de Privacidade'].map(item => (
                <li key={item}>
                  <a href="#" className="font-sans text-sm text-neutral-500 hover:text-nude-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-neutral-600">
            © 2025 Clean Beauty. Todos os direitos reservados.
          </p>
          <p className="font-sans text-xs text-neutral-600 flex items-center gap-1.5">
            Feito com <Heart size={11} className="text-nude-500 fill-nude-500" /> no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}