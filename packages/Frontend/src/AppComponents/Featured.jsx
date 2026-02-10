import React from "react";
import Carousel from "@/components/ui/carousel";
import { Vortex } from "@/components/ui/vortex";

const Featured = () => {
  return (
    <section className="relative mx-auto w-full  mb-10 overflow-hidden rounded-[2rem] px-4 py-10 sm:px-7 sm:py-12 lg:px-8">
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_12%_8%,rgba(75,137,238,0.24),transparent_40%),radial-gradient(circle_at_88%_14%,rgba(101,218,247,0.35),transparent_42%),radial-gradient(circle_at_50%_110%,rgba(11,39,72,0.15),transparent_44%),linear-gradient(130deg,rgba(255,255,255,0.72),rgba(245,252,255,0.56)_48%,rgba(238,247,255,0.82))]" />
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_22px_45px_rgba(36,84,130,0.14)]" />

      <Vortex backgroundColor="transparent" backgroundOpacity={0} className="relative z-20">
        <div className="mb-8 flex flex-col items-center justify-center gap-3 text-center sm:mb-10">
          <span className="rounded-full border border-primary-blue/20 bg-white/70 px-4 py-1 text-xs tracking-[0.16em] text-primary-blue outfit-regular">
            DISCOVER NOW
          </span>
          <h2 className="text-4xl font-bold text-[#0f2233] outfit-bold sm:text-5xl">Featured & Recommended</h2>
        </div>
        <div className="relative z-40 h-full w-full overflow-hidden">
          <Carousel slides={gamesData} />
        </div>
      </Vortex>
    </section>
  );
};

export default Featured;

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
