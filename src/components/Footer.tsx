// import React from 'react'
import instagram from '/instagram.png';
import skype from '/skype.png';
import tiktok from '/tiktok.png';
import youtube from '/youtube.png';
import icon from '/Icon.png';
import { motion } from 'motion/react';

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
          className='flex flex-col md:flex-row justify-between'
        >
          {/* <h1>This is Footer Section</h1> */}
          <div className='flex flex-col items-start mb-16'>
            <div>
              <img src={icon} />
            </div>
            <div>
              <p className='font-manrope'>
                P.M.B. 1515, Ilorin, kwara state, Nigeria <br />
                <span className='font-bold'>Phone: </span>843-496-7759 <br />
                <span className='font-bold'>Fax: </span>02-222264303 <br />
                <span className='font-bold'>Email: </span> info@mastershub.com
              </p>
            </div>
          </div>

          <div className='mb-12'>
            <h4 className='mb-4 font-bold'>Quick Links</h4>
            <div className='flex flex-col gap-3'>
              <a href=''>Home</a>
              <a href=''>About Us</a>
              <a href=''>Community</a>
              <a href=''>Contact Us</a>
            </div>
          </div>

          <div className='mb-12'>
            <h4 className='mb-4 font-bold'>Others</h4>
            <div className='flex flex-col gap-3'>
              <a href=''>Community</a>
              <a href=''>Meet Up</a>
              <a href=''>Our Team</a>
              <a href=''>About Us</a>
            </div>
          </div>

          <div className='mb-12'>
            <h4 className='mb-4 font-bold'>About Us</h4>
            <div className='flex flex-col gap-3'>
              <a href=''>Our Mission</a>
              <a href=''>What Members Say</a>
              <a href=''>Our Impact</a>
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
          className='flex items-start justify-between flex-col gap-4 lg:flex-row'
        >
          <div>
            <p>&copy; 2025. All Rights Reserved</p>
          </div>
          <div className='flex gap-4'>
            <a
              href=''
              className='cursor-pointer hover hover:scale-115 transition-all duration-500'
            >
              <img src={instagram} />
            </a>
            <a
              href=''
              className='cursor-pointer cursor-pointer hover hover:scale-115 transition-all duration-500'
            >
              <img src={skype} />
            </a>
            <a
              href=''
              className='cursor-pointer cursor-pointer hover hover:scale-115 transition-all duration-500'
            >
              <img src={tiktok} />
            </a>
            <a
              href=''
              className='cursor-pointer cursor-pointer hover hover:scale-115 transition-all duration-500'
            >
              <img src={youtube} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;
