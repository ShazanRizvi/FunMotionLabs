import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation.tsx";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient.tsx";
import { Hand, Zap, Gamepad2 } from "lucide-react";
import MainText from "./Hero/MainText";
import { SparklesPreview } from "./Hero/SparklesPreview";

import heroImage from "../../public/Hero.png";

const Hero = () => {
  return (
    <div className="relative h-screen w-full">
      
      <div>
        <img src={heroImage} alt="Hero Image" className="w-full h-full object-cover absolute top-0 left-0 brightness-50 z-20" />
      </div>
      
      <div className="absolute h-full w-full z-50 inset-0 flex items-center justify-center">
        <SparklesPreview />
      </div>

      <div className="absolute h-screen w-full z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-6xl text-left ">
        <div className="p-10">
          <MainText words={["FunMotionLabs", "फनमोशनलैब्स", "ファンモーションラボ", "ФунМошенЛабс"]} subtext="Revolutonizing the way we move and play." />
          
         
          <div className="mt-10 flex justify-center gap-6 pointer-events-auto">
            <button className="px-8 py-3 cursor-pointer bg-gradient-to-r from-primary-blue  to-primary-blue text-soft-cream text-sm rounded-full hover:shadow-xl transition-all flex items-center gap-2 group">
              <span className=" text-lg outfit-regular">Explore Games</span>
            </button>
            <button className=" px-8 py-3 cursor-pointer bg-white text-sm text-gray-900 rounded-full hover:shadow-lg transition-all border border-gray-200">
              <span className=" text-lg outfit-regular">Watch Demo</span>
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