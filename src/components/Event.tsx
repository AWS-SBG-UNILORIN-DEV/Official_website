import { useState, useEffect } from 'react'
import next from '/src/assets/next.png'
import prev from '/src/assets/prev.png'


// Event Card Slider code


const Event = ({ Sliders }) => {

  // eventString: typeof EventString = null;

      const [eventSlider, setEventSlider] = useState(0)
      //setting the previous view button
      const prevBtn = () => {
        setEventSlider(eventSlider === 0 ? Sliders.length - 1 : eventSlider - 1)
        console.log("clicked");
        console.log(Sliders.length)
      }
    
      const nextBtn = () => {
        setEventSlider(eventSlider === Sliders.length - 1 ? 0 : eventSlider + 1)
        console.log(Sliders.length)
    }
  
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
                    
                    <div className="flex justify-between gap-4">
                      <img src={prev} className="prev bg-[#f5f5f5] p-4 rounded-full border border-[#9747FF] hover hover:bg-[#fff] " onClick={ prevBtn } />
                      <img src={next} className="next bg-[#9747FF] p-4  rounded-full hover hover:bg-[#7F00FF]" onClick={ nextBtn } />
                    </div>
                </div>
                    <div className="flex items-center justify-end">
                      { Sliders.map((item, id) => {
                        return (
                          <div className={eventSlider===id ? "block": "hidden"} > 
                            <div key={id} >
                              <img src={item.src} className="w-1/3"/>
                            </div>
                         </div>
                        )
                      })}
                    </div>
          </div>
        )
      }
    


export default Event
