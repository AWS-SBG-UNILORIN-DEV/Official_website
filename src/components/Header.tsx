import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isResources =
    typeof window !== 'undefined' &&
    window.location.hash.startsWith('#/resources');

  const isCertifications =
    typeof window !== 'undefined' &&
    (window.location.hash.startsWith('#/hall-of-certifications') ||
      window.location.hash.startsWith('#/certifications'));

  const isOtherPage = isResources || isCertifications;

  const navItems = [
    { name: 'Home', href: isOtherPage ? '/#Home' : '#Home' },
    { name: 'About us', href: isOtherPage ? '/#About' : '#About' },
    { name: 'Our Team', href: isOtherPage ? '/#Team' : '#Team' },
    { name: 'Events', href: isOtherPage ? '/#Event' : '#Event' },
    { name: 'Resources', href: isOtherPage ? '/#/resources' : '#/resources' },
  ];

  return (
    <header className='w-[95%] lg:w-[90%] max-w-7xl fixed z-50 top-4 md:top-4 left-[2.5%] lg:left-1/2 lg:-translate-x-1/2'>
      <nav className='flex justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] items-center h-fit bg-[#fff] py-2 px-4 sm:px-6 md:px-8 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.08)] w-full'>
        <div className='flex justify-start items-center'>
          <a href='/'>
            <img
              src='/icon-3.png'
              alt='AWS STUDENTS BUILDER GROUP Logo'
              className='w-24 sm:w-28 md:w-32 lg:w-36'
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex justify-center items-center'>
          <ul className='flex gap-[1.25rem] xl:gap-[2.5rem] font-normal text-[0.95rem] xl:text-[1rem] text-[#272F3A]'>
            {navItems.map(item => {
              const isActive =
                item.name === 'Resources'
                  ? isResources
                  : !isOtherPage &&
                    (window.location.hash === item.href ||
                      (item.name === 'Home' &&
                        (!window.location.hash ||
                          window.location.hash === '#Home')));

              return (
                <motion.li
                  key={item.name}
                  className={`relative cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? 'text-[#6B46C1] font-semibold'
                      : 'text-[#272F3A] hover:text-[#6B46C1]'
                  }`}
                >
                  <a href={item.href}>
                    {item.name}
                    <motion.span
                      className='absolute bottom-[-5px] left-0 right-0 h-[2px] bg-[#6B46C1]'
                      initial={{ scaleX: isActive ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ originX: 0.5 }}
                    />
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div className='hidden lg:flex justify-end items-center'>
          <a href='#/hall-of-certifications'>
            <button className='flex items-center gap-[1rem] font-normal text-[#fff] text-[1rem] rounded-full border-[1px] border-white p-[0.5rem] pl-[1.25rem] transition-colors bg-[#9747FF] hover hover:bg-[#fff] hover:border-purple-300 hover:text-[#9747FF] cursor-pointer transition duration-400 ease-in-out'>
              View Impacts
              <img
                src='/Images/header/arrow.svg'
                alt='Arrow up'
                className='w-[1rem] h-[1rem]'
              />
            </button>
          </a>
        </div>

        {/* Mobile Hamburger Menu */}
        <div
          className='flex lg:hidden z-50 cursor-pointer'
          onClick={toggleMenu}
        >
          <motion.div
            className='flex flex-col justify-around w-6 h-6 relative'
            initial={false}
            animate={isMenuOpen ? 'open' : 'closed'}
          >
            <motion.span
              className='h-[2px] bg-[#9747FF] rounded-full'
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 6 },
              }}
            />
            <motion.span
              className='h-[2px] bg-[#9747FF] rounded-full'
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
            />
            <motion.span
              className='h-[2px] bg-[#9747FF] rounded-full'
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -6 },
              }}
            />
          </motion.div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className='fixed top-0 right-0 h-screen w-[70%] sm:w-[50%] bg-[#FFFFFF] pt-24 shadow-2xl flex flex-col items-center z-40 border-l border-gray-100'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 70, damping: 15 }}
          >
            <ul className='flex flex-col items-center gap-[1.5rem] font-[500] text-[1.2rem] text-[#272F3A] w-full px-6'>
              {navItems.map(item => {
                const isActive =
                  item.name === 'Resources'
                    ? isResources
                    : !isOtherPage &&
                      (window.location.hash === item.href ||
                        (item.name === 'Home' &&
                          (!window.location.hash ||
                            window.location.hash === '#Home')));

                return (
                  <li
                    key={item.name}
                    onClick={() => setIsMenuOpen(false)}
                    className='w-full text-center'
                  >
                    <a
                      href={item.href}
                      className={`block py-[0.75rem] px-[1.5rem] transition-colors duration-200 rounded-xl ${
                        isActive
                          ? 'text-[#6B46C1] font-semibold bg-[#F3E8FF]/60'
                          : 'text-[#272F3A] hover:text-[#6B46C1] hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href='#/hall-of-certifications'
              onClick={() => setIsMenuOpen(false)}
              className='mt-[2rem]'
            >
              <motion.button
                className='flex items-center gap-[1rem] font-normal text-white text-[1rem] rounded-full p-[0.6rem] px-[1.8rem] transition-colors bg-[#9747FF] hover:bg-[#7F00FF] cursor-pointer'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                View Impacts
                <img
                  src='/Images/header/arrow.svg'
                  alt='Arrow up'
                  className='w-[1rem] h-[1rem] brightness-0 invert'
                />
              </motion.button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
