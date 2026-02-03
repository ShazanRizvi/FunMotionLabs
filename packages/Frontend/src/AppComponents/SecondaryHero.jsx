import React from 'react'
import { cn } from "@/lib/utils";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconApps
} from "@tabler/icons-react";
import {WavyBackground} from "@/components/ui/wavy-background";
import { LayoutGrid } from '@/components/ui/layout-grid';

const SecondaryHero = () => {
  return (
    <WavyBackground className="relative top-10 h-full w-full "> 
    <div className="relative h-screen max-w-7xl mx-auto min-h-screen"> 
    <div className= "relative max-w-7xl mx-auto w-full ">
        <div className='text-4xl flex justify-center items-center font-bold outfit-regular mb-10'>Who we are?</div> 
        <BentoGrid className="max-w-7xl mx-auto w-full flex-1"> 
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={cn(i === 4 || i === 7 ? "md:col-span-2 bg-pastel-blue/90" : "md:row-span-1 bg-white/50")} 
            />
          ))}
        </BentoGrid>


        <div className='mt-20 flex w-full p-2 justify-center'>
        <button className="px-8 py-3 cursor-pointer bg-gradient-to-r from-primary-blue  to-primary-blue text-soft-cream text-sm rounded-full hover:shadow-xl transition-all flex items-center gap-2 group">

        <span><IconApps/></span>
              <span className=" text-lg outfit-regular">Explore awesomness!!</span>
              
            </button>
        </div>
        
        </div>

    
    
      
      
    </div>
    </WavyBackground>
  )
}

export default SecondaryHero

const Skeleton = ({ imageUrl }) => {
  if (imageUrl) {
    return (
      <img 
        src={imageUrl}
        alt=""
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl object-cover" // Full container fill, no extra div needed
      />
    );
  }
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
  );
};
const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton imageUrl="https://plus.unsplash.com/premium_photo-1682088486926-42e23e19f421?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGdhbWluZ3xlbnwwfHwwfHx8MA%3D%3D"/>,
   
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton imageUrl='https://plus.unsplash.com/premium_photo-1680086981351-c83f503c34c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGdhbWluZ3xlbnwwfHwwfHx8MA%3D%3D' />,
   
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton imageUrl='https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdhbWluZ3xlbnwwfHwwfHx8MA%3D%3D'/>,
    
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton imageUrl="https://plus.unsplash.com/premium_photo-1680124607787-9e54118b1624?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FtZXJ8ZW58MHx8MHx8fDA%3D" />,
    
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton imageUrl="https://images.unsplash.com/photo-1559969143-b2defc6419fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdhbWVyfGVufDB8fDB8fHww" />,
    
  },
  
  

];

