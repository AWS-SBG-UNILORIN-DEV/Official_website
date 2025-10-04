// import React from 'react';
// import
import cloudCaptain from '/src/assets/abdulrahman-Team_lead.png';

import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
// import { FaLinkedinIn } from 'react-icons/fa6'; <FaLinkedinIn />
import { RiLinkedinLine } from 'react-icons/ri';

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
    linkedInLink: '',
    src: '/src/assets/co-captain.png',
  },

  {
    id: 2,
    name: 'AKANDE TOHEEB',
    description: 'Technical and Operations Lead',
    xIconLink: '',
    instagramLink: '',
    linkedInLink: '',
    src: '/src/assets/toheeb-tech-lead.png',
  },

  {
    id: 3,
    name: 'ABDULKABIR YUSUF',
    description: 'Design Team Lead',
    xIconLink: '',
    instagramLink: '',
    linkedInLink: '',
    src: '/src/assets/yusuf-design-lead.png',
  },

  {
    id: 4,
    name: 'TOBILOBA ISAIAH ADEBISI',
    description: 'Management Team Lead',
    xIconLink: '',
    instagramLink: '',
    linkedInLink: '',
    src: '/src/assets/tobi-management-lead.png',
  },

  {
    id: 5,
    name: 'Lateefat Bello',
    description: 'Social Media Lead',
    xIconLink: '',
    instagramLink: '',
    linkedInLink: '',
    src: '/src/assets/lateefat-social-lead.png',
  },

  {
    id: 6,
    name: 'VICTOR AGBAYEKHAI O.',
    description: 'Content Team Lead',
    xIconLink: '',
    instagramLink: '',
    linkedInLink: '',
    src: '/src/assets/victor-content-lead.png',
  },
];

const Team = () => {
  return (
    <div className='w-full pt-20 pb-24 px-12 bg-[#F5F5F5]'>
      <div className=''>
        <h2 className='text-center text-4xl font-alexandria'> Our Team </h2>
      </div>
      <div>
        <p className=' text-3xl py-16 font-alexandria lg:ml-20'>
          Meet Our Core Team Leads
        </p>
      </div>

      <div className='team-leads-section flex flex-col items-center justify-around gap-12'>
        {/* Cloud Captain Be in a section alone */}
        <div className='captain sm:w-full md:w-[30%]'>
          <div className='w-full flex flex-col pb-12 shadow-md rounded-3xl gap-6 items-center'>
            <img src={cloudCaptain} className='w-full' />
            <div className='name-card bg-[#9747FF] rounded-lg mt-[-40px] text-white w-2/3 flex flex-col items-center p-4'>
              <h3 className='text-[19px] font-light'>Abolaji Abdulrahman</h3>
              <p className='text-[13px] font-light'> Cloud Captain</p>
            </div>
            <div className='icons flex item-center justify-around space-x-4'>
              <FaXTwitter
                size={35}
                className=' border border-black-400 rounded-full p-1 cursor-pointer hover hover:scale-110 transition duration-400'
              />
              <FaInstagram
                size={35}
                className=' border border-black-400 rounded-full p-1 cursor-pointer hover hover:scale-110 transition duration-400'
              />
              <RiLinkedinLine
                size={35}
                className=' border border-black-400 rounded-full p-1 cursor-pointer hover hover:scale-110 transition duration-400'
              />
            </div>
          </div>
        </div>

        {/* Other Cloud leads in a container with flex */}
        <div className='container flex flex-col md:flex-row items-center justify-center gap-16 md:flex-wrap'>
          {TeamLead.map((item, id) => (
            <div
              key={id}
              className=' w-full md:w-1/4 flex flex-col shadow-sm rounded-3xl gap-6 items-center pb-12'
            >
              <img src={item.src} className='w-full' />
              <div className='name-card bg-[#9747FF] rounded-lg mt-[-40px] text-white w-[90%] flex flex-col items-center p-2'>
                <h3 className='text-[19px] font-light'>{item.name}</h3>
                <p className='text-[13px] font-light'> {item.description}</p>
              </div>
              <div className='icons flex item-center justify-around gap-4'>
                <FaXTwitter
                  size={35}
                  className='border border-black-400 rounded-full p-1 cursor-pointer hover hover:scale-110 transition duration-400'
                />
                <FaInstagram
                  size={35}
                  className='border border-black-400 rounded-full p-1 cursor-pointer hover hover:scale-110 transition duration-400'
                />
                <RiLinkedinLine
                  size={35}
                  className='border border-black-400 rounded-full p-1 cursor-pointer hover hover:scale-110 transition duration-400'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
