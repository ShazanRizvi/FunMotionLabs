import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation.tsx";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient.tsx";
import { Hand, Zap, Gamepad2 } from "lucide-react";
import HeroRobot from "./HeroRobot";

const Hero = () => {
  return (
    <BackgroundGradientAnimation>
      <div className="relative mt-20 mb-0 flex justify-center text-center">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          <Zap className="w-4 h-4 text-primary-blue" />
          <span>No Controllers. Pure Motion.</span>
        </HoverBorderGradient>
      </div>

      <div className="absolute z-50 inset-0 flex items-center justify-left text-white font-bold px-4 pointer-events-none text-6xl text-left md:text-4xl lg:text-7xl">
        <div className="p-10">
          <p className="bg-clip-text bbh-hegarty-regular text-transparent drop-shadow-2xl bg-gradient-to-b from-black/90 to-black/30">
            Your Body is the
            <br />
            <span className=" drop-shadow-2xl bg-gradient-to-l from-primary-blue via-pastel-blue via-additional-blue to-primary-blue bg-clip-text text-transparent">
              Controller
            </span>
          </p>
          <p className="mt-8 max-w-2xl bg-clip-text font-medium text-lg text-black/30 drop-shadow-xl bg-gradient-to-b from-white/10 to-black/20">
            Experience the future of gaming with our revolutionary
            controller-free technology.
            <span>Move, jump, and play using just your hands and legs.</span>
          </p>
          <div className="mt-10 flex justify-left gap-6 pointer-events-auto">
            <button className="px-8 py-3 cursor-pointer bg-gradient-to-r from-primary-blue  to-primary-blue text-soft-cream text-sm rounded-full hover:shadow-xl transition-all flex items-center gap-2 group">
              <span className=" text-lg">Explore Games</span>
            </button>
            <button className=" px-8 py-3 cursor-pointer bg-white text-sm text-gray-900 rounded-full hover:shadow-lg transition-all border border-gray-200">
              <span className=" text-lg">Watch Demo</span>
            </button>
          </div>
        </div>
        <div className="p-10 w-1/2 h-1/2">
          <HeroRobot />
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default Hero;
