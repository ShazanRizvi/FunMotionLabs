import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation.tsx";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient.tsx";
import { Hand, Zap, Gamepad2 } from "lucide-react";

const Hero = () => {
  return (
    <BackgroundGradientAnimation>
      <div className="relative mt-20 mb-0 flex justify-center text-center">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>No Controllers. Pure Motion.</span>
        </HoverBorderGradient>
      </div>

      <div className=" absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-6xl text-center md:text-4xl lg:text-8xl">
        <div>
          <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-black/80 to-black/20">
            Your Body is the
            <br />
            <span className=" drop-shadow-2xl bg-gradient-to-r from-[#7DADFC] via-[#8B5CF6] to-[#7DADFC] bg-clip-text text-transparent">
              Controller
            </span>
          </p>
          <p className="mt-2 bg-clip-text text-xl text-black/30 drop-shadow-2xl bg-gradient-to-b from-white/10 to-black/20">
            Experience the future of gaming with our revolutionary
            controller-free technology.
            <br />
            <span>Move, jump, and play using just your hands and legs.</span>
          </p>
            <div className="mt-8 flex justify-center gap-6 pointer-events-auto">
            <button className="px-8 py-4 bg-gradient-to-r from-[#488FFE] to-[#6366F1] text-white text-sm rounded-full hover:shadow-xl transition-all flex items-center gap-2 group">
                Explore Games
                
              </button>
              <button className="px-8 py-4 bg-white text-sm text-gray-900 rounded-full hover:shadow-lg transition-all border border-gray-200">
                Watch Demo
              </button>

          
        </div>
              
        </div>
       
        
      </div>
    </BackgroundGradientAnimation>
  );
};

export default Hero;
