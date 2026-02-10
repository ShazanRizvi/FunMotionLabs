import React from "react";
import MainText from "./Hero/MainText";
import { SparklesPreview } from "./Hero/SparklesPreview";
import { Link } from 'react-router-dom'
import { IconRocket } from "@tabler/icons-react";
import heroImage from "../../public/Hero.png";

const Hero = () => {
  return (
    <div className="relative min-h-[100svh] w-full">
      
      <div>
        <img src='https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXI5amI4c2N2b2RjNmY5eHJqb2JuZmVseG85NGNoYm85a3VtZndxYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BZy4US4yNLoAr0bdAP/giphy.gif' alt="Hero Image" className="absolute top-0 left-0 z-20 h-full w-full object-cover brightness-50" />
      </div>
      
      <div className="absolute inset-0 z-50 flex h-full w-full items-center justify-center">
        <SparklesPreview />
      </div>

      <div className="pointer-events-none absolute inset-0 z-50 flex w-full items-center justify-center px-4 text-left font-bold text-white">
        <div className="w-full max-w-6xl px-4 py-8 sm:px-8 md:px-10">
          <MainText words={["No Controller", "No Console", "Just YOU"]} subtext="A fresh way to play: Motion-first games for everyone " />
          
         
          <div className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3 sm:gap-6">
            <Link to="/games">
            <div className='flex gap-4'>
            <button className="relative inline-flex h-14 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:ring-offset-3 focus:ring-offset-slate-50 shadow shadow-2xl hover:shadow-4xl">
              <span className=" absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4B89EE_0%,#A0DEFF_50%,#4B89EE_100%)]" />
              <span className=" px-5 py-4 outfit-regular text-md inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full  font-medium text-white backdrop-blur-3xl">
                <span><IconRocket /></span>
                <span className="outfit-regular text-base sm:text-lg">Browse Games</span>
              </span>
            </button>
          </div>
            </Link>
           
            <button className="cursor-pointer rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm text-gray-900 transition-all hover:shadow-lg sm:px-8 sm:py-3">
              <span className="outfit-regular text-base sm:text-lg">See how it works</span>
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Hero;



{/* <p className="bg-clip-text bbh-hegarty-regular text-transparent drop-shadow-2xl bg-gradient-to-b from-white/90 to-white/50 md:text-xl lg:text-7xl">
FunMotion
<br />
<span className=" drop-shadow-2xl bg-gradient-to-l from-primary-blue via-pastel-blue via-additional-blue to-primary-blue bg-clip-text text-transparent">
  Labs
</span>
</p>
<p className="mt-3 max-w-xl bg-clip-text font-medium text-2xl  text-white/80 drop-shadow-xl bg-gradient-to-b from-white/10 to-white/20 oswald-regular">

Revolutonizing the way we move and play.
</p> */}
