"use client";
import { DraggableGallery } from "./_components/draggable-gallery";
import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

export default function DragglePhotoGallery() {
  const scrollReference = useRef(null);
  const { scrollYProgress, scrollXProgress } = useScroll({
    container: scrollReference,
  });

  return (
    <div
      className="w-screen h-screen  overflow-hidden bg-[#f4f3f0] relative"
      ref={scrollReference}
    >
      <DraggableGallery
        scrollYProgress={scrollYProgress}
        scrollXProgress={scrollXProgress}
      />
    </div>
  );
}
