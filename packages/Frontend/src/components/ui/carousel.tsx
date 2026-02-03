"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";
import { CardContainer, CardBody, CardItem } from "./3d-card";

interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title, description, genre, rating } = slide;
  const isActive = current === index;  

  return (
    // <div className="[perspective:1200px] [transform-style:preserve-3d]">
    //   <li
    //     ref={slideRef}
    //     className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10 "
    //     onClick={() => handleSlideClick(index)}
    //     onMouseMove={handleMouseMove}
    //     onMouseLeave={handleMouseLeave}
    //     style={{
    //       transform:
    //         current !== index
    //           ? "scale(0.98) rotateX(8deg)"
    //           : "scale(1) rotateX(0deg)",
    //       transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    //       transformOrigin: "bottom",
    //     }}
    //   >
    //     <div
    //       className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
    //       style={{
    //         transform:
    //           current === index
    //             ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
    //             : "none",
    //       }}
    //     >
    //       <img
    //         className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
    //         style={{
    //           opacity: current === index ? 1 : 0.5,
    //         }}
    //         alt={title}
    //         src={src}
    //         onLoad={imageLoaded}
    //         loading="eager"
    //         decoding="sync"
    //       />
    //       {current === index && (
    //         <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
    //       )}
    //     </div>

    //     <article
    //       className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${
    //         current === index ? "opacity-100 visible" : "opacity-0 invisible"
    //       }`}
    //     >
    //       <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold  relative">
    //         {title}
    //       </h2>
    //       <div className="flex justify-center">
    //         <button className="mt-6  px-4 py-2 w-fit mx-auto sm:text-sm text-black bg-white h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
    //           {button}
    //         </button>
    //       </div>
    //     </article>
    //   </li>
    // </div>
    <li
    className="flex flex-1 flex-col items-center justify-center  relative w-[70vmin] h-[70vmin] mx-[-4vmin] z-10"
    onClick={() => handleSlideClick(index)}
    style={{
      transform: isActive ? "scale(1.1)" : "scale(0.6)",
      opacity: isActive ? 1 : 0.6,
      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s",
    }}
  >
    <CardContainer className=" w-full h-full ">
      <CardBody className="bg-gradient-to-br from-white/30 to-white/10 relative border-white/20 shadow-xl shadow-[0px_8px_45px_10px_rgba(0,0,0,0.6)] shadow-inner shadow-gray-400 group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] w-full h-full rounded-xl p-6 ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-primary-blue dark:text-white outfit-regular"
        >
          {title}
        </CardItem>
        {description && (
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-700 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-2 outfit-regular"
          >
            {description}
          </CardItem>
        )}
        {rating && (
          <CardItem
            translateZ={30}
            className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 outfit-regular"
          >
            ⭐ {rating}/5
          </CardItem>
        )}
        <CardItem
          translateZ="100"
          rotateX={10}
          className="w-full mt-4"
        >
        <img
        src={src}
        alt={title}
        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
      />
    </CardItem>
    <div className="flex justify-between items-center mt-4">
      {genre && (
        <CardItem
          translateZ={20}
          className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white bg-soft-cream dark:bg-neutral-800 outfit-regular"
        >
          {genre}
        </CardItem>
      )}
      <CardItem
        translateZ={20}
        as="button"
        className="px-8 py-3 cursor-pointer outfit-regular bg-gradient-to-r from-primary-blue  to-primary-blue text-soft-cream text-sm rounded-full hover:shadow-xl transition-all flex items-center gap-2 group"
      >
        {button}
      </CardItem>
    </div>
  
  </CardBody>
</CardContainer>
</li>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#4B89EE] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative w-[70vmin] h-[70vmin] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex mx-[6vmin] my-[-3vmin] px-[calc((100%-70vmin)/2+1vmin) transition-transform duration-1000 ease-in-out pt-5"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%-3rem)]">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
