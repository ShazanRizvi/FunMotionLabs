import React, { useEffect, useMemo, useState } from "react";
import Carousel from "@/components/ui/carousel";
import { Vortex } from "@/components/ui/vortex";
import { fetchFeaturedGames } from "@/http/listingsApi";

const Featured = () => {
  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    let mounted = true;

    const loadFeaturedGames = async () => {
      try {
        const games = await fetchFeaturedGames();
        if (!mounted) return;
        setGamesData(
          games.map((game) => ({
            title: game.title,
            description: game.description,
            button: "Play Now",
            src: game.image,
            genre: game.genre,
            rating: game.rating,
          }))
        );
      } catch {
        if (mounted) {
          setGamesData([]);
        }
      }
    };

    loadFeaturedGames();

    return () => {
      mounted = false;
    };
  }, []);

  const slides = useMemo(() => gamesData, [gamesData]);

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
          {slides.length > 0 ? (
            <Carousel slides={slides} />
          ) : (
            <div className="flex min-h-[240px] items-center justify-center text-center text-[#0f2233] outfit-regular">
              No featured games available right now.
            </div>
          )}
        </div>
      </Vortex>
    </section>
  );
};

export default Featured;
