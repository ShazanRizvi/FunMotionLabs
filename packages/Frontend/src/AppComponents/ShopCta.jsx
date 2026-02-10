import React from "react";
import { Link } from "react-router-dom";
import { IconShoppingBag, IconApps } from "@tabler/icons-react";

const ShopCta = () => {
  const gameplayGif =
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3YXgyYWg3aDg0aWpuOW84N3VpZzBxamR4NGZ6MDQ0NnNkYnVzcHFydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JIraK0THaC0ymqkS7W/giphy.gif";

  return (
    <section className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[1.7rem] shadow-[0_24px_60px_rgba(9,30,64,0.28)]">
      <img
        src={gameplayGif}
        alt="Gameplay background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0e2f63]/92 via-[#2b63aa]/82 to-[#9ad8f5]/78" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_24%,rgba(255,255,255,0.28),transparent_46%),radial-gradient(circle_at_12%_86%,rgba(101,218,247,0.24),transparent_45%)]" />

      <div className="relative z-10 flex flex-col gap-9 px-6 py-8 sm:px-9 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-11">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-white/25 bg-white/12 px-3 py-1 text-xs tracking-[0.14em] text-white/85 outfit-regular">
            READY TO PLAY
          </span>
          <h2 className="mt-4 text-4xl leading-[0.95] text-white sm:text-5xl outfit-bold">Let's Get in Touch.</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base outfit-regular">
            Explore motion-first games built for fun, fitness, and privacy. Start with featured titles or connect
            with us for support, collaborations, and updates.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/games"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-5 py-3 text-sm text-[#14345f] transition hover:shadow-xl outfit-regular"
            >
              <IconApps size={18} />
              Browse Games
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/18 outfit-regular"
            >
              <IconShoppingBag size={18} />
              Shop Merch
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[34%]">
          <div className="rounded-2xl border border-white/22 bg-white/12 p-5 backdrop-blur-sm">
            <p className="text-xs tracking-[0.14em] text-cyan-100/90 outfit-regular">WHAT YOU GET</p>
            <ul className="mt-3 space-y-3 text-white/90 outfit-regular">
              <li className="rounded-xl border border-white/12 bg-black/10 px-3 py-2 text-sm">No console required</li>
              <li className="rounded-xl border border-white/12 bg-black/10 px-3 py-2 text-sm">Webcam-powered motion play</li>
              <li className="rounded-xl border border-white/12 bg-black/10 px-3 py-2 text-sm">Family-safe and privacy-first</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCta;
