import { useState, useEffect } from 'react'
import arrow from '/src/assets/arrow.png'

const Event = () => {

    // type image = [

    // ]

    const [scroll, setScroll] = useState(0)

    useEffect(() => {

    }, [])
  return (
    <div className='flex flex-col justify-center items-center py-12 px-4 gap-6 min-h-screen w-full'>
        <div>
            <h2 className="text-2xl font-bold">
                Events
            </h2>
          </div>
          
          <div className=" paragraph-next-prev-section flex items-center justify-between">
            <div>
                <p>
                    Our Upcoming Events
                </p>
              </div>
              
              <div className="flex ">
                  <img src={arrow} className="prev" />
                  <img src={arrow} className="next"/>
                  
              </div>
              
          </div>
          

    </div>
  )
}

export default Event
