import HeroSection from './components/HeroSection.tsx';
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
      <Event Sliders={Sliders} />
      <Review Reviews={Reviews} />
    </>
  );
};

export default App;
