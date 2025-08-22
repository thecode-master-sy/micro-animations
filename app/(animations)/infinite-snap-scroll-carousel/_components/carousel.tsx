"use client";
import { gallery } from "../static";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  motion,
  PanInfo,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";

export default function Carousel() {
  return (
    <div className="w-full  carousel-container">
      <div className="w-max flex carousel px-4 gap-4 md:gap-[1.05vw] ">
        {gallery.map((item, index) => (
          <div
            key={index}
            // ref={i === 0 ? slideRef : undefined} // Only ref the first slide for measurement
            className="image-items "
            // onClick={(e) => handleSlideClick(e, i)}
          >
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
      </div>
    </div>
  );
}
