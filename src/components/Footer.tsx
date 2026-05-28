import icon from '/icon-3.png';
import { motion } from 'motion/react';
import { IoLogoInstagram } from 'react-icons/io';
import { AiOutlineYoutube } from 'react-icons/ai';
import { FaXTwitter } from 'react-icons/fa6';
import { IoLogoLinkedin } from 'react-icons/io5';
import { FaMeetup } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className='font-manrope py-8 px-8 gap-6 min-h-90 flex items-center justify-center bg-[#1e242c] text-white'>
      <div className='flex flex-col justify-between gap-8 w-full lg:w-[90%] '>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{
            opacity: 1,
            y: 1,
            transition: { duration: 1, delay: 0.25 },
          }}
          viewport={{ once: true }}
          className='flex flex-col md:flex-row justify-between'
        >
          {/* And Footer section */}
          {/* <h1>This is Footer Section</h1> */}
          <div className='flex flex-col items-start mb-16'>
            <div className='mb-4'>
              <img src={icon} className='w-50' />
            </div>
            <div>
              <p className='font-manrope'>
                P.M.B. 1515, Ilorin, kwara state, Nigeria <br />
                <a href='tel:+2348026724015'>
                  <span className='font-bold'>Phone: </span>08026724015
                </a>{' '}
                <br />
                <a href='mailto:awsunilorin@gmail.com'>
                  <span className='font-bold'>Email: </span>
                  awsunilorin@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className='mb-12'>
            <h4 className='mb-4 font-bold'>Quick Links</h4>
            <div className='flex flex-col gap-3'>
              <a href='#Home'>Home</a>
              <a href='#About'>About Us</a>
              <a href='#Community'>Community</a>
              <a href='#contact'>Contact Us</a>
            </div>
          </div>

          <div className='mb-12'>
            <h4 className='mb-4 font-bold'>Others</h4>
            <div className='flex flex-col gap-3'>
              <a href='#Community'>Community</a>
              <a href='https://www.meetup.com/aws-cloud-club-the-university-of-ilorin/'>
                Meet Up
              </a>
              <a href='#Team'>Our Team</a>
              {/* <a href=''>About Us</a> */}
            </div>
          </div>

          <div className='mb-12'>
            <h4 className='mb-4 font-bold'>About Us</h4>
            <div className='flex flex-col gap-3'>
              <a href='#About'>Our Mission</a>
              {/* <a href='#Review'>What Members Say</a> */}
              <a href='#Review'>Our Impact</a>
            </div>
          </div>
        </motion.div>

        {/* Copyright section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{
            opacity: 1,
            y: 1,
            transition: { duration: 1.2, delay: 0.25 },
          }}
          viewport={{ once: true }}
          className='flex items-start justify-between flex-col gap-4 lg:flex-row'
        >
          <div>
            <p>&copy; 2025. All Rights Reserved</p>
          </div>
          <div className='flex gap-4'>
            <a
              href='https://www.meetup.com/aws-cloud-club-the-university-of-ilorin/'
              className='cursor-pointer cursor-pointer hover hover:scale-115 transition-all duration-500'
            >
              <FaMeetup size={25} />
            </a>
            <a
              href='https://www.instagram.com/awsunilorin'
              className='cursor-pointer hover hover:scale-115 transition-all duration-500'
            >
              <IoLogoInstagram size={25} />
            </a>
         
            <a
              href='https://x.com/AwsUniloriN'
              className='cursor-pointer cursor-pointer hover hover:scale-115 transition-all duration-500'
            >
              <FaXTwitter size={25} />
            </a>

            <a
              href='https://youtube.com/@awsunilorin'
              className='cursor-pointer cursor-pointer hover hover:scale-115 transition-all duration-500'
            >
              <AiOutlineYoutube size={25} />
            </a>
            <a
              href='https://www.linkedin.com/in/aws-cloud-club-unilorin-a9095a270'
              className='cursor-pointer cursor-pointer hover hover:scale-115 transition-all duration-500'
            >
              <IoLogoLinkedin size={25} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;
