import React, { useEffect, useRef, useState } from "react";

const faqItems = [
  {
    question: "Do I need any special hardware or sensors to play?",
    answer:
      "No, just your computer! All you need is a mid-spec Windows laptop or PC and a standard webcam (either built-in or USB). We use advanced software to turn that camera into a motion tracker, so you don't need to buy expensive consoles or wearables.",
  },
  {
    question: "Is my webcam recording or saving video of me?",
    answer:
      "Absolutely not. Your privacy is our priority. All motion tracking happens locally on your computer in real-time. No video feed is ever recorded, saved, or uploaded to the cloud. What happens in your living room stays in your living room.",
  },
  {
    question: "How much space do I need to clear in my room?",
    answer:
      "Ideally, about 6 feet. You need to stand far enough back (usually 4–6 feet) so the camera can see your full body, from head to toe. As long as you have room to swing your arms without hitting a lamp, you’re good to go!",
  },
  {
    question: " Do I need a monthly subscription to play?",
    answer:
      "Nope! We hate subscription fatigue too. You simply buy the games you want (typically between $10 and $25) and own them forever. There are no hidden fees, no recurring costs, and absolutely no ads.",
  },
  {
    question: "Can I play this on my big TV?",
    answer:
      "Yes, and we highly recommend it! While you can play directly on your laptop screen, connecting your laptop to your TV via an HDMI cable gives you the best arcade-style experience. It makes multiplayer games and fitness sessions much more immersive.",
  },
  {
     question: "Do I need to be connected to the internet?",
     answer:
       "Only to download the game. Once you’ve purchased and downloaded a game, you can play 100% offline. It’s perfect for travel, spotty Wi-Fi connections, or just keeping your gaming time completely disconnected",
   },
  {
    question: "Does FunMotionLabs work on Mac or Apple devices?",
    answer:
      "Not yet, but we’re working on it! Right now, we are optimized for Windows 10 and 11. We are actively developing Mac support and plan to release it in the coming months, so stay tuned!",
  },
  
   {
     question: "Is this suitable for kids and fitness?",
     answer:
       "100%. We have specific games designed for kids to burn energy and learn, as well as fitness titles for adults that track reps and form. It’s \"active screen time\"—you get the fun of gaming without the sedentary downsides.",
   },
   {
     question: "Can two people play at the same time?",
     answer:
       "Yes, for specific games! Our tracking technology can handle multiplayer sessions. Check the game description to see if it supports \"Local Co-op\" or \"Versus\" modes, invite a friend over, and jump in together. Check the Game page for more info.",
   },
   {
     question: "What if my computer is too old or it doesn't work?",
     answer:
       "We’ve got you covered. We aim to support most mid-range computers, but if you find the tracking isn't working for your specific setup, just contact us. We’ll try to resolve your issue..",
   },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const listRef = useRef(null);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const updateScrollIndicator = () => {
      const hasOverflow = el.scrollHeight > el.clientHeight + 1;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
      setShowScrollIndicator(hasOverflow && !atBottom);
    };

    updateScrollIndicator();
    el.addEventListener("scroll", updateScrollIndicator);
    window.addEventListener("resize", updateScrollIndicator);

    return () => {
      el.removeEventListener("scroll", updateScrollIndicator);
      window.removeEventListener("resize", updateScrollIndicator);
    };
  }, []);

  return (
    <section className="w-full max-w-7xl rounded-[2.25rem] text-black px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl outfit-boldleading-[0.95] tracking-[-0.03em] font-semibold">
            <span>Frequently asked</span>
            <br />
            <span className="text-primary-blue">questions</span>
          </h2>
        </div>

        <div className="relative">
          <div
            ref={listRef}
            className="h-[24rem] sm:h-[26rem] lg:h-[28rem] overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:#2d7dff_transparent]"
          >
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.question}
                  className="border-t border-white/10 last:border-b last:border-white/10"
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="group flex w-full items-center gap-4 py-5 sm:py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`relative inline-flex h-5 w-5 flex-shrink-0 items-center justify-center transition-transform duration-300 ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                      aria-hidden="true"
                    >
                      <span className="absolute h-[2px] w-5 bg-[#2d7dff]" />
                      <span className="absolute h-5 w-[2px] bg-[#2d7dff]" />
                    </span>
                    <span className="text-xl sm:text-[1.92rem] lg:text-[2.05rem] leading-tight tracking-[-0.01em] text-black/95 outfit-regular">
                      {item.question}
                    </span>
                  </button>

                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0">
                      <p className="pb-6 pl-9 pr-2 text-base sm:text-lg leading-7 text-black/70 outfit-regular">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/35 via-white/10 to-transparent backdrop-blur-[1px] transition-opacity duration-300 ${
              showScrollIndicator ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />
          <div
            className={`pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${
              showScrollIndicator ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          >
            <span className="inline-flex h-9 w-6 items-start justify-center rounded-full border border-primary-blue/45 bg-white/45 pt-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-blue/85 animate-pulse" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
