import { useState, useEffect } from 'react';
import reviewImg from '/src/assets/reviewImg.png';
import prev from '/src/assets/prev.png';
import next from '/src/assets/next.png';

const Review = ({ Reviews }) => {
  const [review, setReview] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const extendedReviews = [Reviews[Reviews.length - 1], ...Reviews, ...Reviews];

  const prevBtn = () => {
    if (!isTransitioning) return;
    setReview(prev => prev - 1);
  };

  const nextBtn = () => {
    if (!isTransitioning) return;
    setReview(prev => prev + 1);
  };

  const handleTransitionEnd = () => {
    if (review === extendedReviews.length - 1) {
      setIsTransitioning(false);
      setReview(1);
    } else if (review === 0) {
      setIsTransitioning(false);
      setReview(Reviews.length);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      setReview(prev => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex w-full flex-col md:flex-row items-center justify-center gap-8 py-18 px-24'>
      <div className='review w-[616px] h-[400px] bg-[#1E242C] rounded-lg flex flex-col items-center justify-center gap-12 relative overflow-hidden'>
        <div
          className='flex transition-transform duration-500 '
          style={{
            width: '100%',
            transform: `translateX(-${review * 100}%)`,
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedReviews.map((item, id) => (
            <div
              // className={`${review === id ? 'block' : 'hidden'} text-white text-center`}
              className='w-full text-white text-center flex-shrink-0 '
              key={id}
            >
              <div className='flex space-y-8 px-16'>
                <h3 className='font-bold'>{item.name}</h3>
                <p className='font-light'> {item.levelCourse}</p>
              </div>
              <div className='px-16'>
                <p className='text-center text-3xl'>"{item.description}"</p>
              </div>
            </div>
          ))}
        </div>
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
            className='next bg-[#9747FF] p-3  rounded-full hover hover:bg-[#7F00FF]'
            onClick={nextBtn}
          />
        </div>
      </div>

      <div className='image '>
        <img
          src={reviewImg}
          alt=''
          className='rounded-lg w-[400px] h-[400px]'
        />
      </div>
    </div>
  );
};

export default Review;
