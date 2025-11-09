import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section
      id='About'
      className='bg-[#FFFFFF] lg:my-[5rem] my-[3rem] lg:mx-[6.4rem] mx-[2rem] font-alexandria text-center items-center gap-[2.8rem]'
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='font-normal text-[#1E242C] lg:text-[3.5rem] text-[2.8rem] lg:mb-[2.8rem} mb-[1.8rem]'
      >
        About us
      </motion.h1>

      {/* Mission + Vision */}
      <article className='w-full justify-between flex flex-row flex-wrap items-center lg:gap-0 gap-[2rem]'>
        {/* Mission Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className='flex lg:flex-row flex-col justify-between lg:gap-[2rem] gap-[0.6rem] items-center bg-[#FFFFFF] shadow-sm shadow-[#0000004F] lg:py-[0.8rem] py-[1rem] px-[1.34rem] rounded-[0.6875rem] border-[0.5px] border-[#0000004F] w-fit mx-auto transition-transform duration-500'
        >
          <div>
            <img
              src='/Images/about_us/pink_arrow.svg'
              alt='Pink Arrow'
              className='w-[4.06rem] h-[4.06rem]'
            />
          </div>
          <div className='text-[#000000] lg:text-start text-center'>
            <h3 className='font-[500] lg:text-[1.19rem] text-[1.3rem] mb-[0.5rem]'>
              Our Mission
            </h3>
            <p className='font-normal lg:text-[0.875rem] text-[0.7rem] max-w-[22.62rem]'>
              Our mission at AWS Cloud Club, University of Ilorin, is to equip
              students with hands-on cloud computing skills through workshops,
              mentorship, and real-world projects.
            </p>
          </div>
        </motion.div>

        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className='flex lg:flex-row flex-col justify-between lg:gap-[2rem] gap-[0.6rem] items-center bg-[#FFFFFF] shadow-sm shadow-[#0000004F] lg:py-[0.8rem] py-[1rem] px-[1.34rem] rounded-[0.6875rem] border-[0.5px] border-[#0000004F] w-fit mx-auto'
        >
          <div>
            <img
              src='/Images/about_us/pink_spiral.svg'
              alt='Pink Spiral'
              className='w-[4.06rem] h-[4.06rem]'
            />
          </div>
          <div className='text-[#000000] lg:text-start text-center'>
            <h3 className='font-[500] lg:text-[1.19rem] text-[1.3rem] mb-[0.5rem]'>
              Our Vision
            </h3>
            <p className='font-normal lg:text-[0.875rem] text-[0.7rem] max-w-[22.62rem]'>
              We envision a vibrant student community that inspires and develops
              the next generation of cloud professionals and tech leaders in
              Africa. By bridging the gap between academic learning and industry
              demands,
            </p>
          </div>
        </motion.div>
      </article>

      {/* Intro Section */}
      <article className='flex lg:flex-row flex-col justify-between lg:py-[2.8rem] text-[#1E242C] text-start items-start gap-[1.1875rem]'>
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='font-semibold text-[1.6875rem] lg:w-[14.6rem] lg:mt-0 mt-[3.5rem]'
        >
          <span className='text-[#6328A3]'>Introducing </span>
          Aws Cloud University Of Ilorin
        </motion.h2>

        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          src='/Images/about_us/aws_females.svg'
          alt='Aws female members group picture'
          className='w-full md:hidden lg:hidden'
        />

        <motion.p
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className='font-normal lg:text-[1rem] text-[0.9rem] text-[#1E242C] lg:w-[28.4rem]'
        >
          AWS Cloud Club, University of Ilorin, is a student-led community that
          empowers students to learn, build, and grow their skills in cloud
          computing using Amazon Web Services (AWS)...
        </motion.p>

        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          src='/Images/about_us/aws_group_pcture.svg'
          alt='Aws members group picture'
          className='w-full md:hidden lg:hidden'
        />

        <motion.p
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className='font-normal lg:text-[1rem] text-[0.9rem] text-[#1E242C] lg:w-[28rem]'
        >
          We organize workshops, bootcamps, hackathons, and speaker sessions to
          help members develop both technical and soft skills...
        </motion.p>
      </article>

      {/* Bottom Images (Desktop) */}
      <article className='md:flex hidden flex-row flex-wrap justify-between lg:gap-0 gap-[2.43rem]'>
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          src='/Images/about_us/aws_females.svg'
          alt='Aws female members group picture'
          className='w-[45%]'
        />

        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: true }}
          src='/Images/about_us/aws_group_pcture.svg'
          alt='Aws members group picture'
          className='w-[45%]'
        />
      </article>
    </section>
  );
};

export default AboutSection;
