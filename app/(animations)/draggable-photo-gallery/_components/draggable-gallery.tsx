"use client";

import { DraggableGalleryColumn } from "./draggable-gallery-column";
import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";

export const DraggableGallery = () => {
  const columns = Array.from({ length: 12 }, (_, index) => index);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerBoundaries, setContainerBoundaries] = useState({
    width: 0,
    height: 0,
  });
  const [constraints, setConstraints] = useState({
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  });

  useEffect(() => {
    const containerRect = containerRef?.current?.getBoundingClientRect();
    const rect = constraintsRef?.current?.getBoundingClientRect();
    console.log(rect);
    if (rect && containerRect) {
      setConstraints({
        right: rect.right,
        left: rect.left,
        top: rect.top,
        bottom: rect.bottom,
      });
      setContainerBoundaries({
        width: containerRect.width,
        height: containerRect.height,
      });
    }
  }, []);
  return (
    <div
      ref={containerRef}
      className="w-screen h-screen absolute overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        ref={constraintsRef}
        drag
        dragConstraints={{
          right: constraints.left,
          left: -(constraints.right - containerBoundaries.width),
          top: -(constraints.bottom - containerBoundaries.height),
          bottom: -constraints.top,
        }}
        className="min-h-screen w-max cursor-grabbing flex gap-4  bg-[#f4f3f0] p-4"
      >
        {columns.map((_, index) => (
          <DraggableGalleryColumn key={index} inverse={index % 2 === 0} />
        ))}
      </motion.div>
    </div>
  );
};
