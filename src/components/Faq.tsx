import { useState, useEffect } from 'react';
import accordionBtn from '/Star1.png';
// import FaqData from '/src/assets/faqData.json';

// main component type checking
interface Faq {
  id: string;
  question: string;
  answer: string;
}

interface FaqType {
  FaqData: Faq[];
}

// Accordion function type checking
// interface Accordions {
//   title: string;
//   content: string;
//   isOpen: boolean;
//   onToggle: boolean;
// }

// interface AccordionType {
//   Accordion: Accordions[];
// }

// const AccordionItem = ({ Accordion }: AccordionType, { FaqData }: FaqType) => {
//   console.log(FaqData);
//   return (
//     <div
//       className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-20'}`}
//     >
//       <div className='flex justify-between item-start p-6 cursor-pointer'>
//         <div className='text-2xl font-bold'></div>
//       </div>
//     </div>
//   );
// };

// AccordionItem(FaqData, FaqData);
// width: 56;
// height: 56;
// angle: 0 deg;
// opacity: 1;
// border-radius: 48px;

const Faq = ({ FaqData }: FaqType) => {
  console.log(FaqData);
  const [isOpen, setIsOpen] = useState(null);

  // useEffect(() => {}); 

  const toggleOpen = (id: string) => {
    setIsOpen(isOpen === id ? null : id)
  }

  return (
    <div className=' py-12 px-8 gap-6 min-h-screen '>
      <div className='flex flex-col justify-center items-start gap-8 w-full lg:w-[90%]'>
        <div>
          <h2 className='w-full text-left font-normal text-2xl'>
            Frequently Asked Questions
          </h2>
        </div>
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {FaqData.map((item, id) => (
            <div key={id} className=''>
              <div className='w-full md:w-3/4 lg:w-full opacity-100 gap-4 rounded-[20px] border border-[1px] p-6 shadow border border-gray-300 cursor-pointer'>
                <div className='flex justify-around items-start'>
                  <h1 className='w-[36px] h-[36px] bg-[#EDEEF0] rounded-full text-center flex items-center justify-center'>
                    {item.id}
                  </h1>
                  <h3 className='font-alike font-light text-md mb-4 md:mb-0 lg:text-xl flex itemx-center justify-center'>
                    {item.question}
                  </h3>
                  <img src={accordionBtn} className='pt-2 cursor-pointer' />
                </div>
                <div className='hidden'>
                  <p className='font-alike font-light text-md mb-4 md:mb-0 lg:text-md'>
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;

