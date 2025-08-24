import { useState, useEffect } from 'react'
import next from '/src/assets/next.png'
import prev from '/src/assets/prev.png'


const Event = () => {


    const [scroll, setScroll] = useState(0)

    useEffect(() => {

    }, [])
  return (
    <div className='flex flex-col justify-center items-center py-12 px-4 gap-6 min-h-screen w-full'>
        <div>
            <h2 className="text-[60px] font-normal">
                Events
            </h2>
          </div>
          
          <div className="flex items-center w-[80%] justify-between">
            <div>
                <p className="font-bold text-2xl">
                    Our Upcoming Events
                </p>
              </div>
              
              <div className="flex justify-between gap-20">
                  <img src={prev} className="prev bg-[#f5f5f5] p-4 rounded-full border border-[#9747FF]" />
                  <img src={next} className="next bg-[#9747FF] p-4  rounded-full"/>
                  
              </div>
              
          </div>
          

    </div>
  )
}

export default Event
