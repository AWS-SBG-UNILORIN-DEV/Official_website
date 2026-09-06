import cloudCaptain from '/src/assets/abdulrahman-Team_lead.png';
import coCaptain from '/src/assets/Habeeb-Tech.jpeg';
import designLead from '/src/assets/Mubarak-Design.jpeg';
import socialLead from '/src/assets/bello_madiya-2.jpg';

// New inputs
import sponsorshipLead from '/src/assets/chukwunta-2.jpg';
import communicationLead from '/src/assets/obekpa-2.jpg';
import logisticsLead from '/src/assets/abdulrahman-operation.jpeg';

import { FaAws, FaGithub, FaPinterest, FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';

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
  GithubLink?: string;
  AWSBuilderCenterLink?: string;
  pinterestLink?: string;
}

const TeamLead: TeamLeads[] = [
  {
    id: 1,
    name: 'Habeeb Babasulaiman ',
    description: 'Technical Lead',
    xIconLink: 'https://x.com/@iyanda2234',
    instagramLink: '',
    linkedInLink: 'https://www.linkedin.com/in/habeeb-babasulaiman',
    GithubLink: 'https://github.com/FreemanBoss/',
    AWSBuilderCenterLink: 'https://builder.aws.com/community/@freemanboss',
    src: coCaptain,
  },
  {
    id: 3,
    name: ' Tomori Mubarak Temitayo',
    description: 'Design Lead',
    xIconLink: 'https://x.com/HemBee2024',
    instagramLink: '',
    linkedInLink: 'https://www.linkedin.com/in/tomori-mubarak-620688360',
    pinterestLink: ' https://pin.it/4a7cD48z3',
    src: designLead,
  },

  {
    id: 5,
    name: 'BELLO ABAKE MARDIYAH',
    description: 'Social Media Lead',
    xIconLink: '',
    instagramLink: '',
    linkedInLink:
      'https://www.linkedin.com/in/bello-mardiyat-2575762ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    src: socialLead,
  },

  {
    id: 8,
    name: 'OBEKPA PETER.',
    description: 'Communication Lead',
    xIconLink: '',
    instagramLink:
      'https://www.instagram.com/peter__obekpa?igsh=MXR3Y3A1bTMzNDQzNQ==',
    linkedInLink:
      'https://www.linkedin.com/in/peter-obekpa-the-solutions-guy-54926b21b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    src: communicationLead,
  },
  {
    id: 8,
    name: 'CHUKWUNTA CHIDERA JOSHUA',
    description: 'Communication Lead',
    xIconLink: '',
    instagramLink: 'https://x.com/0xDera_24',
    linkedInLink:
      'https://www.linkedin.com/in/chukwunta-joshua?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    src: sponsorshipLead,
  },
  {
    id: 8,
    name: 'ABDULRAHMAN ADEBAYO',
    description: 'Operations and Programs Lead ',
    xIconLink: ' https://x.com/AdebayoAbd009',
    GithubLink: 'https://github.com/adebayo-abdul',
    instagramLink: 'https://www.instagram.com/adebayoabdul2009/?hl=en',
    linkedInLink: 'https://www.linkedin.com/in/adebayo-abdulrahman-5b2859343',
    src: logisticsLead,
  },
];

const Team = () => {
  return (
    <div
      className='w-full pt-20 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#F5F5F5]'
      id='Team'
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        viewport={{ once: true }}
        className=''
      >
        <h2 className='font-normal text-[#1E242C] lg:text-[3.5rem] text-[2.8rem] lg:mb-[2.8rem} mb-[1rem] text-center'>
          {' '}
          Our Team{' '}
        </h2>
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
        <p className=' text-3xl text-center pb-8'>Meet Our Core Team Leads</p>
      </motion.div>

      <div className='team-leads-section flex flex-col items-center justify-around gap-12'>
        {/* Cloud Captain Be in a section alone */}
        <motion.div
          className='captain w-full sm:w-3/4 md:w-1/2 lg:w-[30%] h-[400px] flex flex-col justify-between'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.7 },
          }}
          viewport={{ once: true }}
        >
          <div className='w-full flex flex-col pb-12 shadow-md rounded-3xl gap-6 items-center h-full justify-between'>
            <img
              src={cloudCaptain}
              loading='lazy'
              className='w-full h-64 object-cover rounded-tl-3xl rounded-tr-3xl'
            />
            <div className='name-card bg-[#9747FF] rounded-lg mt-[-40px] text-white w-[90%] flex flex-col items-center p-4'>
              <h3 className='text-[18px] font-light'>ABOLAJI ABDULRAHMAN</h3>
              <p className='text-[19px] font-light'> Leader </p>
            </div>
            <div className='icons flex item-center justify-around space-x-4 mb-6'>
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
                href='https://www.linkedin.com/in/abolaji-abdulrahman-2a83a0232/'
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
        <div className='container flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 md:flex-wrap'>
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
              className='w-full sm:w-[90%] md:w-[60%] lg:w-1/4 h-[400px] flex flex-col shadow-sm rounded-3xl gap-6 items-center pb-12 justify-between'
            >
              <img
                src={item.src}
                loading='lazy'
                className='w-full h-64 object-cover rounded-tl-xl rounded-tr-xl'
              />
              <div className='name-card bg-[#9747FF] rounded-lg mt-[-40px] text-white w-[90%] flex flex-col items-center p-2'>
                <h3 className='text-[17px] font-light text-center'>
                  {item.name}
                </h3>
                <p className='text-[13px] font-light text-center'>
                  {' '}
                  {item.description}
                </p>
              </div>
              <div className='icons flex item-center justify-around gap-4'>
                {item.xIconLink && (
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
                )}

                {item.instagramLink && (
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
                )}
                {item.linkedInLink && (
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
                )}
                {item.GithubLink && (
                  <a
                    href={item.GithubLink}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaGithub
                      size={35}
                      className='border border-black-400 rounded-full p-1 cursor-pointer hover hover:scale-110 transition duration-400'
                    />
                  </a>
                )}
                {item.AWSBuilderCenterLink && (
                  <a
                    href={item.AWSBuilderCenterLink}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaAws
                      size={35}
                      className='border border-black-400 rounded-full p-1 cursor-pointer hover hover:scale-110 transition duration-400'
                    />
                  </a>
                )}
                {item.pinterestLink && (
                  <a
                    href={item.pinterestLink}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaPinterest
                      size={35}
                      className='border border-black-400 rounded-full p-1 cursor-pointer hover hover:scale-110 transition duration-400'
                    />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
