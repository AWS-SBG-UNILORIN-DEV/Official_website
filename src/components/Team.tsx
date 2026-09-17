import coCaptain from '/src/assets/Habeeb-Tech.jpeg';
import designLead from '/src/assets/Mubarak-Design.jpeg';
import socialLead from '/src/assets/bello_madiya-2.jpeg';

// New inputs
import cloudCaptain from '/src/assets/dera-captain.jpeg';
import communicationLead from '/src/assets/obekpa-2.jpeg';
import logisticsLead from '/src/assets/abdulrahman-operation.jpeg';
import assTechLead from '/src/assets/ass-tech-lead.jpeg';
import assMediaLead from '/src/assets/ass-media-lead.jpeg';

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
    id: 2,
    name: ' Tomori Mubarak Temitayo',
    description: 'Design Lead',
    xIconLink: 'https://x.com/HemBee2024',
    instagramLink: '',
    linkedInLink: 'https://www.linkedin.com/in/tomori-mubarak-620688360',
    pinterestLink: ' https://pin.it/4a7cD48z3',
    src: designLead,
  },

  {
    id: 3,
    name: 'BELLO ABAKE MARDIYAH',
    description: 'Media Lead',
    xIconLink: 'https://x.com/tejufx8',
    instagramLink: '',
    linkedInLink:
      'https://www.linkedin.com/in/bello-mardiyat-2575762ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    src: socialLead,
  },
  {
    id: 4,
    name: 'Sholadoye Najib Adebisi',
    description: 'Assistance Technical Lead',
    xIconLink: 'https://x.com/NSholadoye',
    instagramLink: 'https://www.instagram.com/natech_natech/',
    linkedInLink: 'https://www.linkedin.com/in/najib-sholadoye-499449302/',
    src: assTechLead,
  },

  {
    id: 5,
    name: 'OBEKPA PETER.',
    description: ' Informations/communications Lead',
    xIconLink: '',
    instagramLink:
      'https://www.instagram.com/peter__obekpa?igsh=MXR3Y3A1bTMzNDQzNQ==',
    linkedInLink:
      'https://www.linkedin.com/in/peter-obekpa-the-solutions-guy-54926b21b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    src: communicationLead,
  },
  {
    id: 6,
    name: 'ABDULRAHMAN ADEBAYO',
    description: 'Operations and Programs Lead ',
    xIconLink: ' https://x.com/AdebayoAbd009',
    GithubLink: 'https://github.com/adebayo-abdul',
    instagramLink: 'https://www.instagram.com/adebayoabdul2009/?hl=en',
    linkedInLink: 'https://www.linkedin.com/in/adebayo-abdulrahman-5b2859343',
    src: logisticsLead,
  },
  {
    id: 7,
    name: 'Olawuyi Olurotimi',
    description: 'Ass Media Lead.',
    xIconLink: '',
    GithubLink: '',
    instagramLink: '',
    linkedInLink:
      'https://www.linkedin.com/in/olurotimi-olawuyi-168bba374?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    AWSBuilderCenterLink:
      ' https://builder.aws.com?inviteId=8f0a7432-c6da-4a62-9001-bea1efac11fc',
    src: assMediaLead,
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

      <div className='team-leads-section flex w-full flex-col items-center justify-center gap-8 md:gap-10 lg:gap-12 pb-8'>
        {/* Cloud Captain Be in a section alone */}
        <motion.div
          className='captain w-full sm:w-3/4 md:w-[45%] lg:w-[30%] flex flex-col items-center'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.7 },
          }}
          viewport={{ once: true }}
        >
          <div className='relative w-full overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_30px_rgba(15,23,42,0.08)]'>
            <img
              src={cloudCaptain}
              loading='lazy'
              className='w-full aspect-[4/5] object-cover rounded-t-[2rem]'
            />
            <div className='relative z-10 -mt-8 mx-auto w-[92%] rounded-xl bg-[#9747FF] px-4 py-3 text-center text-white shadow-lg'>
              <h3 className='text-[18px] font-light'>
                Chukwunta Chidera Joshua
              </h3>
              <p className='text-[19px] font-light'>Community Lead / Captain</p>
            </div>
            <div className='flex items-center justify-center gap-3 px-4 py-5'>
              <a
                href='https://x.com/0xDera_24'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaXTwitter
                  size={35}
                  className='border border-black/30 rounded-full p-1 cursor-pointer hover:scale-110 transition duration-400 text-black'
                />
              </a>
              <a
                href='https://www.instagram.com/the_global_dera/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaInstagram
                  size={35}
                  className='border border-black/30 rounded-full p-1 cursor-pointer hover:scale-110 transition duration-400 text-black'
                />
              </a>
              <a
                href='https://www.linkedin.com/in/chukwunta-joshua/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <RiLinkedinLine
                  size={35}
                  className='border border-black/30 rounded-full p-1 cursor-pointer hover:scale-110 transition duration-400 text-black'
                />
              </a>
              <a
                href='https://builder.aws.com/community/@0xdera24'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaAws
                  size={35}
                  className='border border-black/30 rounded-full p-1 cursor-pointer hover:scale-110 transition duration-400 text-black'
                />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Other Cloud leads in a container with flex */}
        <div className='container flex w-full flex-col items-center justify-center gap-6 md:flex-row md:flex-wrap md:gap-8 lg:gap-10'>
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
              className='w-full sm:w-[90%] md:w-[46%] lg:w-[30%] xl:w-[31%] flex flex-col items-center'
            >
              <div className='relative w-full overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_30px_rgba(15,23,42,0.08)]'>
                <img
                  src={item.src}
                  loading='lazy'
                  className='w-full aspect-[4/5] object-cover rounded-t-[2rem]'
                />
                <div className='relative z-10 -mt-8 mx-auto w-[92%] rounded-xl bg-[#9747FF] px-3 py-3 text-center text-white'>
                  <h3 className='text-[17px] font-light text-center'>
                    {item.name}
                  </h3>
                  <p className='text-[13px] font-light text-center'>
                    {item.description}
                  </p>
                </div>
                <div className='flex items-center justify-center gap-3 px-4 py-5'>
                  {item.xIconLink && (
                    <a
                      href={item.xIconLink}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <FaXTwitter
                        size={35}
                        className='border border-black/30 rounded-full p-1 cursor-pointer hover:scale-110 transition duration-400 text-black'
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
                        className='border border-black/30 rounded-full p-1 cursor-pointer hover:scale-110 transition duration-400 text-black'
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
                        className='border border-black/30 rounded-full p-1 cursor-pointer hover:scale-110 transition duration-400 text-black'
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
                        className='border border-black/30 rounded-full p-1 cursor-pointer hover:scale-110 transition duration-400 text-black'
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
                        className='border border-black/30 rounded-full p-1 cursor-pointer hover:scale-110 transition duration-400 text-black'
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
                        className='border border-black/30 rounded-full p-1 cursor-pointer hover:scale-110 transition duration-400 text-black'
                      />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
