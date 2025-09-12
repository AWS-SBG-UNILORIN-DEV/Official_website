import HeroSection from './components/HeroSection';
import About from './components/About.tsx';
import CommunitySection from './components/CommunitySection';
import Event from './components/Event';
import { Sliders } from './assets/event.json';
import { Reviews } from './assets/review.json';
import Review from './components/Review';
import '@splidejs/splide/dist/css/splide.min.css';
import './index.css';

const App = () => {
  return (
    <>
      <HeroSection />
      <About />
      <CommunitySection />
      <Event Sliders={Sliders} />
      <Review Reviews={Reviews} />
    </>
  );
};

export default App;
