"use client";
import { DraggableGallery } from "./_components/draggable-gallery";
import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

export default function DragglePhotoGallery() {
  return (
    <div className="w-[300vw] h-[300vh] photo-gallery-container bg-[#f4f3f0] relative  text-[14px] md:text-[1.05vw] ">
      <DraggableGallery />
    </div>
  );
}
