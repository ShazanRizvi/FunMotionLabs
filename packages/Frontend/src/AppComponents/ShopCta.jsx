import React from 'react'
import { IconTargetArrow, IconScanEye } from '@tabler/icons-react';
import Spline from '@splinetool/react-spline';
import {BackgroundRippleEffect} from '@/components/ui/background-ripple-effect'

const ShopCta = () => {
  return (
     
    <div className='flex items-center bg-gradient-to-r from-primary-blue to-pastel-blue/50 backdrop-blur-xl shadow shadow-2xl w-3/4 h-1/2 rounded-lg'>
    
     <div className='pl-20 flex flex-col  h-1/2 w-1/2  '>
       
     <div className=' '>
     <div className='outfit-bold text-5xl  text-white tracking-normal mb-8 '>
               Let's Get in Touch.
          </div>
          <div className='outfit-thin text-white/80'>
               <p>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed volutpat mi. Nulla augue neque, maximus in diam sit amet, dictum lacinia urna.
               </p>

          </div>
          <div className='flex  mt-15 gap-5'>
        
            <button className="relative inline-flex h-13 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:ring-offset-3 focus:ring-offset-slate-50 shadow shadow-2xl hover:shadow-4xl">
  <span className=" absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#65DAF7_0%,#A0DEFF_50%,#4B89EE_100%)]" />
  <span className=" px-10 py-4 outfit-regular text-md inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full text-xl font-medium text-white backdrop-blur-3xl">
    Explore Now!
  </span>
</button>
          </div> 
     </div>
   
     </div>
     <div className=' w-1/2 flex justify-center items-center h-full'>
     <Spline scene="https://prod.spline.design/shRRiAKZKZ6Z8OTc/scene.splinecode" />
     </div>
     
     
    </div>
    
  )
}

export default ShopCta