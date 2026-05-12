import Hero from '../sections/Hero';
import FeaturedProducts from '../sections/FeaturedProducts';
import About from '../sections/About';
import BannerCTA from '../sections/BannerCTA';
import Testimonials from '../sections/Testimonials';
import Newsletter from '../sections/Newsletter';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <About />
      <BannerCTA />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
