import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section
      id='About'
      className='bg-[#FFFFFF] lg:my-[5rem] my-[2rem] sm:my-[2.5rem] lg:mx-[6.4rem] mx-[1rem] sm:mx-[1.5rem] font-alexandria overflow-x-hidden'
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='font-normal text-[#1E242C] lg:text-[3.5rem] text-[2.8rem] lg:mb-[3rem] mb-[2rem] text-center'
      >
        About us
      </motion.h1>

      {/* Intro Section */}
      <article className='grid lg:grid-cols-2 grid-cols-1 gap-[3rem] lg:gap-[4rem] lg:py-[3rem] py-[2rem] text-[#1E242C] items-start'>
        {/* Left Column - Subtitle */}
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='font-semibold text-[1.5rem] text-center lg:text-left pr-0 pl-0 lg:text-[3.3rem] leading-tight'
        >
          <span className='text-[#6328A3]'>Introducing </span>
          AWS STUDENT BUILDERS GROUP, University of Ilorin
        </motion.h2>

        {/* Right Column - Merged Paragraphs */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className='bg-[#FFFFFF] p-[2rem] rounded-lg lg:pt-0'
        >
          <p className='font-normal lg:text-[1rem] text-[0.95rem] text-[#4A5568] leading-relaxed mb-[1.5rem]'>
            AWS STUDENT BUILDERS GROUP, University of Ilorin, is a student-led
            community that empowers students to learn, build, and grow their
            skills in cloud computing using Amazon Web Services (AWS). We
            organize workshops, bootcamps, hackathons, and speaker sessions to
            help members develop both technical and soft skills.
          </p>

          <p className='font-normal lg:text-[1rem] text-[0.95rem] text-[#4A5568] leading-relaxed'>
            We organize workshops, bootcamps, hackathons, and speaker sessions
            to help members develop both technical and soft skills.
          </p>
        </motion.div>
      </article>

      {/* Mission + Vision */}
      <article className='w-full grid lg:grid-cols-2 grid-cols-1 gap-[2rem] lg:gap-[2.8rem] mb-12'>
        {/* Mission Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className='flex flex-col gap-[1.5rem] items-start bg-[#FFFFFF] shadow-md shadow-[#0000001A] p-[2rem] rounded-[1rem] border border-[#F0F0F0] h-full transition-transform duration-500'
        >
          <div>
            <img
              src='/Images/about_us/pink_arrow.svg'
              alt='Pink Arrow'
              className='w-[3.5rem] h-[3.5rem]'
            />
          </div>
          <div className='text-[#000000]'>
            <h3 className='font-semibold lg:text-[1.3rem] text-[1.3rem] mb-[0.8rem] text-[#1E242C]'>
              Our Mission
            </h3>
            <p className='font-normal lg:text-[0.95rem] text-[0.9rem] leading-relaxed text-[#4A5568]'>
              Our mission at AWS STUDENT BUILDERS GROUP University of Ilorin is
              to equip students with hands-on cloud computing skills through
              workshops, mentorship, and real-world projects.
            </p>
          </div>
        </motion.div>

        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className='flex flex-col gap-[1.5rem] items-start bg-[#FFFFFF] shadow-md shadow-[#0000001A] p-[2rem] rounded-[1rem] border border-[#F0F0F0] h-full transition-transform duration-500'
        >
          <div>
            <img
              src='/Images/about_us/pink_spiral.svg'
              alt='Pink Spiral'
              className='w-[3.5rem] h-[3.5rem]'
            />
          </div>
          <div className='text-[#000000]'>
            <h3 className='font-semibold lg:text-[1.3rem] text-[1.3rem] mb-[0.8rem] text-[#1E242C]'>
              Our Vision
            </h3>
            <p className='font-normal lg:text-[0.95rem] text-[0.9rem] leading-relaxed text-[#4A5568]'>
              We envision a vibrant student community that inspires and develops
              the next generation of cloud professionals and tech leaders in
              Africa. By bridging the gap between academic learning and industry
              demands,
            </p>
          </div>
        </motion.div>
      </article>

      {/* Bottom Images (Desktop) */}
      <article className='md:flex hidden flex-row flex-wrap justify-between lg:gap-[2rem] gap-[1.5rem]'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className='flex-1 min-w-[45%]'
        >
          <img
            src='/about-img-1.jpg'
            loading='lazy'
            alt='Aws female members group picture'
            className='w-full h-[350px] object-cover rounded-xl shadow-md'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: true }}
          className='flex-1 min-w-[45%]'
        >
          <img
            src='/about-img-2.jpg'
            loading='lazy'
            alt='Aws members group picture'
            className='w-full h-[350px] object-cover rounded-xl shadow-md'
          />
        </motion.div>
      </article>
    </section>
  );
};

export default AboutSection;
