import { useRef, useEffect } from 'react';
import next from '/src/assets/next.png';
import prev from '/src/assets/prev.png';
import arrow from '/src/assets/arrow-right-up.png';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import type { Splide as SplideClass } from '@splidejs/splide';
import { motion } from 'motion/react';

interface SliderReview {
  name: string;
  src: string;
  description: string;
  date: string;
  link: string;
}

interface SliderProps {
  Sliders: SliderReview[];
}

const Event = ({ Sliders }: SliderProps) => {
  const sliderRef = useRef<SplideClass | null>(null);

  const splideOptions = {
    type: 'loop',
    perPage: 3,
    perMove: 1,
    gap: '2em',
    padding: '1rem',
    arrows: false,
    pagination: false,
    breakpoints: {
      1024: { perPage: 2, gap: '4em' },
      768: { perPage: 2, gap: '0.5rem' },
      576: { perPage: 1, gap: '0.5rem' },
    },
  };

  useEffect(() => {
    if (sliderRef.current) {
      // console.log('Splide Mounted:', sliderRef.current);
    }
  });

  const prevBtn = () => sliderRef.current?.go('<');
  const nextBtn = () => sliderRef.current?.go('>');

  return (
    <div
      id='Event'
      className='flex flex-col justify-center items-center py-6 px-2 lg:px-8 gap-6 min-h-screen w-full'
    >
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-[60px] font-normal'
        >
          Events
        </motion.h1>
      </div>

      <div className='flex sm:gap-60 items-start md:w-[90%] justify-between'>
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{
            opacity: 1,
            y: 1,
            transition: { duration: 1.2, delay: 0.25 },
          }}
          viewport={{ once: true }}
          className='w-full text-left font-normal text-2xl'
        >
          Our Upcoming Events
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 1.6 } }}
          viewport={{ once: true }}
          className='flex justify-between gap-4'
        >
          <img
            src={prev}
            className='prev w-2/4 h-2/4 md:w-full md:h-full bg-[#f5f5f5] p-2 rounded-full border border-[#9747FF] hover hover:bg-[#fff] hover:scale-120 transition-all duration-700 ease-in-out'
            onClick={prevBtn}
          />
          <img
            src={next}
            className='next w-2/4 h-2/4 md:w-full md:h-full bg-[#9747FF] p-2 rounded-full hover hover:bg-[#7F00FF] hover:scale-120 transition-all duration-700 ease-in-out'
            onClick={nextBtn}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 1, delay: 0.75 },
        }}
        viewport={{ once: true }}
        className='w-[90%]'
      >
        <Splide options={splideOptions} ref={sliderRef}>
          {Sliders.map((item, id) => (
            <SplideSlide key={id}>
              <a href={item.link}>
                <img src={item.src} className='w-full shadow-xl rounded-md' />
                <div className='bg-[#f5f5f5] absolute lg:w-[280px] my-[-100px] mx-[30px] z-100 flex space-x-6 py-2 px-6 rounded-md shadow-sm items-center justify-between lg:justify-around'>
                  <div>
                    <h3 className='font-bold text-xs'>{item.date}</h3>
                    <p className='text-xs'>{item.description}</p>
                  </div>
                  <div>
                    <img
                      src={arrow}
                      alt='view Event'
                      className='bg-[#9747FF] p-1 rounded-full hover cursor-pointer border border-[#f5f5f5] hover:border-[#7F00FF]/80 hover:scale-120 transition-all duration-700 ease-in-out'
                    />
                  </div>
                </div>
              </a>
            </SplideSlide>
          ))}
        </Splide>
      </motion.div>
    </div>
  );
};

export default Event;
