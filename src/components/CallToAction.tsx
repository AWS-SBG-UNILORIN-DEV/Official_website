import { motion } from 'motion/react';

const CallToAction = () => {
  return (
    <div
      id='Register'
      className='py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 gap-6 flex items-center justify-center'
    >
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
          <h2 className='text-3xl lg:text-4xl w-3/4 lg:w-3/4'>
            Join driven students and start building your cloud career with AWS
            today.
          </h2>
          <p className='font-manrope w-3/4 lg:w-2/4 text-[#000]/50'>
            Unlock your true potential and discover a world of opportunities
            that align with your skills, interests, and aspirations
          </p>
        </div>
        <div className='w-full flex items-center justify-center'>
          <button
            className='text-lg text-white bg-[#9747FF] rounded-full py-3 font-manrope px-12 cursor-pointer shadow-[0_4px_20px_rgba(138,185,255,0.4)] border hover:text-[#7f00ff] hover:bg-[#f5f5f5] hover:border-[#7f00ff]/80 transition duration-400 ease-in-out cursor-pointer '
            onClick={() =>
              window.open(
                // 'https://www.meetup.com/aws-cloud-club-at-the-university-of-ilorin/',
                // '_blank'
                "https://chat.whatsapp.com/GE6GMiixowLBGQfvsrUDOE"
              )
            }
          >
            {' '}
            Join Now
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CallToAction;
