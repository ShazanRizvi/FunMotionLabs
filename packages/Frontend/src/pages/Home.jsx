import React from "react";
import Hero from "../AppComponents/Hero";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import SecondaryHero from "../AppComponents/SecondaryHero";
import Featured from "../AppComponents/Featured";
import MissionVision from "../AppComponents/MissionVision";
import ShopCta from "../AppComponents/ShopCta";

const Home = () => {
 
 
  return (
    <div className="absolute w-full h-screen bg-blue-400">
      <div className="relative top-0 left-0 right-0">
        <Hero />
      </div>
      <div className="relative max-w-full mx-auto ">
        <SecondaryHero />
    </div>
    <div className="relative max-w-full mx-auto h-full flex  justify-center ">
      <MissionVision/>
    </div>
    <div className="relative max-w-full mx-auto">
      <Featured/>
    </div>
    <div className="relative max-w-full mx-auto h-full flex items-center justify-center ">
      <ShopCta/>
    </div>
   
    </div>
  );
};
export default Home;

