"use client";
import { DraggableGalleryColumn } from "./draggable-gallery-column";
import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { MouseFollower } from "./mouse-follower";
import { GallerySwitch } from "./switch-gallery-view";

export const DraggableGallery = () => {
  const columns = Array.from({ length: 11 }, (_, index) => index);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseFollowerShouldShow, setMouseFollowerShouldShow] = useState(false);
  const [displayText, setDisplayText] = useState("Photo one");
  const [showRestOfImages, setShowRestOfImages] = useState(true);
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
      <MouseFollower
        shouldShow={mouseFollowerShouldShow}
        displayText={displayText}
      />
      <GallerySwitch setShowRestOfImages={setShowRestOfImages} />
      <motion.div
        ref={constraintsRef}
        drag
        dragConstraints={{
          right: constraints.left,
          left: -(constraints.right - containerBoundaries.width),
          top: -(constraints.bottom - containerBoundaries.height),
          bottom: -constraints.top,
        }}
        className="min-h-screen w-max cursor-grabbing flex gap-[15vw]  bg-[#f4f3f0] p-4"
      >
        <DraggableGalleryColumn
          setMouseFollowerShouldShow={setMouseFollowerShouldShow}
          setDisplayText={setDisplayText}
        />
        {showRestOfImages &&
          columns.map((_, index) => (
            <DraggableGalleryColumn
              key={index}
              inverse={index % 2 === 0}
              setMouseFollowerShouldShow={setMouseFollowerShouldShow}
              setDisplayText={setDisplayText}
            />
          ))}
      </motion.div>
    </div>
  );
};
