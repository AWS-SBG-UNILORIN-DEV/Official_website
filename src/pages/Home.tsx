import HeroSection from '../components/HeroSection';
import About from '../components/About.tsx';
import CommunitySection from '../components/CommunitySection';
import Team from '../components/Team';
import Event from '../components/Event';
import { Sliders } from '../assets/event.json';
import { Reviews } from '../assets/review.json';
import Review from '../components/Review';
import '@splidejs/splide/dist/css/splide.min.css';
import '../index.css';
import { FaqData } from '../assets/faqData.json';
import Faq from '../components/Faq';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className='font-alexandria '>
      <HeroSection />
      <About />
      <CommunitySection />
      <Team />
      <Event Sliders={Sliders} />
      <Review Reviews={Reviews} />
      <Faq FaqData={FaqData} />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;