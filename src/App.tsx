import HeroSection from './components/HeroSection.tsx';
import Event from './components/Event'
import { Sliders } from './assets/event.json'


const App = () => {
  return (
    <>
      <HeroSection />
      <Event Sliders = { Sliders } />
    </>
  );
}

export default App;
