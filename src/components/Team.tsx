// import React from 'react';
// import
import cloudCaptain from '/src/assets/abdulrahman-Team_lead.png';
import coCaptain from '/src/assets/co-captain.png';
import techLead from '/src/assets/toheeb-tech-lead.png';
import designLead from '/src/assets/yusuf-design-lead.png';
import managementLead from '/src/assets/tobi-management-lead.png';
import socialLead from '/src/assets/lateefat-social-lead.png';
import contentLead from '/src/assets/victor-content-lead.png';

import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
// import { FaLinkedinIn } from 'react-icons/fa6'; <FaLinkedinIn />
import { RiLinkedinLine } from 'react-icons/ri';
import { motion } from 'motion/react';

interface TeamLeads {
  id: number;
  name: string;
  src: string;
  description: string;
  xIconLink: string;
  instagramLink: string;
  linkedInLink: string;
}

const TeamLead: TeamLeads[] = [
  {
    id: 1,
    name: 'ILYAS AYODEJI RUFAI',
    description: 'Co-Cloud Captain',
    xIconLink: '',
    instagramLink: '',
    linkedInLink: 'https://linkedin.com/in/rufilboss',
    src: coCaptain,
  },

  {
    id: 2,
    name: 'AKANDE TOHEEB',
    description: 'Technical and Operations Lead',
    xIconLink: '',
    instagramLink: '',
    linkedInLink: 'https://www.linkedin.com/in/akande-olalekan-2a69a0221/',
    src: techLead,
  },

  {
    id: 3,
    name: 'ABDULKABIR YUSUF',
    description: 'Design Team Lead',
    xIconLink: 'https://x.com/kabiryusuf24?s=21',
    instagramLink: '',
    linkedInLink: '',
    src: designLead,
  },

  {
    id: 4,
    name: 'TOBILOBA ISAIAH ADEBISI',
    description: 'Management Team Lead',
    xIconLink: '',
    instagramLink: '',
    linkedInLink: 'https://linkedIn.com/in/tobiloba-adebisi',
    src: managementLead,
  },

  {
    id: 5,
    name: 'LATEEFAT BELLO',
    description: 'Social Media Lead',
    xIconLink: '',
    instagramLink: '',
    linkedInLink: '',
    src: socialLead,
  },

  {
    id: 6,
    name: 'VICTOR AGBAYEKHAI O.',
    description: 'Content Team Lead',
    xIconLink: '',
    instagramLink: '',
    linkedInLink: 'https://www.linkedin.com/in/victor-agbayekhai-a210b3238/',
    src: contentLead,
  },
];

const Team = () => {
  return (
    <div className='w-full pt-20 pb-24 px-12 bg-[#F5F5F5]' id='Team'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        viewport={{ once: true }}
        className=''
      >
        <h2 className='text-center text-4xl font-alexandria'> Our Team </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 1, delay: 0.5 },
        }}
        viewport={{ once: true }}
      >
        <p className=' text-3xl py-16 font-alexandria lg:ml-20'>
          Meet Our Core Team Leads
        </p>
      </motion.div>

      <div className='team-leads-section flex flex-col items-center justify-around gap-12'>
        {/* Cloud Captain Be in a section alone */}
        <motion.div
          className='captain sm:w-full md:w-[30%]'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.7 },
          }}
          viewport={{ once: true }}
        >
          <div className='w-full flex flex-col pb-12 shadow-md rounded-3xl gap-6 items-center'>
            <img src={cloudCaptain} className='w-full' />
            <div className='name-card bg-[#9747FF] rounded-lg mt-[-40px] text-white w-[90%] flex flex-col items-center p-4'>
              <h3 className='text-[18px] font-light'>ABOLAJI ABDULRAHMAN</h3>
              <p className='text-[13px] font-light'> Cloud Captain</p>
            </div>
            <div className='icons flex item-center justify-around space-x-4'>
              <a>
                <FaXTwitter
                  size={35}
                  className=' border border-black-400 rounded-full p-1 cursor-pointer hover hover:scale-110 transition duration-400'
                />
              </a>
              <a>
                <FaInstagram
                  size={35}
                  className=' border border-black-400 rounded-full p-1 cursor-pointer hover hover:scale-110 transition duration-400'
                />
              </a>
              <a
                href='https://www.linkedin.com/in/abolaji-abdulrahman'
                target='_blank'
                rel='noopener noreferrer'
              >
                <RiLinkedinLine
                  size={35}
                  className=' border border-black-400 rounded-full p-1 cursor-pointer hover hover:scale-110 transition duration-400'
                />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Other Cloud leads in a container with flex */}
        <div className='container flex flex-col md:flex-row items-center justify-center gap-16 md:flex-wrap'>
          {TeamLead.map((item, id) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 1, delay: id * 0.3 },
              }}
              viewport={{ once: true }}
              key={id}
              className=' w-full md:w-1/4 flex flex-col shadow-sm rounded-3xl gap-6 items-center pb-12'
            >
              <img src={item.src} className='w-full' />
              <div className='name-card bg-[#9747FF] rounded-lg mt-[-40px] text-white w-[90%] flex flex-col items-center p-2'>
                <h3 className='text-[19px] font-light'>{item.name}</h3>
                <p className='text-[13px] font-light'> {item.description}</p>
              </div>
              <div className='icons flex item-center justify-around gap-4'>
                <a
                  href={item.xIconLink}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaXTwitter
                    size={35}
                    className='border border-black-400 rounded-full p-1 cursor-pointer hover hover:scale-110 transition duration-400'
                  />
                </a>

                <a
                  href={item.instagramLink}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaInstagram
                    size={35}
                    className='border border-black-400 rounded-full p-1 cursor-pointer hover hover:scale-110 transition duration-400'
                  />
                </a>
                <a
                  href={item.linkedInLink}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <RiLinkedinLine
                    size={35}
                    className='border border-black-400 rounded-full p-1 cursor-pointer hover hover:scale-110 transition duration-400'
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
