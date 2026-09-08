import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiDownload,
  FiClock,
  FiFileText,
  FiVolume2,
  FiGrid,
  FiSend,
  FiCheckCircle,
  FiChevronDown,
  FiArrowUpRight,
  FiPlay,
  FiPause,
} from 'react-icons/fi';

import Header from '../components/Header';
import Footer from '../components/Footer';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'audio' | 'pdf';
  fileUrl: string;
  meta: string; // duration or file size
  downloads: string;
  category: string;
}

const resourcesData: Resource[] = [
  {
    id: 'exam-questions-1',
    title: 'Exam Questions CLF-C02',
    description:
      'A curated selection of practice exam questions and answers to help you prepare for the AWS Certified Cloud Practitioner exam.',
    type: 'pdf',
    fileUrl:
      'https://drive.google.com/file/d/1rt_lyOHoHIbnGRiHJoU4zXvwfNvCmsa-/view',
    meta: '2.4 MB',
    downloads: '1.2k Downloads',
    category: 'Exam Prep',
  },
  {
    id: 'exam-questions-2',
    title: 'Exam Questions CLF-CO2-2',
    description:
      'Part two of our comprehensive exam prep series, featuring more mock questions and clear explanations of core AWS concepts.',
    type: 'pdf',
    fileUrl:
      'https://drive.google.com/file/d/15a71OqogbJ1bU-4u04uuH0dbbFbhg6FX/view',
    meta: '1.8 MB',
    downloads: '940 Downloads',
    category: 'Exam Prep',
  },
  {
    id: 'aws-guide-1',
    title: 'Amazon-Web-Services',
    description:
      'An introductory handbook covering the core principles, services, and architecture guidelines of Amazon Web Services.',
    type: 'pdf',
    fileUrl:
      'https://drive.google.com/file/d/1Yhnff_VJEJXUP72ftTr_5Ug1f3sa3tur/view',
    meta: '3.2 MB',
    downloads: '2.1k Downloads',
    category: 'Reference',
  },
  {
    id: 'aws-guide-2',
    title: 'Amazon-Web-Services-2',
    description:
      'Deep dive into Amazon Web Services, detailing service limits, deployment options, and management console features.',
    type: 'pdf',
    fileUrl:
      'https://drive.google.com/file/d/1naFIN2L12vGdP2D3gXlfKDYrgEP7nVSg/view',
    meta: '4.1 MB',
    downloads: '1.6k Downloads',
    category: 'Reference',
  },
  {
    id: 'aws-guide-3',
    title: 'Amazon-Web-Services-3',
    description:
      'Advanced AWS configuration details, focusing on database services, migration guidelines, and network configurations.',
    type: 'pdf',
    fileUrl:
      'https://drive.google.com/file/d/1diTvGFbDapyZqluUl3RVSeGoHo3d0LJE/view',
    meta: '3.7 MB',
    downloads: '1.5k Downloads',
    category: 'Reference',
  },
  {
    id: 'exam-questions-4',
    title: 'Exam Questions CLF-C02-4',
    description:
      'Additional target review questions focusing on security and compliance domains for the CLF-C02 practitioner exam.',
    type: 'pdf',
    fileUrl:
      'https://drive.google.com/file/d/1X49gb03ouK-nyxciuiG2j7oMh4SMc4wj/view',
    meta: '1.5 MB',
    downloads: '1.1k Downloads',
    category: 'Exam Prep',
  },
  {
    id: 'bootcamp-resources',
    title: 'AWS Bootcamp Resources & Session Materials',
    description:
      'Official slides, session notes, and follow-up materials from the AWS STUDENT BUILDERS GROUP Bootcamp.',
    type: 'pdf',
    fileUrl:
      'https://drive.google.com/file/d/1ExSONQpBsbJy7WQzomFySzYtlal4uluJ/view',
    meta: '5.4 MB',
    downloads: '3.3k Downloads',
    category: 'Bootcamp',
  },
  {
    id: 'acip-guide',
    title: 'AWS Cloud Immersion Program (ACIP)',
    description:
      'Detailed curriculum and lab guide for the AWS Cloud Immersion Program, designed for hands-on builders.',
    type: 'pdf',
    fileUrl:
      'https://drive.google.com/file/d/1HWaYlX4_HDBxUXecAPpwvn8FTUr8AEKN/view',
    meta: '6.8 MB',
    downloads: '2.5k Downloads',
    category: 'Immersion',
  },
  {
    id: 'clf-exam-guide',
    title: 'AWS Certified Cloud Practitioner (CLF-C02) Exam Guide',
    description:
      'The official exam guide outlining domains, weightings, and key topics for the Certified Cloud Practitioner exam.',
    type: 'pdf',
    fileUrl:
      'https://drive.google.com/file/d/1YBgUFtmW7Q8e66hGUxewtMGQfimDdKpj/view',
    meta: '1.2 MB',
    downloads: '4.2k Downloads',
    category: 'Exam Prep',
  },
  {
    id: 'study-notes',
    title: 'AWS Cloud Practitioner Study Notes',
    description:
      'Student-compiled study notes summarizing all key AWS services, computing models, and architectural best practices.',
    type: 'pdf',
    fileUrl:
      'https://drive.google.com/file/d/1FsZRbPlye2lEYfqhwB8m13HKZ8RV0Y34/view',
    meta: '2.8 MB',
    downloads: '2.9k Downloads',
    category: 'Study Notes',
  },
  {
    id: 'exam-bank',
    title: 'AWS Certified Cloud Practitioner(CLF-C02) Exam Bank',
    description:
      'A comprehensive bank of actual practice test questions to simulate the exam environment and test your readiness.',
    type: 'pdf',
    fileUrl:
      'https://drive.google.com/file/d/1sknsYCu-YYJzjLVk7nz6bC0lcpoiy4Ao/view',
    meta: '4.5 MB',
    downloads: '3.1k Downloads',
    category: 'Exam Prep',
  },
  {
    id: 'study-repo',
    title:
      'AWS CERTIFIED CLOUD PRACTITIONER CLF-C02 | Student Study Resource Repository',
    description:
      'A rich collection of student-led study notes, diagrams, and summary cheat sheets for exam success.',
    type: 'pdf',
    fileUrl:
      'https://drive.google.com/file/d/1AMJXu9-6YPHj0SX3ylR26OLzt_pDEAjL/view',
    meta: '8.2 MB',
    downloads: '2.8k Downloads',
    category: 'Study Notes',
  },
  {
    id: 'lite-exams',
    title:
      'AWS Certified Cloud Practitioner CLF-C02 Lite Edition • 3 Full-Length Exams',
    description:
      'Three full-length, high-quality practice exams designed to assess your speed, accuracy, and knowledge.',
    type: 'pdf',
    fileUrl:
      'https://drive.google.com/file/d/1oJzEwjS7BekhF_I017LWnM9bWqIyWLae/view',
    meta: '3.9 MB',
    downloads: '1.9k Downloads',
    category: 'Exam Prep',
  },
  {
    id: 'essentials-seminar',
    title: 'AWS Cloud Practitioner Essentials Seminar',
    description:
      'Presentation slides and resource links from our practitioner essentials seminar.',
    type: 'pdf',
    fileUrl:
      'https://drive.google.com/file/d/14blAXX64D0-j1ncg6_ERY7146JSCgKkt/view',
    meta: '2.1 MB',
    downloads: '1.4k Downloads',
    category: 'Seminar',
  },
];

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'audio' | 'pdf'>('all');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Audio state
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Email sub state
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handlePlayPause = (audioUrl: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (playingAudio === audioUrl) {
      audioRef.current?.pause();
      setPlayingAudio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play().catch(err => {
        console.error('Audio playback failed:', err);
      });
      setPlayingAudio(audioUrl);
      audioRef.current.onended = () => {
        setPlayingAudio(null);
      };
    }
  };

  const handleDownload = (
    fileUrl: string,
    _filename: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(fileUrl, '_blank');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubLoading(false);
      setIsSubscribed(true);
      setEmail('');
      // Reset success state after a few seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1200);
  };

  // Filter resources based on query, tabs and category
  const filteredResources = resourcesData.filter(resource => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === 'all' || resource.type === activeTab;

    const matchesCategory =
      selectedCategory === 'All Categories' ||
      resource.category === selectedCategory;

    return matchesSearch && matchesTab && matchesCategory;
  });

  return (
    <div className='font-alexandria min-h-screen bg-white text-[#272F3A] overflow-x-hidden flex flex-col justify-between'>
      {/* Navbar Container */}
      <div className='w-full flex justify-center py-6 px-4 relative z-50'>
        <Header />
      </div>

      {/* Hero Section */}
      <section
        className='w-full pt-28 pb-20 px-4 md:px-8 relative overflow-hidden flex flex-col items-center'
        style={{
          background: `radial-gradient(ellipse 100% 200% at center 97%,
                          #d8caeaff 0%, rgba(216, 209, 224, 0.6) 25%,
                          rgba(151, 71, 255, 0.2) 50%, transparent 70%), white`,
        }}
      >
        {/* Resources Hub badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='inline-flex items-center gap-2 bg-[#F3E8FF] border border-[#D0B6F2] px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold text-[#9747FF] shadow-sm mb-6 mt-4'
        >
          <span className='w-4 h-4 rounded-full bg-[#9747FF] flex items-center justify-center text-white text-[9px]'>
            📁
          </span>
          Resources Hub
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='font-alexandria font-bold text-4xl md:text-5xl lg:text-6xl text-center text-[#002B6B] tracking-tight leading-tight max-w-4xl'
        >
          LEARN. BUILD. GROW.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='text-[#414D60] text-center text-sm sm:text-base md:text-lg max-w-2xl mt-4 mb-8 leading-relaxed font-manrope'
        >
          Download high-quality audio and PDF resources curated to help you
          build, scale and succeed with AWS.
        </motion.p>

        {/* Search & Category Filter Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='w-full max-w-2xl bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-2 flex items-center gap-2 relative z-20'
        >
          <div className='flex items-center flex-1 pl-3 gap-2.5'>
            <FiSearch className='text-gray-400 w-5 h-5 flex-shrink-0' />
            <input
              type='text'
              placeholder='Search resources...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='w-full bg-transparent border-none outline-none text-[#272F3A] font-manrope text-sm sm:text-base placeholder-gray-400'
            />
          </div>

          <div className='h-6 w-[1px] bg-gray-200' />

          {/* Category Dropdown */}
          <div className='relative'>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className='flex items-center gap-1.5 px-4 py-2 hover:bg-gray-50 rounded-full text-xs sm:text-sm font-semibold text-[#414D60] transition-colors duration-200 cursor-pointer'
            >
              <span>{selectedCategory}</span>
              <FiChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className='absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 overflow-hidden font-manrope'
                >
                  {[
                    'All Categories',
                    'Exam Prep',
                    'Reference',
                    'Bootcamp',
                    'Immersion',
                    'Study Notes',
                    'Seminar',
                  ].map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                        selectedCategory === cat
                          ? 'bg-[#F3E8FF] text-[#9747FF] font-semibold'
                          : 'text-[#272F3A] hover:bg-gray-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* Main Content & Cards */}
      <main className='w-[95%] lg:w-[90%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-10 flex-grow'>
        {/* Type Filter Tab Selector */}
        <div className='flex justify-center mb-12'>
          <div className='bg-[#FFFFFF] border border-gray-100 rounded-full p-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] flex gap-1 sm:gap-2'>
            {[
              { id: 'all', label: 'All Resources', icon: FiGrid },
              { id: 'audio', label: 'Audio Resources', icon: FiVolume2 },
              { id: 'pdf', label: 'PDF Resources', icon: FiFileText },
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(tab.id as 'all' | 'audio' | 'pdf')
                  }
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-300 cursor-pointer z-10`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId='activeTabPill'
                      className='absolute inset-0 bg-[#9747FF] rounded-full z-[-1]'
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon
                    className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-500'}`}
                  />
                  <span
                    className={
                      isSelected ? 'text-white font-semibold' : 'text-[#414D60]'
                    }
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Header */}
        <div className='flex justify-between items-center mb-8 border-b border-gray-100 pb-4'>
          <div>
            <h2 className='text-xl sm:text-2xl font-bold text-[#002B6B]'>
              Featured Resources
            </h2>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveTab('all');
              setSelectedCategory('All Categories');
            }}
            className='text-xs sm:text-sm font-semibold text-[#9747FF] hover:text-[#7f2df2] flex items-center gap-1 transition-colors'
          >
            View all resources
            <FiArrowUpRight className='w-4 h-4' />
          </button>
        </div>

        {/* Cards Grid */}
        <motion.div
          layout
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[300px]'
        >
          <AnimatePresence mode='popLayout'>
            {filteredResources.map(resource => {
              const isAudio = resource.type === 'audio';
              const isPlaying = playingAudio === resource.fileUrl;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={resource.id}
                  className='bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(151,71,255,0.07)] transition-all duration-300 p-5 flex flex-col justify-between group'
                >
                  <div>
                    {/* Badge and Tag */}
                    <div className='flex justify-between items-center w-full'>
                      <div
                        className={`p-2.5 rounded-xl flex items-center justify-center ${
                          isAudio
                            ? 'bg-[#F3E8FF] text-[#9747FF]'
                            : 'bg-[#FFF0F3] text-[#FF4D6D]'
                        }`}
                      >
                        {isAudio ? (
                          <FiVolume2 className='w-5 h-5' />
                        ) : (
                          <FiFileText className='w-5 h-5' />
                        )}
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full ${
                          isAudio
                            ? 'bg-[#F3E8FF]/60 text-[#9747FF]'
                            : 'bg-[#FFF0F3]/60 text-[#FF4D6D]'
                        }`}
                      >
                        {resource.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className='text-[#002B6B] font-bold text-base sm:text-lg mt-4 mb-2 line-clamp-2 leading-snug group-hover:text-[#9747FF] transition-colors duration-200'>
                      {resource.title}
                    </h3>

                    {/* Description */}
                    <p className='text-[#414D60] text-xs sm:text-sm font-manrope line-clamp-3 leading-relaxed mb-6'>
                      {resource.description}
                    </p>
                  </div>

                  <div>
                    {/* Metadata */}
                    <div className='flex items-center gap-3 text-[11px] sm:text-xs text-[#5C6F84] border-t border-gray-100 pt-4 mb-4 font-manrope'>
                      <div className='flex items-center gap-1'>
                        {isAudio ? (
                          <>
                            <FiClock className='w-3.5 h-3.5' />
                            <span>{resource.meta}</span>
                          </>
                        ) : (
                          <>
                            <FiFileText className='w-3.5 h-3.5' />
                            <span>{resource.meta}</span>
                          </>
                        )}
                      </div>
                      <div className='w-[1px] h-3.5 bg-gray-200' />
                      <div className='flex items-center gap-1'>
                        <FiDownload className='w-3.5 h-3.5' />
                        <span>{resource.downloads}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className='flex gap-2'>
                      {isAudio ? (
                        <>
                          <button
                            onClick={e => handlePlayPause(resource.fileUrl, e)}
                            className={`flex-1 ${
                              isPlaying
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-[#9747FF] hover:bg-[#7f2df2]'
                            } text-white py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-200 text-xs sm:text-sm cursor-pointer shadow-sm`}
                          >
                            {isPlaying ? (
                              <>
                                <FiPause className='w-4 h-4' />
                                <span>Pause</span>
                              </>
                            ) : (
                              <>
                                <FiPlay className='w-4 h-4' />
                                <span>Play</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={e =>
                              handleDownload(
                                resource.fileUrl,
                                `${resource.title}.mp3`,
                                e
                              )
                            }
                            className='bg-gray-50 border border-gray-100 hover:bg-gray-100 text-gray-600 p-2.5 rounded-xl transition-all duration-200 cursor-pointer'
                            title='Download Audio File'
                          >
                            <FiDownload className='w-4 h-4' />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={e =>
                            handleDownload(
                              resource.fileUrl,
                              `${resource.title}.pdf`,
                              e
                            )
                          }
                          className='w-full bg-[#9747FF] hover:bg-[#7f2df2] text-white py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-200 text-xs sm:text-sm cursor-pointer shadow-sm'
                        >
                          <FiDownload className='w-4 h-4' />
                          <span>Download PDF</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty State */}
          {filteredResources.length === 0 && (
            <div className='col-span-full py-16 flex flex-col items-center justify-center text-center'>
              <div className='w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-4 border border-gray-100'>
                {activeTab === 'audio' ? (
                  <FiVolume2 className='w-6 h-6 text-[#9747FF]' />
                ) : (
                  <FiSearch className='w-6 h-6' />
                )}
              </div>
              <h4 className='text-[#002B6B] font-bold text-lg mb-1'>
                {activeTab === 'audio'
                  ? 'Check back later'
                  : 'No resources found'}
              </h4>
              <p className='text-gray-500 font-manrope text-sm max-w-md'>
                {activeTab === 'audio'
                  ? 'We are working on getting some amazing files. Kindly check back later'
                  : "We couldn't find any resources matching your search query or filters. Try adjusting your settings."}
              </p>
            </div>
          )}
        </motion.div>

        {/* Newsletter Subscription Banner */}
        <section className='mt-20'>
          <div className='w-full bg-[#F3E8FF]/70 border border-[#D0B6F2]/30 rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 shadow-[0_8px_30px_rgba(151,71,255,0.03)] relative overflow-hidden'>
            {/* Background pattern elements */}
            <div className='absolute right-0 top-0 w-48 h-48 bg-[#9747FF]/5 rounded-full blur-3xl pointer-events-none' />

            <div className='flex flex-col sm:flex-row items-center gap-5 md:gap-6 w-full lg:w-auto relative z-10 text-center sm:text-left'>
              <motion.div
                className='w-20 h-20 flex-shrink-0'
                animate={{ y: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut',
                }}
              >
                <img
                  src='/Images/resources/cloud_icon_3d.png'
                  alt='3D Cloud'
                  className='w-full h-full object-contain'
                />
              </motion.div>
              <div>
                <h3 className='text-lg md:text-xl font-bold text-[#002B6B]'>
                  Stay Updated with New Resources
                </h3>
                <p className='text-gray-600 text-xs md:text-sm font-manrope mt-1'>
                  Subscribe to get notified when new audio or PDF resources are
                  added.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className='w-full lg:max-w-md relative z-10'>
              <AnimatePresence mode='wait'>
                {!isSubscribed ? (
                  <motion.form
                    key='form'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubscribe}
                    className='flex flex-col sm:flex-row items-center bg-white rounded-2xl sm:rounded-full p-1.5 border border-gray-200/80 shadow-sm w-full gap-2'
                  >
                    <input
                      type='email'
                      required
                      placeholder='Enter your email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className='w-full bg-transparent border-none outline-none text-[#272F3A] font-manrope text-sm px-4 py-2.5 focus:ring-0 focus:outline-none'
                    />
                    <button
                      type='submit'
                      disabled={subLoading}
                      className='w-full sm:w-auto bg-[#9747FF] hover:bg-[#7f2df2] disabled:bg-[#9747FF]/70 text-white font-semibold text-sm px-6 py-2.5 rounded-xl sm:rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shadow-sm'
                    >
                      <span>{subLoading ? 'Subscribing...' : 'Subscribe'}</span>
                      <FiSend className='w-4 h-4' />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key='success'
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className='bg-[#D1E7DD] border border-[#A3CFBB] text-[#0F5132] px-5 py-3 rounded-2xl flex items-center gap-3 font-manrope'
                  >
                    <FiCheckCircle className='w-5 h-5 flex-shrink-0' />
                    <div>
                      <h4 className='font-bold text-sm'>
                        Successfully Subscribed!
                      </h4>
                      <p className='text-xs text-[#0F5132]/80 mt-0.5'>
                        Thank you! You will be notified of new resources.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Container */}
      <Footer />
    </div>
  );
};

export default ResourcesPage;
