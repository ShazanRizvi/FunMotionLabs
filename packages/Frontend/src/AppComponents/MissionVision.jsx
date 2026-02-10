import React from "react";
import { IconTargetArrow, IconSparkles, IconShieldCheck, IconHeart } from "@tabler/icons-react";

const gameplayGif =
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXJwZWE5bjNtNm95ZWlwdHpqYTh0dnR0MXpkcG94NDEzenhzbWd1ZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/HIlTmfpYApLVThFsdS/giphy.gif";

const MissionVision = () => {
  return (
    <section className="relative w-full max-w-7xl overflow-hidden rounded-[2rem] shadow-[0_30px_70px_rgba(7,24,48,0.22)]">
      <img
        src={gameplayGif}
        alt="Gameplay background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1528]/95 via-[#0d1e36]/84 to-[#0f2745]/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(101,218,247,0.35),transparent_48%),radial-gradient(circle_at_18%_90%,rgba(160,222,255,0.18),transparent_45%)]" />

      <div className="relative z-10 grid gap-8 px-6 py-8 sm:px-9 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-12 lg:py-12">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs tracking-[0.16em] text-sky-200 outfit-regular">
            <IconSparkles size={14} />
            MOTION-FIRST GAMING
          </p>
          <h2 className="mt-4 text-4xl leading-[0.95] text-white sm:text-5xl lg:text-6xl outfit-bold">
            Mission & Vision
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-100/90 sm:text-base outfit-regular">
            
            We believe screen time shouldn't mean sitting time. We're putting the 'motion' back in emotion.Technology should move you—literally.
Fun first. Fitness second. Privacy always. Building a world where video games make you healthier, happier, and stronger.

          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
              <div className="text-xl text-white outfit-bold">15+ min</div>
              <div className="mt-1 text-xs text-slate-200/80 outfit-regular">Average active session</div>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
              <div className="text-xl text-white outfit-bold">No Sensors</div>
              <div className="mt-1 text-xs text-slate-200/80 outfit-regular">Only webcam + software</div>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
              <div className="text-xl text-white outfit-bold">Private</div>
              <div className="mt-1 text-xs text-slate-200/80 outfit-regular">No cloud video storage</div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <article className="rounded-2xl border border-white/18 bg-white/12 p-5 backdrop-blur-sm">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary-blue">
              <IconTargetArrow size={20} />
            </div>
            <h3 className="text-xl text-white outfit-bold">Our Mission</h3>
            <p className="mt-2 text-sm leading-6 text-slate-100/88 outfit-regular">
              Turn everyday movement into playful gameplay where kids and adults can jump, dodge, and interact
              with zero controller friction.
            </p>
          </article>

          

          <article className="rounded-2xl border border-cyan-200/25 bg-cyan-200/10 p-5 backdrop-blur-sm">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-primary-blue">
              <IconShieldCheck size={20} />
            </div>
            <h3 className="text-xl text-white outfit-bold">Privacy Promise</h3>
            <p className="mt-2 text-sm leading-6 text-slate-100/88 outfit-regular">
              Tracking runs locally on device. We are serious about consent, safety, and transparent product
              behavior for families.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
