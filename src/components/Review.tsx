import { useEffect, useRef } from 'react';
import next from '/src/assets/next.png';
import prev from '/src/assets/prev.png';
import reviewImg from '/src/assets/reviewImg.png';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import type { Splide as SplideClass } from '@splidejs/splide'; // Splide core type
import { motion } from 'motion/react';

interface Review {
  name: string;
  levelCourse: string;
  description: string;
}

interface ReviewsProps {
  Reviews: Review[];
}

const Review = ({ Reviews }: ReviewsProps) => {
  // console.log(Reviews);

  const reviewRef = useRef<SplideClass | null>(null);

  useEffect(() => {
    if (reviewRef.current) {
      // console.log('Splide Mount:', reviewRef.current);
    }
  });

  const reviewOptions = {
    type: 'loop' as const,
    perPage: 1,
    perMove: 1,
    padding: '0',
    arrows: false, //removing the default library next and previous button
    pagination: false, //removing the default library dots under the slide
    breakpoints: {
      1024: { perPage: 1, gap: '6rem' },
      768: { perPage: 1, gap: '0.5rem' },
      576: { perPage: 1, gap: '0.7rem' },
    },
  };

  const prevBtn = () => reviewRef.current?.go('<');
  const nextBtn = () => reviewRef.current?.go('>');

  return (
    <div className='w-full py-8 px-4 sm:px-6 lg:px-8 lg:py-16'>
      <div className='flex flex-col space-y-6 lg:space-y-8 max-w-8xl mx-auto'>
        <div className='title'>
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            whileInView={{
              opacity: 1,
              y: 1,
              transition: { duration: 1.2, delay: 0.25 },
            }}
            viewport={{ once: true }}
            className='text-2xl lg:pl-16 font-alexandria font-light'
          >
            What Our Members Say
          </motion.h1>
        </div>

        <div className=' flex flex-col lg:flex-row gap-6 lg:gap-6 items-center justify-start lg:pl-16 lg:items-stretch lg:w-6xl'>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { duration: 1, delay: 0.25 },
            }}
            viewport={{ once: true }}
            className='bg-[#1E242C] rounded-lg text-white flex flex-col py-6 lg:py-8 px-6 lg:px-8 w-full lg:flex-1 lg:min-h-[400px] justify-between lg:max-w-xl overflow-hidden'
          >
            {/* <div className='flex-1 mb-6 lg:mb-8'> */}
            <Splide
              //   ref={splideRef}
              // onSplideMount={splide => setSplideInstance(splide)}
              options={reviewOptions}
              // onSplideMount={SplideInstance => setReview(SplideInstance)}
              ref={reviewRef}
              className='flex-1 w-full flex items-center justify-center'
            >
              {Reviews.map((item, id) => (
                <SplideSlide
                  key={id}
                  className='text-center text-white h-full flex items-center'
                >
                  <div className='flex flex-col gap-4 lg:gap-6 w-full'>
                    <div className='flex items-center justify-center gap-4 w-full'>
                      <h3 className='font-semibold text-lg'>
                        {item.name}{' '}
                        <span className='text-sm text-gray-300 font-normal'>
                          {item.levelCourse}
                        </span>
                      </h3>
                    </div>
                    <div className=''>
                      <p className='font-alike font-light text-2xl mb-4 md:mb-0 lg:text-3xl'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
            {/* </div> */}

            <div className='flex gap-3 items-center justify-center'>
              <button
                onClick={prevBtn}
                className='prev bg-[#f5f5f5] p-2 rounded-full border border-[#9747FF] hover:bg-[#fff] cursor-pointer hover:scale-120 transition-all duration-700 ease-in-out'
              >
                <img src={prev} alt='previous-btn-image' />
              </button>
              <button
                onClick={nextBtn}
                className='next bg-[#9747FF] p-2 rounded-full hover:bg-[#7F00FF] cursor-pointer hover:scale-120 transition-all duration-700 ease-in-out'
              >
                <img src={next} alt='next-btn-image' />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { duration: 1.2, delay: 0.5 },
            }}
            viewport={{ once: true }}
            className='image-container lg:w-96 xl:w-[450px] w-full'
          >
            <img
              src={reviewImg}
              className='rounded-lg w-full h-64 sm:h-80 lg:h-[400px] object-cover'
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Review;
