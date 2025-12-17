import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation.tsx";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient.tsx";
import { Hand, Zap, Gamepad2 } from "lucide-react";

const Hero = () => {
  return (
    <BackgroundGradientAnimation>
      <div className="relative mt-20 mb-15 flex justify-center text-center">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-black text-white dark:text-white flex items-center space-x-2"
        >
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>No Controllers. Pure Motion.</span>
        </HoverBorderGradient>
      </div>

      <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-6xl text-center md:text-4xl lg:text-8xl">
        <div>
          <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Your Body is the
            <br />
            <span className=" drop-shadow-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Controller
            </span>
          </p>
          <p className="mt-2 bg-clip-text text-xl text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Experience the future of gaming with our revolutionary
            controller-free technology.
            <br />
            <span>Move, jump, and play using just your hands and legs.</span>
          </p>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default Hero;
