"use client";

import { gallery } from "../static";
import { motion, AnimatePresence } from "motion/react";
import { Image } from "next/image";

export default function ImagePreview({
  currentSlideIndex,
}: {
  currentSlideIndex: number;
}) {
  return (
    <div className="fixed top-0 left-0 h-screen right-0 bg-black -z-10">
      <div className="w-full h-full relative">
        <AnimatePresence initial={false} mode="wait">
          <motion.Image
            key={currentSlideIndex}
            width={250}
            height={250}
            className="w-full h-full image-preview"
            src={gallery[currentSlideIndex]?.image || ""}
            alt={gallery[currentSlideIndex]?.name || "Unknown"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-[3vw]"></div>
      </div>
    </div>
  );
}
