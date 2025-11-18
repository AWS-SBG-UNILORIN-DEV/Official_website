import { motion } from 'framer-motion';

const CommunitySection = () => {
  return (
    <section
      className='bg-[#FFFFFF] lg:mt-[5rem] mt-[3rem] font-alexandria text-center items-center gap-[2.8rem]'
      id='Community'
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='font-normal text-[#1E242C] lg:text-[3.5rem] text-[2.8rem] lg:mb-[2.8rem} mb-[1.8rem]'
      >
        Our Community Offers
      </motion.h1>

      <article className="bg-[url('/Images/community/bg.svg')] bg-cover bg-center h-screen w-full lg:flex hidden items-center justify-center gap-[3.5rem] relative ">
        <div className='flex flex-col font-normal text-[#414D60] text-[0.75rem] text-center gap-[1.25rem]'>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              rotate: 2,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
            className='bg-[#FFFFFF] p-[1.8rem] max-w-full flex flex-col lg:max-w-[16.25rem] rounded-[1.25rem] border-[1px] border-[#EDEEF0] shadow-2xl shadow-[#002B6B40] items-center'
          >
            <img
              src='/Images/community/project_icon.svg'
              alt='Project Icon'
              className='mb-[0.75rem] size-[3rem]'
            />
            <h2 className='font-[700] text-[#1E242C] text-[1.25rem]'>
              Project-Based Collaboration
            </h2>
            <p className='mt-[0.6rem]'>
              Members work together on real-world cloud projects, gaining
              practical experience and building portfolios.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              rotate: -2,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className='bg-[#FFFFFF] p-[1.9rem] flex flex-col lg:max-w-[16.25rem] rounded-[1.25rem] border-[1px] border-[#EDEEF0] shadow-2xl shadow-[#002B6B40] items-center'
          >
            <img
              src='/Images/community/member_icon.svg'
              alt='Member Icon'
              className='mb-[0.75rem] size-[3rem]'
            />
            <h2 className='font-[700] text-[#1E242C] text-[1.25rem]'>
              1500+ Active Member
            </h2>
            <p className='mt-[0.6rem]'>
              A growing community of passionate students learning and building
              with AWS together.
            </p>
          </motion.div>
        </div>

        <div>
          <img
            src='/Images/community/view.svg'
            alt='Event view'
            className='rounded-[1rem] h-[32rem]'
          />
        </div>

        <div className='flex flex-col font-normal text-[#414D60] text-[0.75rem] text-center gap-[3.6rem]'>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              rotate: 2,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
            className='bg-[#FFFFFF] p-[1rem] flex flex-col lg:max-w-[16.25rem] rounded-[1.25rem] border-[1px] border-[#EDEEF0] shadow-2xl shadow-[#002B6B40] items-center'
          >
            <img
              src='/Images/community/cloud_icon.svg'
              alt='Cloud Icon'
              className='mb-[0.75rem] size-[3rem]'
            />
            <h2 className='font-[700] text-[#1E242C] text-[1.25rem]'>
              Cloud Learning & Training
            </h2>
            <p className='mt-[0.6rem]'>
              We run hands-on sessions to teach AWS skills and core cloud
              concepts
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              rotate: -2,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
            className='bg-[#FFFFFF] p-[1.2rem] flex flex-col lg:max-w-[16.25rem] rounded-[1.25rem] border-[1px] border-[#EDEEF0] shadow-2xl shadow-[#002B6B40] items-center'
          >
            <img
              src='/Images/community/community_icon.svg'
              alt='Community Icon'
              className='mb-[0.75rem] size-[3rem]'
            />
            <h2 className='font-[700] text-[#1E242C] text-[1.25rem]'>
              Community & Career Development
            </h2>
            <p className='mt-[0.6rem]'>
              We connect students to mentors, certifications, and global cloud
              career opportunities.
            </p>
          </motion.div>
        </div>
      </article>

      <article className="bg-[url('/Images/community/bg.svg')] bg-cover bg-center h-fit w-full lg:hidden flex items-center justify-center">
        <div className='flex flex-wrap justify-center font-normal text-[#414D60] text-[0.75rem] text-center gap-[1.25rem] w-full px-4'>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              rotate: 2,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
            className='bg-[#FFFFFF] p-[1.8rem] flex flex-col w-[16.25rem] rounded-[1.25rem] border-[1px] border-[#EDEEF0] shadow-2xl shadow-[#002B6B40] items-center'
          >
            <img
              src='/Images/community/project_icon.svg'
              alt='Project Icon'
              className='mb-[0.75rem] size-[3rem]'
            />
            <h2 className='font-[700] text-[#1E242C] text-[1.25rem]'>
              Project-Based Collaboration
            </h2>
            <p className='mt-[0.6rem]'>
              Members work together on real-world cloud projects, gaining
              practical experience and building portfolios.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              rotate: -2,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className='bg-[#FFFFFF] p-[1.9rem] flex flex-col w-[16.25rem] rounded-[1.25rem] border-[1px] border-[#EDEEF0] shadow-2xl shadow-[#002B6B40] items-center'
          >
            <img
              src='/Images/community/member_icon.svg'
              alt='Member Icon'
              className='mb-[0.75rem] size-[3rem]'
            />
            <h2 className='font-[700] text-[#1E242C] text-[1.25rem]'>
              100K + Active Member
            </h2>
            <p className='mt-[0.6rem]'>
              A growing community of passionate students learning and building
              with AWS together.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              rotate: 2,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
            className='bg-[#FFFFFF] p-[1rem] flex flex-col w-[16.25rem] rounded-[1.25rem] border-[1px] border-[#EDEEF0] shadow-2xl shadow-[#002B6B40] items-center'
          >
            <img
              src='/Images/community/cloud_icon.svg'
              alt='Cloud Icon'
              className='mb-[0.75rem] size-[3rem]'
            />
            <h2 className='font-[700] text-[#1E242C] text-[1.25rem]'>
              Cloud Learning & Training
            </h2>
            <p className='mt-[0.6rem]'>
              We run hands-on sessions to teach AWS skills and core cloud
              concepts
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              rotate: -2,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
            className='bg-[#FFFFFF] p-[1.2rem] flex flex-col w-[16.25rem] rounded-[1.25rem] border-[1px] border-[#EDEEF0] shadow-2xl shadow-[#002B6B40] items-center'
          >
            <img
              src='/Images/community/community_icon.svg'
              alt='Community Icon'
              className='mb-[0.75rem] size-[3rem]'
            />
            <h2 className='font-[700] text-[#1E242C] text-[1.25rem]'>
              Community & Career Development
            </h2>
            <p className='mt-[0.6rem]'>
              We connect students to mentors, certifications, and global cloud
              career opportunities.
            </p>
          </motion.div>
        </div>
      </article>
    </section>
  );
};

export default CommunitySection;
