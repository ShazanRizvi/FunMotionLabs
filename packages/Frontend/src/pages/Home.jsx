import React from "react";
import Hero from "../AppComponents/Hero";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import SecondaryHero from "../AppComponents/SecondaryHero";
import Featured from "../AppComponents/Featured";
import MissionVision from "../AppComponents/MissionVision";
import ShopCta from "../AppComponents/ShopCta";
import Footer from "../AppComponents/Footer";
import FAQ from "../AppComponents/FAQ";

const Home = () => {
  return (
    <div className="absolute w-full h-screen home-grunge-bg">
      <div className="relative top-0 left-0 right-0">
        <Hero />
      </div>
      <div className="relative max-w-full mx-auto ">
        <SecondaryHero />
    </div>
    
    <div className="relative max-w-full mx-auto">
      <Featured/>
    </div>
    <div className="relative max-w-full mx-auto mb-20 flex  justify-center ">
      <MissionVision/>
    </div>
    <div className="relative max-w-full mx-auto mb-20 flex  justify-center ">
      <FAQ/>
    </div>
    <div className="relative max-w-full mx-auto mb-20 flex mt-20 justify-center ">
      <ShopCta/>
    </div>
    <div className="w-full bg-blue-900 ">
      <Footer/>
    </div>
    </div>
  );
};
export default Home;
