import React from "react";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconFlame, IconHandStop, IconUser, IconRun } from "@tabler/icons-react";

const IconBadge = ({ icon: Icon }) => {
  return (
    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-primary-blue shadow-sm">
      <Icon size={20} stroke={1.8} />
    </div>
  );
};

const SecondaryHero = () => {
  const layoutClassMap = {
    wideTop: "md:col-span-2 md:col-start-1 md:row-start-1 bg-[#f7f7f6]",
    smallLeft: "md:col-start-1 md:row-start-2 bg-[#e9eded]",
    smallMiddle: "md:col-start-2 md:row-start-2 bg-[#e9eded]",
    tallRight: "md:col-start-3 md:row-start-1 md:row-span-3 bg-additional-blue text-[#0f2233]",
    bottomWide: "md:col-span-2 md:col-start-1 md:row-start-3 bg-[#e9eded]",
  };

  return (
    <section className="relative mx-auto w-full max-w-7xl py-10 sm:py-14">
      <div className="rounded-[2rem]  px-4 py-8 sm:px-7 sm:py-10 lg:px-8 lg:py-12">
        <div className="mb-8 grid gap-5 lg:mb-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <h2 className="text-4xl sm:text-5xl lg:text-[3.2rem] leading-[0.95] font-semibold text-[#0f2233] outfit-bold">
            Why We Are Different
          </h2>
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#4f677a] outfit-regular">
            We stripped away the plastic and wires to bring you closer to the game than ever before.
          </p>
        </div>

        <BentoGrid className="max-w-none md:auto-rows-[13.5rem]">
          {items.map((item) => (
            <BentoGridItem
              key={item.title}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn(
                "overflow-hidden border-none p-5 shadow-none hover:shadow-none",
                layoutClassMap[item.layout]
              )}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default SecondaryHero;

const items = [
  {
    layout: "wideTop",
    title: "Motion gaming for everyone — instantly.",
    description: "No holding onto plastic. Your hands are completely free to clap, wave, and interact naturally. No hardware barriers: if you’ve got a computer with a webcam, you can play.",
    header: (
      <div className="relative h-full w-full min-h-[7.5rem]">
        <IconBadge icon={IconHandStop} />
        <div className="pointer-events-none absolute -bottom-4 -right-7 flex h-32 w-32 items-center justify-center rounded-full bg-[#d2d5d6] sm:h-36 sm:w-36">
          <IconHandStop size={56} stroke={1.6} className="text-white/90 sm:h-16 sm:w-16" />
        </div>
      </div>
    )
  },
  {
    layout: "smallLeft",
    title: "100% Private Play",
    description: "All tracking happens on your device, No internet needed — we never save or upload video.",
    header: <IconBadge icon={IconRun} />
  },
  {
    layout: "smallMiddle",
    title: "Screen time that earns its keep.",
    description: "Designed for everyone. If you can move, you can play. Movement, learning, and laughter — all in one session.",
    header: <IconBadge icon={IconUser} />
  },
  {
    layout: "bottomWide",
    title: "Next-Gen AI Tracking",
    description: "High-accuracy motion detection meant for playful, fast gameplay.",
    header: <IconBadge icon={IconUser} />
  },
  {
    layout: "tallRight",
    title: "Movement Made Fun",
    description: "Burn calories without realizing it. It’s not a workout; it’s just serious fun.",
    header: (
      <div className="relative h-full w-full min-h-[16rem]">
        <IconBadge icon={IconFlame} />
        <div className="absolute bottom-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full border-[6px] border-white/25 bg-[radial-gradient(circle_at_30%_30%,rgba(205,255,245,0.68),rgba(126,238,247,0.58)_45%,rgba(70,188,210,0.66))] sm:h-64 sm:w-64">
          <div className="absolute inset-[10px] overflow-hidden rounded-full">
            <img
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&h=1100&fit=crop&auto=format&q=80"
              alt="Fitness motion"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    )
  }
];
