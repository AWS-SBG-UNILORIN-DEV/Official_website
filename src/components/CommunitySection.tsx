// import { motion } from "framer-motion";

const CommunitySection = () => {
  return (
    <section className="bg-[#FFFFFF] lg:my-[5rem] my-[3rem] lg:mx-[6.4rem] mx-[2rem] font-alexandria text-center items-center gap-[2.8rem] ">
      <h1 className="font-normal text-[#1E242C] lg:text-[3rem] text-[1.875rem] lg:mb-[2.8rem} mb-[1.8rem]">
        Our Community at a Glance
      </h1>
      <article className="bg-[url('/Images/community/bg.svg')] bg-cover bg-center h-screen w-full items-center">
        <div className="w-fit mx-auto">
          <img src="/Images/community/view.svg" alt="" />
        </div>
      </article>
    </section>
  );
};

export default CommunitySection;
