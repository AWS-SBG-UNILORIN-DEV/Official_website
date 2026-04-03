import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', href: '#Home' },
    { name: 'About us', href: '#About' },
    { name: 'Events', href: '#Event' },
    { name: 'Our Team', href: '#Team' },
  ];

  return (
    <header className='w-[90%] md:px-[2rem] fixed z-50 top-4 md:top-4'>
      <nav className='flex justify-between items-center h-fit mb-[2rem] bg-[#fff] py-2 px-4 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.08)] '>
        <a href='/'>
          <img src='/header-logo.png' alt='Logo' className='w-48' />
          {/* <img src='/Images/header/logo.svg' alt='Logo' /> */}
        </a>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex items-center justify-between w-[65%]'>
          <ul className='flex gap-[2.5rem] font-normal text-[1rem] text-[#272F3A]'>
            {navItems.map(item => (
              <motion.li
                key={item.name}
                className='relative cursor-pointer hover:text-[#6B46C1] transition-colors duration-200'
              >
                <a href={item.href}>
                  {item.name}
                  <motion.span
                    className='absolute bottom-[-5px] left-0 right-0 h-[2px] bg-[#6B46C1]'
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ originX: 0.5 }}
                  />
                </a>
              </motion.li>
            ))}
          </ul>
          <a href='#Register'>
            <button className='flex items-center gap-[1rem] font-normal text-[#fff] text-[1rem] rounded-full border-[1px] border-white p-[0.5rem] pl-[1.25rem] transition-colors bg-[#9747FF] hover hover:bg-[#fff] hover:border-purple-300 hover:text-[#9747FF] cursor-pointer transition duration-400 ease-in-out'>
              Register Now
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

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className='fixed top-0 right-0 h-full w-[60%] bg-[#FFFFFF] pt-10 shadow-lg flex flex-col items-center z-40'
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 70, damping: 15 }}
            >
              <ul className='flex flex-col items-center gap-[0.7rem] font-[500] text-[1.2rem] text-[#272F3A]'>
                {navItems.map(item => (
                  <li key={item.name} onClick={() => setIsMenuOpen(false)}>
                    <a
                      href={item.href}
                      className='block py-[0.5rem] px-[1rem] hover:text-[#6B46C1] transition-colors duration-200'
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href='#Register'
                onClick={() => setIsMenuOpen(false)}
                className='mt-[2rem]'
              >
                <motion.button
                  className='flex items-center gap-[1rem] font-normal text-[#272F3A] text-[1rem] rounded-full border-[1px] border-[#EDEEF0] p-[0.5rem] pl-[1.5rem] transition-colors'
                  whileHover={{ backgroundColor: '#F3F4F6' }}
                  transition={{ duration: 0.2 }}
                >
                  Register Now
                  <img
                    src='/Images/header/arrow.svg'
                    alt='Arrow up'
                    className='w-[1rem] h-[1rem]'
                  />
                </motion.button>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
