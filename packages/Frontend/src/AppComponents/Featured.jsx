import React from 'react'
import Carousel from '@/components/ui/carousel'
import {Vortex} from '@/components/ui/vortex'

const Featured = () => {
  return (
    <div className='relative bg-transparent'> 
    <Vortex backgroundColor="#A0DEFF"
  backgroundOpacity={0.2} className='z-20'>
     <div className='text-4xl flex justify-center items-center font-bold outfit-regular  pt-10 pb-8'>Featured & Recommended</div> 
     <div className=" relative overflow-hidden z-40 w-full h-full ">
      <Carousel slides={gamesData} />
    </div>
    </Vortex> 
     </div>
  )
}

export default Featured

const gamesData = [
     {
       title: "Cyberpunk 2077",
       description: "An open-world action-adventure RPG set in a dystopian future.",
       button: "Play Now",
       src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
       genre: "RPG",
       
     },
     {
       title: "Elden Ring",
       description: "A fantasy action RPG with challenging combat and exploration.",
       button: "Play Now",
       src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
       genre: "Action RPG",
       rating: 4.8,
     },
     {
       title: "The Witcher 3",
       description: "Embark on an epic journey as Geralt of Rivia in this award-winning RPG.",
       button: "Play Now",
       src: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070&auto=format&fit=crop",
       genre: "RPG",
       rating: 4.9,
     },

     {
          title: "Horizon Zero Dawn",
          description: "Explore a post-apocalyptic world filled with robotic creatures.",
          button: "Play Now",
          src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2025&auto=format&fit=crop",
          genre: "Action Adventure",
          rating: 4.7,
        },
        {
          title: "God of War",
          description: "Join Kratos and Atreus on a journey through Norse mythology.",
          button: "Play Now",
          src: "https://images.unsplash.com/photo-1606166188517-c4b32fbb43d0?q=80&w=2070&auto=format&fit=crop",
          genre: "Action",
          
        },
        {
          title: "Red Dead Redemption 2",
          description: "Experience the wild west in this epic open-world adventure.",
          button: "Play Now",
          src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop",
          genre: "Action Adventure",
          
        },
        {
          title: "Red Dead Redemption 2",
          description: "Experience the wild west in this epic open-world adventure.",
          button: "Play Now",
          src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop",
          genre: "Action Adventure",
          
        },
        {
          title: "Red Dead Redemption 2",
          description: "Experience the wild west in this epic open-world adventure.",
          button: "Play Now",
          src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop",
          genre: "Action Adventure",
          
        },
      ];
