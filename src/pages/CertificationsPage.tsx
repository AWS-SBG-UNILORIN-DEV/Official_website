import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiAward,
  FiMaximize2,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiCheckCircle,
  FiArrowUpRight,
} from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface CertificateItem {
  id: number;
  title: string;
  category: string;
  image: string;
  badge: string;
  description: string;
}

const certificatesData: CertificateItem[] = [
  {
    id: 1,
    title: 'AWS Certified Cloud Practitioner',
    category: 'Cloud Practitioner',
    image: '/certifications/1.jpeg',
    badge: 'Foundational',
    description:
      'Validation of foundational AWS Cloud knowledge and cloud technology literacy.',
  },
  {
    id: 2,
    title: 'AWS Certified Cloud Practitioner',
    category: 'Cloud Practitioner',
    image: '/certifications/2.jpeg',
    badge: 'Foundational',
    description:
      'Demonstrated overall understanding of AWS Cloud platform, security, and compliance.',
  },
  {
    id: 3,
    title: 'AWS Certified Cloud Practitioner',
    category: 'Cloud Practitioner',
    image: '/certifications/3.jpeg',
    badge: 'Foundational',
    description:
      'Proficiency in fundamental AWS services and deployment models.',
  },
  {
    id: 4,
    title: 'AWS Certified Cloud Practitioner',
    category: 'Cloud Practitioner',
    image: '/certifications/4.jpeg',
    badge: 'Foundational',
    description:
      'Verified understanding of cloud economics and core AWS architecture principles.',
  },
  {
    id: 5,
    title: 'AWS Certified Cloud Practitioner',
    category: 'Cloud Practitioner',
    image: '/certifications/5.jpeg',
    badge: 'Foundational',
    description:
      'Validation of core cloud concepts and AWS billing & pricing structures.',
  },
  {
    id: 6,
    title: 'AWS Certified Cloud Practitioner',
    category: 'Cloud Practitioner',
    image: '/certifications/6.jpeg',
    badge: 'Foundational',
    description:
      'Proven technical expertise in AWS core infrastructure and security best practices.',
  },
  {
    id: 7,
    title: 'AWS Certified Cloud Practitioner',
    category: 'Cloud Practitioner',
    image: '/certifications/7.jpeg',
    badge: 'Foundational',
    description:
      'Official AWS certification demonstrating cloud expertise and hands-on competence.',
  },
  {
    id: 8,
    title: 'AWS Certified Cloud Practitioner',
    category: 'Cloud Practitioner',
    image: '/certifications/8.jpeg',
    badge: 'Foundational',
    description:
      'Recognized achievement in cloud architecture, IAM, and infrastructure basics.',
  },
  {
    id: 9,
    title: 'AWS Certified Cloud Practitioner',
    category: 'Cloud Practitioner',
    image: '/certifications/9.jpeg',
    badge: 'Foundational',
    description:
      'Mastery of foundational AWS cloud services and security model.',
  },
  {
    id: 10,
    title: 'AWS Certified Cloud Practitioner',
    category: 'Cloud Practitioner',
    image: '/certifications/10.jpeg',
    badge: 'Foundational',
    description:
      'Proven understanding of AWS ecosystem, scalability, and high availability.',
  },
  {
    id: 11,
    title: 'AWS Certified Cloud Practitioner',
    category: 'Cloud Practitioner',
    image: '/certifications/11.jpeg',
    badge: 'Foundational',
    description:
      'Verified skills in cloud deployment, networking, and storage solutions.',
  },
  {
    id: 12,
    title: 'AWS Certified Cloud Practitioner',
    category: 'Cloud Practitioner',
    image: '/certifications/12.jpeg',
    badge: 'Foundational',
    description:
      'AWS credential reflecting comprehensive cloud foundational mastery.',
  },
  {
    id: 13,
    title: 'AWS Certified Cloud Practitioner',
    category: 'Cloud Practitioner',
    image: '/certifications/13.jpeg',
    badge: 'Foundational',
    description:
      'Achievement in AWS technology, security posture, and cloud concepts.',
  },
  {
    id: 14,
    title: 'AWS Certified Cloud Practitioner',
    category: 'Cloud Practitioner',
    image: '/certifications/14.jpeg',
    badge: 'Foundational',
    description:
      'Official AWS certification earned through dedicated study and mentorship.',
  },
];

const CertificationsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Cloud Practitioner', 'Foundational'];

  const filteredCertificates = certificatesData.filter(cert => {
    return (
      selectedCategory === 'All' ||
      cert.category === selectedCategory ||
      cert.badge === selectedCategory
    );
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredCertificates.length) %
          filteredCertificates.length
      );
    }
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredCertificates.length);
    }
  };

  return (
    <div className='font-alexandria min-h-screen bg-[#FDFCFE] text-[#272F3A] overflow-x-hidden flex flex-col justify-between select-none'>
      {/* Header Container */}
      <div className='w-full flex justify-center py-6 px-4 relative z-50'>
        <Header />
      </div>

      {/* Hero Section */}
      <section
        className='w-full pt-28 pb-16 px-4 md:px-8 relative overflow-hidden flex flex-col items-center'
        style={{
          background: `radial-gradient(ellipse 100% 200% at center 97%,
                          #d8caeaff 0%, rgba(216, 209, 224, 0.6) 25%,
                          rgba(151, 71, 255, 0.2) 50%, transparent 70%), white`,
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='inline-flex items-center gap-2 bg-[#F3E8FF] border border-[#D0B6F2] px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold text-[#9747FF] shadow-sm mb-6 mt-4'
        >
          <FiAward className='w-4 h-4 text-[#9747FF]' />
          Hall of Certifications
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='font-alexandria font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center text-[#002B6B] tracking-tight leading-tight max-w-4xl'
        >
          OUR COMMUNITY IMPACT & ACHIEVEMENTS
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='text-[#414D60] text-center text-sm sm:text-base md:text-lg max-w-2xl mt-4 mb-8 leading-relaxed font-manrope'
        >
          Celebrating the certified AWS Cloud Builders at the University of
          Ilorin. Explore the milestones, credentials, and achievements powering
          our community.
        </motion.p>

        {/* Highlight Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-4'
        >
          <div className='bg-white/80 backdrop-blur-md border border-[#E9D8FD] p-4 rounded-2xl flex items-center justify-start gap-3.5 shadow-sm'>
            <div className='px-3.5 py-2.5 rounded-xl bg-[#F3E8FF] text-[#9747FF] font-bold text-sm sm:text-base shrink-0 flex items-center justify-center whitespace-nowrap min-w-[3.5rem]'>
              14+
            </div>
            <div>
              <p className='text-xs text-gray-500 font-medium'>
                Verified Badges
              </p>
              <h4 className='text-sm sm:text-base font-bold text-[#002B6B]'>
                AWS Certificates
              </h4>
            </div>
          </div>

          <div className='bg-white/80 backdrop-blur-md border border-[#E9D8FD] p-4 rounded-2xl flex items-center justify-start gap-3.5 shadow-sm'>
            <div className='px-3.5 py-2.5 rounded-xl bg-[#E6F4EA] text-[#137333] font-bold text-sm sm:text-base shrink-0 flex items-center justify-center whitespace-nowrap min-w-[3.5rem]'>
              100%
            </div>
            <div>
              <p className='text-xs text-gray-500 font-medium'>
                Verification Rate
              </p>
              <h4 className='text-sm sm:text-base font-bold text-[#002B6B]'>
                Official Credentials
              </h4>
            </div>
          </div>

          <div className='bg-white/80 backdrop-blur-md border border-[#E9D8FD] p-4 rounded-2xl flex items-center justify-start gap-3.5 shadow-sm'>
            <div className='px-3.5 py-2.5 rounded-xl bg-[#E8F0FE] text-[#1A73E8] font-bold text-xs sm:text-sm shrink-0 flex items-center justify-center whitespace-nowrap min-w-[4rem]'>
              Unilorin
            </div>
            <div>
              <p className='text-xs text-gray-500 font-medium'>Cloud Chapter</p>
              <h4 className='text-sm sm:text-base font-bold text-[#002B6B]'>
                Student Builders
              </h4>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className='w-[95%] lg:w-[90%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-10 flex-grow'>
        {/* Category Tabs */}
        <div className='flex justify-center mb-10'>
          <div className='bg-white border border-gray-100 rounded-full p-1.5 shadow-sm flex gap-1 sm:gap-2'>
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer z-10`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId='activeCertTab'
                      className='absolute inset-0 bg-[#9747FF] rounded-full z-[-1]'
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={isSelected ? 'text-white' : 'text-[#414D60]'}
                  >
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Title */}
        <div className='flex justify-between items-center mb-8 border-b border-gray-100 pb-4'>
          <div>
            <h2 className='text-xl sm:text-2xl font-bold text-[#002B6B]'>
              Certificate Gallery ({filteredCertificates.length})
            </h2>
          </div>
          <a
            href='https://chat.whatsapp.com/GE6GMiixowLBGQfvsrUDOE'
            target='_blank'
            rel='noopener noreferrer'
            className='text-xs sm:text-sm font-semibold text-[#9747FF] hover:text-[#7f2df2] flex items-center gap-1 transition-colors'
          >
            Get Certified With Us
            <FiArrowUpRight className='w-4 h-4' />
          </a>
        </div>

        {/* Grid of Certificates */}
        <motion.div
          layout
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        >
          <AnimatePresence mode='popLayout'>
            {filteredCertificates.map((cert, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={cert.id}
                onClick={() => openLightbox(idx)}
                className='bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(151,71,255,0.12)] transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer'
              >
                {/* Image Container with Hover Overlay */}
                <div className='relative w-full aspect-[4/3] bg-gray-50 overflow-hidden select-none'>
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading='lazy'
                    onContextMenu={e => e.preventDefault()}
                    onDragStart={e => e.preventDefault()}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4'>
                    <span className='inline-flex items-center gap-1.5 text-xs text-white font-medium bg-[#9747FF]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full'>
                      <FiMaximize2 className='w-3.5 h-3.5' /> View Certificate
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className='p-5 flex flex-col justify-between flex-grow'>
                  <div>
                    <div className='flex items-center gap-2 mb-2'>
                      <span className='text-[10px] font-semibold uppercase tracking-wider bg-[#F3E8FF] text-[#9747FF] px-2.5 py-0.5 rounded-md'>
                        {cert.badge}
                      </span>
                    </div>
                    <h3 className='text-[#002B6B] font-bold text-base group-hover:text-[#9747FF] transition-colors duration-200 line-clamp-1'>
                      {cert.title}
                    </h3>
                    <p className='text-xs text-gray-500 font-manrope mt-2 line-clamp-2 leading-relaxed'>
                      {cert.description}
                    </p>
                  </div>

                  <div className='mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#9747FF] font-semibold'>
                    <span className='flex items-center gap-1'>
                      <FiCheckCircle className='w-3.5 h-3.5 text-green-500' />{' '}
                      Verified Credential
                    </span>
                    <span className='group-hover:translate-x-1 transition-transform duration-200'>
                      &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Lightbox Modal (Protected View Mode) */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onContextMenu={e => e.preventDefault()}
            className='fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none'
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              onContextMenu={e => e.preventDefault()}
              className='relative max-w-4xl w-full bg-[#1E242C] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]'
            >
              {/* Top Controls Bar */}
              <div className='p-4 bg-[#14181F] flex items-center justify-between text-white border-b border-gray-800'>
                <div className='flex items-center gap-3'>
                  <span className='bg-[#9747FF] text-white text-xs font-bold px-2.5 py-1 rounded-full'>
                    {lightboxIndex + 1} / {filteredCertificates.length}
                  </span>
                  <h3 className='font-bold text-sm sm:text-base text-gray-100 truncate max-w-md'>
                    {filteredCertificates[lightboxIndex].title}
                  </h3>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    onClick={closeLightbox}
                    className='p-2 bg-gray-800 hover:bg-red-600 text-gray-200 hover:text-white rounded-lg transition-colors cursor-pointer'
                    title='Close View'
                  >
                    <FiX className='w-5 h-5' />
                  </button>
                </div>
              </div>

              {/* Main Image Area with Prev/Next Navigation & Context Menu Protection */}
              <div
                className='relative flex-grow bg-black flex items-center justify-center overflow-hidden p-2 min-h-[300px] sm:min-h-[450px]'
                onContextMenu={e => e.preventDefault()}
              >
                <img
                  src={filteredCertificates[lightboxIndex].image}
                  alt={filteredCertificates[lightboxIndex].title}
                  onContextMenu={e => e.preventDefault()}
                  onDragStart={e => e.preventDefault()}
                  className='max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-lg pointer-events-none'
                />

                {/* Left Arrow */}
                <button
                  onClick={prevLightbox}
                  className='absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-[#9747FF] text-white rounded-full backdrop-blur-md transition-all cursor-pointer hover:scale-110 z-10'
                >
                  <FiChevronLeft className='w-6 h-6' />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={nextLightbox}
                  className='absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-[#9747FF] text-white rounded-full backdrop-blur-md transition-all cursor-pointer hover:scale-110 z-10'
                >
                  <FiChevronRight className='w-6 h-6' />
                </button>
              </div>

              {/* Footer info in modal */}
              <div className='p-4 bg-[#14181F] text-gray-300 text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-gray-800 font-manrope'>
                <p>{filteredCertificates[lightboxIndex].description}</p>
                <div className='flex items-center gap-2 text-green-400 font-semibold whitespace-nowrap'>
                  <FiCheckCircle className='w-4 h-4' /> Verified AWS Credential
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Container */}
      <Footer />
    </div>
  );
};

export default CertificationsPage;
