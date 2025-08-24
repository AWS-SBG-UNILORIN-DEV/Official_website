
const AboutSection = () => {
  return (
    <section className='bg-[#FFFFFF] lg:my-[5rem] my-[3rem] lg:mx-[6.4rem] mx-[2rem] font-alexandria text-center items-center gap-[2.8rem]'>
        <h1 className="font-normal text-[#1E242C] lg:text-[3.5rem] text-[2.8rem] lg:mb-[2.8rem} mb-[1.8rem] ">
            About us
        </h1>
        <article className="w-full justify-between flex flex-row flex-wrap items-center lg:gap-0 gap-[2rem] ">
            <div className="flex lg:flex-row flex-col justify-between lg:gap-[2rem] gap-[0.6rem] items-center bg-[#FFFFFF] shadow-xl shadow-[#0000004F] lg:py-[0.8rem] py-[1rem] px-[1.34rem] rounded-[0.6875rem] border-[0.5px] border-[#0000004F] w-fit mx-auto">
                <div>
                    <img src="/Images/about_us/pink_arrow.svg" alt=" Pink Arrow" className="w-[4.06rem] h-[4.06rem]" />
                </div>
                <div className="text-[#000000] lg:text-start text-center">
                    <h3 className="font-[500] lg:text-[1.19rem] text-[1.3rem] mb-[0.5rem]">
                        Our Mission
                    </h3>
                    <p className="font-normal lg:text-[0.875rem] text-[0.7rem] max-w-[22.62rem]">
                        Our mission at AWS Cloud Club, University of Ilorin, is to equip students with hands-on cloud computing skills through workshops, mentorship, and real-world projects. 
                    </p>
                </div>
            </div>
            <div className="flex lg:flex-row flex-col justify-between lg:gap-[2rem] gap-[0.6rem] items-center bg-[#FFFFFF] shadow-xl shadow-[#0000004F] lg:py-[0.8rem] py-[1rem] px-[1.34rem] rounded-[0.6875rem] border-[0.5px] border-[#0000004F] w-fit mx-auto " >
                <div>
                    <img src="/Images/about_us/pink_spiral.svg" alt="Pink Spiral" className="w-[4.06rem] h-[4.06rem]" />
                </div>
                <div className="text-[#000000] lg:text-start text-center">
                    <h3 className="font-[500] lg:text-[1.19rem] text-[1.3rem] mb-[0.5rem]">
                        Our Vission
                    </h3>
                    <p className="font-normal lg:text-[0.875rem] text-[0.7rem] max-w-[22.62rem]">
                        We envision a vibrant student community that inspires and develops the next generation of cloud professionals and tech leaders in Africa. By bridging the gap between academic learning and industry demands,
                    </p>
                </div>
            </div>
        </article>
        <article className="flex lg:flex-row flex-col justify-between py-[2.8rem] text-[#1E242C] text-start items-start gap-[1.1875rem]">
            <h2 className="font-semibold text-[1.6875rem] lg:w-[14.6rem]">
                <span className="text-[#6328A3]">Introducing </span> 
                Aws Cloud University Of Ilorin
            </h2>
            <p className="font-normal lg:text-[1rem] text-[0.9rem] text-[#1E242C] lg:w-[28.4rem]">
                AWS Cloud Club, University of Ilorin, is a student-led community that empowers students to learn, build, and grow their skills in cloud computing using Amazon Web Services (AWS). Our mission is to create an inclusive environment where students from all backgrounds can explore cloud technologies, gain hands-on experience, and collaborate on real-world projects.
            </p>
            <p className="font-normal lg:text-[1rem] text-[0.9rem] text-[#1E242C] lg:w-[28rem]">
                We organize workshops, bootcamps, hackathons, and speaker sessions to help members develop both technical and soft skills. As an official AWS-supported program, we provide access to AWS credits, learning resources, and a global network of cloud enthusiasts.
            </p>
        </article>
        <article className="flex flex-row flex-wrap justify-between lg:gap-0 gap-[2.43rem]"> 
            <img src="/Images/about_us/aws_females.svg" alt="Aws female members group picture" className="w-[35rem]" />
            <img src="/Images/about_us/aws_group_pcture.svg" alt="Aws members group picture" className="w-[35rem]" />
        </article>
    </section>
  );
};

export default AboutSection;
