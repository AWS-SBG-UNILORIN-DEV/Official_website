import inputVector from '/Frame.png';
import { motion } from 'motion/react';

const CallToAction = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    //   formData = ''
  };
  return (
    <div className='py-6 px-8 gap-6 min-h-screen flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          transition: { duration: 1.2, delay: 0.25 },
        }}
        viewport={{ once: true }}
        className='flex flex-col justify-center items-center gap-8 w-full lg:w-[90%] border border-3 border-[#D0B6F2]/60 rounded-xl py-30 shadow-[0_4px_20px_rgba(138,185,255,0.4)] bg-gradient-to-b from-[#D0B6F2] to-[#fff]'
      >
        <div className='text-center flex items-center justify-center flex-col gap-6 w-full'>
          <h2 className='font-alike text-3xl lg:text-3xl w-3/4 lg:w-2/4'>
            Join driven students and start building your cloud career with AWS
            today.
          </h2>
          <p className='font-manrope w-3/4 lg:w-2/4 text-[#000]/50'>
            Unlock your true potential and discover a world of opportunities
            that align with your skills, interests, and aspirations
          </p>
        </div>
        <div className='w-full'>
          <form action='' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 lg:flex-row items-center justify-center w-full'>
              <div className=' flex items-center justify-around gap-2 py-2 w-3/4 md:w-2/4 lg:w-1/4 text-center px-6 border border-[#9747FF]/50 rounded-full shadow-[0_4px_20px_rgba(138,185,255,0.4)]'>
                <span>
                  <img src={inputVector} />
                </span>
                <input
                  type='email'
                  placeholder='Your Mail Address'
                  className='border border-none font-manrope focus:outline-none'
                />
              </div>

              <button className='text-lg text-white bg-[#9747FF] rounded-full py-1 font-manrope px-6 cursor-pointer shadow-[0_4px_20px_rgba(138,185,255,0.4)] border hover:text-[#7f00ff] hover:bg-[#f5f5f5] hover:border-[#7f00ff]/80 transition duration-500 ease-in-out cursor-pointer hover:scale-105'>
                {' '}
                Join Now
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CallToAction;
