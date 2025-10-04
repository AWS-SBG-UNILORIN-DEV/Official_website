// import React from 'react';
// import
import cloudCaptain from '/src/assets/abdulrahman-Team_lead.png';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
// import { FaLinkedinIn } from 'react-icons/fa6'; <FaLinkedinIn />
import { RiLinkedinLine } from 'react-icons/ri';


interface TeamLeads {
  name: string,
  src: string,
  description: string,
  xIcon: string,
  instagram: string,
  linkedIn: string, 
  xIconLink: string,
  instagramLink: string,
  linkedInLink: string, 
}

const TeamLead: TeamLeads = {
  
}
  


const Team = () => {
  return (
    <div className='w-[90%] pt-12 px-24'>
      <div>
        <h2> Our Team </h2>
      </div>
      <div>
        <p>Meet Our Core Team Leads</p>
      </div>

      <div className='team-leads-section'>
        <div className='captain'>
          <div>
            <img src={cloudCaptain} />
            <div className='name-card bg-[#9747FF] rounded-lg text-white'>
              <h3 className=''>Abolaji Abdulrahman</h3>
              <p> Cloud Captain</p>
            </div>
            <div className='icons flex item-center justify-around'>
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


      </div>
    </div>
  );
};

export default Team;
