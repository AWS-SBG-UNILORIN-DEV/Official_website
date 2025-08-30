import { useState, useEffect } from 'react';
import next from '/src/assets/next.png';
import prev from '/src/assets/prev.png';
import arrow from '/src/assets/arrow-right-up.png';

import { Splide, SplideSlide } from '@splidejs/react-splide';
// import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

// new Splide('.splide').mount({ AutoScroll });

// Event Card Slider code

const Event = ({ Sliders }) => {
  // eventString: typeof EventString = null;

  const [eventSlider, setEventSlider] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const extendedSlider = [Sliders[Sliders.length - 1], ...Sliders, ...Sliders];
  // const spreadSlider = [...Sliders];
  // console.log(spreadSlider[2]);

  const prevBtn = () => {
    if (!isTransitioning) return;
    setEventSlider(prev => prev - 1);
  };

  const nextBtn = () => {
    if (!isTransitioning) return;
    setEventSlider(prev => prev + 1);
  };

  const handleTransitionEnd = () => {
    if (eventSlider === extendedSlider.length - 1) {
      setIsTransitioning(false);
      setEventSlider(1);
    } else if (eventSlider === 0) {
      setIsTransitioning(false);
      setEventSlider(1);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timeout);
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setEventSlider(prev => (prev === Sliders.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(interval);
  }, [Sliders.length]);

  return (
    <div className='flex flex-col justify-center items-center py-12 px-4 gap-6 min-h-screen w-full'>
      <div>
        <h2 className='text-[60px] font-normal'>Events</h2>
      </div>

      <div className='flex items-center w-[80%] justify-between'>
        <div>
          <p className='font-bold text-2xl'>Our Upcoming Events</p>
        </div>

        <div className='flex justify-between gap-4'>
          <img
            src={prev}
            className='prev bg-[#f5f5f5] p-3 rounded-full border border-[#9747FF] hover hover:bg-[#fff] '
            onClick={prevBtn}
          />
          <img
            src={next}
            className='next bg-[#9747FF] p-3  rounded-full hover hover:bg-[#7F00FF]'
            onClick={nextBtn}
          />
        </div>
      </div>

      <div className='flex items-center justify-end w-[90%] overflow-hidden'>
        <div
          className='flex transition-transform duration-700 ease-in-out'
          style={{
            width: '100%',
            // transform: `translateX(-${eventSlider * (100 / 3)}%)`,
            transform: `translateX(0%)`,
            // transform: `translateX(0%)`,
          }}
        >
          {[0, 1, 2].map(offset => {
            const idx = (eventSlider + offset) % Sliders.length;
            const item = extendedSlider[idx];
            // })}
            return (
              <div
                key={idx}
                className='w-2/5 min-w-[320px] mx-2'
                style={{
                  // opacity: offset < 2 ? 1 : 0.5,
                  transform: `translateX(-${eventSlider * 100} %)`,
                  // transition: 'opacity 0.3s'
                  transition: isTransitioning
                    ? 'transform 0.5s ease-in-out'
                    : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                <img src={item.src} className='w-full shadow-xl' />
                <div className='bg-[#f5f5f5] absolute w-[280px] my-[-100px] mx-[30px] z-100 flex space-x-6 py-2 px-6 rounded-md shadow-sm items-center justify-around'>
                  <div>
                    <h3 className='font-bold'>{item.date}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <img
                      src={arrow}
                      className='bg-[#9747FF] p-1 rounded-full hover hover:bg-[#7F00FF]'
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Event;
