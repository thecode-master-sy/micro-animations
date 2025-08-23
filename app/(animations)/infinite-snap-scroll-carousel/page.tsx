"use client";

import Nav from "./_components/nav";
import ImagePreview from "./_components/image-preview";
import Carousel from "./_components/carousel";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gallery } from "./static";

export default function InfiniteSnapScrollCarousel() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col text-white">
      <Nav />
      <ImagePreview currentSlideIndex={currentSlideIndex} />
      <div
        className="relative w-full md:mt-[5vw] mt-[200px] overflow-hidden"
        style={{ clipPath: "inset(0 0 0 0)" }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.h1
            key={currentSlideIndex}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="uppercase text-center font-bold"
          >
            {gallery[currentSlideIndex]?.name || "Unknown"}
          </motion.h1>
        </AnimatePresence>
      </div>
      <Carousel
        currentSlideIndex={currentSlideIndex}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
    </div>
  );
}
