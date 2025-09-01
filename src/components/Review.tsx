import { useRef } from 'react';
import next from '/src/assets/next.png';
import prev from '/src/assets/prev.png';
import '@splidejs/react-splide/css/core';
import reviewImg from '/src/assets/reviewImg.png';

import { Splide, SplideSlide } from '@splidejs/react-splide';

interface Review {
  name: string;
  levelCourse: string;
  description: string;
}

interface ReviewsProps {
  Reviews: Review[];
}

const Review = ({ Reviews }: ReviewsProps) => {
  console.log(Reviews);
  const reviewRef = useRef<any>(null);

  const reviewOptions = {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    padding: '1rem',
    arrows: false, //removing the default library next and previous button
    pagination: false, //removing the default library dots under the slide
    breakpoints: {
      1024: {
        perPage: 1,
        gap: '0.8rem',
      },
      768: {
        perPage: 1,
        gap: '0.5rem',
      },
      576: {
        perPage: 1,
        gap: '0.7rem',
      },
    },
  };

  const prevBtn = () => {
    if (reviewRef.current) {
      reviewRef.current.go('<');
    }
  };

  const nextBtn = () => {
    if (reviewRef.current) {
      reviewRef.current.go('>');
    }
  };

  return (
    <div className='w-full py-12 px-8'>
      <div className='flex flex-col md:flex-wrap space-y-6'>
        <div className='title'>
          <h1>What Our Members Say</h1>
        </div>

        <div className='review-slide-image-section flex flex-col md:flex-row gap-6'>
          <div className='review-slider-section bg-[#1E242C] w-full md:w-[600px] rounded-md text-white flex flex-col items-center justify-center p-8'>
            <Splide
              ref={reviewRef}
              options={reviewOptions}
              className='flex-1 w-full flex items-center justify-center'
            >
              {Reviews.map((item, id) => (
                <SplideSlide key={id} className='text-center text-white h-full'>
                  <div className='flex flex-col'>
                    <div className='flex w-full'>
                      <h3 className='font-bold'>{item.name}</h3>
                      <p className='font-normal'>{item.levelCourse}</p>
                    </div>
                    <div>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </SplideSlide>
              ))}
            </Splide>

            <div className='flex gap-4 items-center justify-center pt-8'>
              <img
                src={prev}
                onClick={prevBtn}
                alt='previous button'
                className='prev bg-[#f5f5f5] p-2 rounded-full border border-[#9747FF] hover:bg-[#fff] cursor-pointer transition-colors'
              />
              <img
                src={next}
                onClick={nextBtn}
                alt='next button'
                className='next bg-[#9747FF] p-2 rounded-full hover:bg-[#7F00FF] cursor-pointer transition-colors'
              />
            </div>
          </div>

          <div className='image-container'>
            <img src={reviewImg} className='rounded-md' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
