import { useRef } from 'react';
import next from '/src/assets/next.png';
import prev from '/src/assets/prev.png';
import arrow from '/src/assets/arrow-right-up.png';
import '@splidejs/react-splide/css';

import { Splide, SplideSlide } from '@splidejs/react-splide';

const Event = ({ Sliders }) => {
  const splideRef = useRef();

  const splideOptions = {
    type: 'loop',
    perPage: 3,
    perMove: 1,
    padding: '1rem',
    arrows: false, //disabled the library default arrow for my own defined arrow
    pagination: false, //removing the dots under
    breakpoints: {
      1024: {
        perPage: 2,
        gap: '4em',
      },
      768: {
        perPage: 2,
        gap: '0.5rem',
      },
      576: {
        perPage: 1,
        gap: '0.5rem',
      },
    },
  };

  const prevBtn = () => {
    if (splideRef.current) {
      splideRef.current.go('<');
    }
  };

  const nextBtn = () => {
    if (splideRef.current) {
      splideRef.current.go('>');
    }
  };

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

      <div className='w-[90%]'>
        <Splide ref={splideRef} options={splideOptions}>
          {Sliders.map((item, id) => (
            <SplideSlide key={id} className='gap-10'>
              <img src={item.src} className='w-full shadow-xl' />
              <div className='bg-[#f5f5f5] absolute w-[280px] my-[-100px] mx-[30px] z-100 flex space-x-6 py-2 px-6 rounded-md shadow-sm items-center justify-around'>
                <div>
                  <h3 className='font-bold'>{item.date}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <img
                    src={arrow}
                    alt='view Event'
                    className='bg-[#9747FF] p-1 rounded-full hover hover:bg-[#7F00FF]'
                  />
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default Event;
