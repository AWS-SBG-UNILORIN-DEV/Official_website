import hero_image from '/img-1.jpg';
import arrow from '/src/assets/arrow.png';
import group from '/src/assets/Group.png';
import Header from './Header';
import { motion } from 'motion/react';

const HeroSection = () => {
  return (
    <div
      id='Home'
      className='flex flex-col justify-center items-center py-15 md:pt-18 px-4 gap-6 w-full'
      style={{
        background: `radial-gradient(ellipse 100% 200% at center 97%,
                        #d8caeaff 0%, rgba(216, 209, 224, 0.6) 25%,
                        rgba(151, 71, 255, 0.2) 50%, transparent 70%), white`,
      }}
    >
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true }}
        className='bg-white rounded-full shadow-[0 4px 20px rgba(0, 0, 0, 0.05)] px-4 py-1 mt-16'
      >
        <h3 className='font-light text-[#002B6B] py-1 px-2 flex gap-4'>
          <img src={group} alt='Community icon' />
          Where Cloud Builders Unite
        </h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 1, delay: 0.1 },
        }}
        viewport={{ once: true }}
      >
        <h1 className='font-alexandria font-bold text-3xl md:text-5xl lg:text-5xl text-center text-[#002B6B]'>
          {' '}
          AWS STUDENT BUILDERS GROUP
        </h1>
        <h1 className='font-alexandria font-bold text-3xl md:text-5xl lg:text-5xl  text-center text-[#002B6B]'>
          {' '}
          UNIVERSITY OF ILORIN
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 0.5 },
        }}
        viewport={{ once: true }}
      >
        <p className='text-[#414D60] text-center'>
          Empowering Students With AWS Technology
        </p>
      </motion.div>

      <div className='flex flex-col md:flex-row gap-3 md:gap-8 w-full sm:w-3/4 md:w-auto items-center justify-center'>
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 1 },
          }}
          viewport={{ once: true }}
          onClick={() =>
            window.open(
              'https://www.meetup.com/aws-cloud-club-at-the-university-of-ilorin/',
              '_blank'
            )
          }
          className='bg-[#9747FF] py-2 px-5 rounded-full text-white flex gap-3 transition hover hover:bg-[#f5f5f5] border hover:text-[#7f00ff] hover:border-[#7f00ff]/80 transition duration-400 ease-in-out cursor-pointer'
        >
          {' '}
          Join Meet Up <img className='bg-white rounded-full' src={arrow} />
        </motion.button>
        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 1 },
          }}
          viewport={{ once: true }}
          className='bg-[#9747FF] py-2 px-5 rounded-full text-white flex gap-3 transition hover hover:bg-[#f5f5f5] border hover:text-[#7f00ff] hover:border-[#7f00ff]/80 transition duration-400 ease-in-out cursor-pointer'
          // href='#Register'
          href='https://chat.whatsapp.com/GE6GMiixowLBGQfvsrUDOE'
        >
          Join Community <img className='bg-white rounded-full' src={arrow} />
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        }}
        viewport={{ once: true }}
        className='w-[90%] md:w-3/4 flex items-center justify-center'
      >
        <img loading='lazy' src={hero_image} className='rounded-2xl' />
      </motion.div>
    </div>
  );
};

export default HeroSection;
