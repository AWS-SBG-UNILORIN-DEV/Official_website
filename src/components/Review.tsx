import { useRef } from 'react';
import reviewImg from '/src/assets/reviewImg.png';
import prev from '/src/assets/prev.png';
import next from '/src/assets/next.png';
import '@splidejs/react-splide/css';

import { Splide, SplideSlide } from '@splidejs/react-splide';

const Review = ({ Reviews }) => {
  const reviewRef = useRef();

  const splideOptions = {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    padding: '1rem',
    arrows: false, //removing splide default arrow;
    pagination: false, // remove the dots under;
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
        gap: '0.5rem',
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
    <div className='flex w-full flex-col md:flex-row items-center justify-center gap-8 py-18 px-24'>
      <div className='review w-[616px] h-[400px] bg-[#1E242C] rounded-lg flex flex-col items-center justify-center p-4'>
        <Splide
          ref={reviewRef}
          options={splideOptions}
          className='flex-1 w-full flex items-center'
        >
          {Reviews.map((item, id) => (
            <SplideSlide className='text-center text-white ' key={id}>
              <div className='flex space-y-8 px-16 mb-6 text-center'>
                <h3 className='font-bold'>{item.name}</h3>
                <p className='font-light'> {item.levelCourse}</p>
              </div>
              <div className='px-16 flex-1 flex items-center'>
                <p className='text-center text-3xl '>"{item.description}"</p>
              </div>
            </SplideSlide>
          ))}
        </Splide>

        <div className='flex justify-between gap-4'>
          <img
            src={prev}
            alt=''
            className='prev bg-[#f5f5f5] p-3 rounded-full border border-[#9747FF] hover hover:bg-[#fff]'
            onClick={prevBtn}
          />
          <img
            src={next}
            alt=''
            className='next bg-[#9747FF] p-3 rounded-full hover hover:bg-[#7F00FF]'
            onClick={nextBtn}
          />
        </div>
      </div>

      <div className='image w-full md:w-[500px]'>
        <img
          src={reviewImg}
          alt=''
          className='rounded-lg w-full md:w-[400px] md:h-[400px]'
        />
      </div>
    </div>
  );
};

export default Review;
