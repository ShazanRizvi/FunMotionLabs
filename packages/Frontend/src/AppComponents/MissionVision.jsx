import React from 'react'
import { IconTargetArrow, IconScanEye } from '@tabler/icons-react';
import Spline from '@splinetool/react-spline';
import {BackgroundRippleEffect} from '@/components/ui/background-ripple-effect'

const MissionVision = () => {
  return (
     
    <div className=' flex items-center bg-gradient-to-r from-soft-cream/10 to-soft-cream backdrop-blur-xl shadow shadow-2xl w-3/4 h-[700px] rounded-lg'>
    
     <div className='pl-20 flex flex-col  h-1/2 w-2/4 items-center justify-between '>
       
     <div className=' '>
     <div>
     <IconScanEye className='mb-2' stroke={2} size={38} color='#4B89EE'/>
     </div>
     
     <div className='bbh-hegarty-regular text-3xl tracking-wider text-primary-blue'>
               Vision
          </div>
          
          <div>
               <p className='text-sm text-neutral-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed volutpat mi. Nulla augue neque, maximus in diam sit amet, dictum lacinia urna. Morbi posuere pharetra justo. Curabitur ipsum ex, gravida at elementum lobortis, scelerisque a mauris. Praesent at imperdiet lacus. Aliquam tristique, lorem sed imperdiet ornare</p>
          </div>
     </div>
     <div className=' '>
     <div>
     <IconTargetArrow className='mb-2' stroke={2} size={38} color='#4B89EE'/>
     </div>
     
     <div className='bbh-hegarty-regular text-3xl tracking-wider text-primary-blue'>
               Mission
          </div>
          <div>
          <p className='text-sm text-neutral-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed volutpat mi. Nulla augue neque, maximus in diam sit amet, dictum lacinia urna. Morbi posuere pharetra justo. Curabitur ipsum ex, gravida at elementum lobortis, scelerisque a mauris. Praesent at imperdiet lacus. Aliquam tristique, lorem sed imperdiet ornare</p>
          </div>
     </div>
   
     </div>
     <div className=' w-1/2 flex justify-center items-center h-full'>
     <Spline scene="https://prod.spline.design/shRRiAKZKZ6Z8OTc/scene.splinecode" />
     </div>
     
    </div>
    
  )
}

export default MissionVision