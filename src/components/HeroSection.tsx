import hero_image from '/src/assets/hero-image.png';
// import hero_btn_arrow from "
import arrow from '/src/assets/arrow.png';
import group from '/src/assets/Group.png';

const HeroSection = () => {
  return (
    <div
      className='flex flex-col justify-center items-center py-12 px-4 gap-6 min-h-screen'
      style={{
        background: `radial-gradient(ellipse 100% 200% at center 97%,
                        #d8caeaff 0%, rgba(216, 209, 224, 0.6) 25%,
                        rgba(151, 71, 255, 0.2) 50%, transparent 70%), white`,
      }}
    >
      <div className='bg-white rounded-full shadow-[0 4px 20px rgba(0, 0, 0, 0.05)] px-4 py-1'>
        <h3 className='font-alexandria font-light text-[#002B6B] py-1 px-2 flex gap-4'>
          <img src={group} />
          Where Cloud Builders Unite
        </h3>
      </div>

      <div>
        <h1 className='font-alexandria font-bold text-3xl md:text-5xl text-center text-[#002B6B]'>
          {' '}
          AWS CLOUD CLUB
        </h1>
        <h1 className='font-alexandria font-bold text-3xl md:text-5xl text-center text-[#002B6B]'>
          {' '}
          UNIVERSITY OF ILORIN
        </h1>
      </div>

      <div>
        <p className='text-[#414D60] text-center'>
          Empowering Students With AWS Technology
        </p>
      </div>

      <div className='flex flex-col md:flex-row gap-4 md:gap-12 w-3/4 items-center justify-center'>
        <button className='bg-[#9747FF] py-2 px-5 rounded-full text-white flex gap-3'>
          Join Meet Up <img className='bg-white rounded-full' src={arrow} />
        </button>
        <button className='bg-[#9747FF] py-2 px-5 rounded-full text-white flex gap-3'>
          Join Community <img className='bg-white rounded-full' src={arrow} />
        </button>
      </div>

      <div className='w-3/4'>
        <img src={hero_image} />
      </div>
    </div>
  );
};

export default HeroSection;
