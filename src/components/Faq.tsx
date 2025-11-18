import { useState } from 'react';
import accordionBtn from '/Star1.png';
import { motion } from 'motion/react';

// main component type checking
interface Faq {
  id: string;
  question: string;
  answer: string;
}

interface FaqType {
  FaqData: Faq[];
}

// const Faq = ({ FaqData }: FaqType) => {
const Faq = ({ FaqData }: FaqType) => {
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const onClick = (id: string) => {
    setIsOpen(isOpen === id ? null : id);
  };

  return (
    <div className=' py-12 px-8 gap-6 flex items-center justify-center'>
      <div className='flex flex-col justify-center items-start gap-8 w-full lg:w-[90%]'>
        <div>
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{
              opacity: 1,
              y: 1,
              transition: { duration: 1.2, delay: 0.25 },
            }}
            viewport={{ once: true }}
            className='w-full text-left font-normal text-2xl'
          >
            Frequently Asked Questions
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 2, delay: 0.25 },
          }}
          viewport={{ once: true }}
          className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4'
        >
          {/* <div className='w-full flex  gap-4 lg:w-[40%] lg:flex-row'> */}
          {FaqData.map((item, id) => (
            <div key={id} onClick={() => onClick(item.id)}>
              <div
                className={`w-full md:w-full flex flex-col items-start justify-around lg:w-full opacity-100 gap-4 rounded-[20px] border border-[1px] p-6 shadow border border-gray-300 cursor-pointer ${isOpen === item.id ? 'bg-[#8AB9FF]/30 shadow-[0_4px_20px_rgba(138,185,255,0.4)]' : 'bg-[#FFFFFF]'}`}
              >
                <div className='flex flxx-row justify-between items-center gap-4'>
                  <h1 className='w-[36px] h-[36px] bg-[#EDEEF0] rounded-full text-center flex items-center justify-center border border-[#7f00ff]/80'>
                    {item.id}
                  </h1>
                  <h3 className='font-light text-md mb-4 md:mb-0 lg:text-xl flex itemx-center justify-center'>
                    {item.question}
                  </h3>
                  <img
                    src={accordionBtn}
                    className={`pt-2 cursor-pointer ${isOpen === item.id ? 'rotate-24 transition-all duration-300 ease-in-out' : ''}`}
                  />
                </div>
                {isOpen === item.id && (
                  <motion.div
                    // className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen === item.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <p className='font-light px-15 md:px-20 text-sm mb-4 md:mb-0 lg:text-md lg:px-10 pt-4 leading-loose'>
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Faq;
