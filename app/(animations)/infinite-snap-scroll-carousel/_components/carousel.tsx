"use client";
import { gallery } from "../static";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { horizontalLoop } from "../horizontal-scroll";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { motion, useMotionValue, useMotionValueEvent } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { useRafLoop } from "react-use";

const config = {
  speed: 2,
  threshold: 0.014,
  wheeFactor: 1.8,
  dragFactor: 1.2,
};

export default function Carousel() {
  //drag for mobile
  //scroll on the y and x direction for desktop and mobile
  //snaping
  //onClick it selects and moves to the clicked item.
  //infinite scroll
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({
    left: 0,
    right: 0,
  });

  // useMotionValueEvent(x, "change", (latest) => {
  //   if (x.get() <= dragConstraints.left / 2) {
  //     x.set(0);
  //   }
  // });

  useEffect(() => {}, []);

  return (
    <div
      ref={containerRef}
      className="w-full fixed bottom-4 left-0 right-0 overflow-hidden carousel-container"
    >
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        className="w-max flex carousel px-4 gap-4 md:gap-[1.05vw] "
        style={{ x }}
        ref={carouselRef}
      >
        {gallery.map((item, index) => (
          <div key={item.id} className="image-items">
            <Image
              width={150}
              height={200}
              src={item.image}
              alt={item.name}
              className="select-none"
              draggable={false}
            />
          </div>
        ))}
        {gallery.map((item, index) => (
          <div key={item.id} className="image-items">
            <Image
              width={150}
              height={200}
              src={item.image}
              alt={item.name}
              className="select-none"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
