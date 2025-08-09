"use client";
import { DraggableGalleryColumn } from "./draggable-gallery-column";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
  useTransform,
  MotionValue,
  useMotionValue,
  animate,
} from "motion/react";
import { useRef, useEffect, useState } from "react";
import { MouseFollower } from "./mouse-follower";
import { GallerySwitch } from "./switch-gallery-view";

export const DraggableGallery = ({
  scrollYProgress,
  scrollXProgress,
}: {
  scrollYProgress: MotionValue<number>;
  scrollXProgress: MotionValue<number>;
}) => {
  const columns = Array.from({ length: 11 }, (_, index) => index);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseFollowerShouldShow, setMouseFollowerShouldShow] = useState(false);
  const [displayText, setDisplayText] = useState("Photo one");
  const [showRestOfImages, setShowRestOfImages] = useState(true);
  const [drag, setDrag] = useState(true);
  const [containerBoundaries, setContainerBoundaries] = useState({
    width: 0,
    height: 0,
  });
  const [constraints, setConstraints] = useState({
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
  });
  const galleryControls = useAnimation();
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  // const scrollYProgressTransform = useTransform(
  //   scrollYProgress,
  //   [0, 1],
  //   [0, -constraints.height]
  // );
  // const scrollXProgressTransform = useTransform(
  //   scrollXProgress,
  //   [0, 1],
  //   [0, -constraints.width]
  // );
  // useMotionValueEvent(scrollYProgressTransform, "change", (latest) => {
  //   y.set(latest);
  // });
  // useMotionValueEvent(scrollXProgressTransform, "change", (latest) => {
  //   x.set(latest);
  // });  => scroll was had to integrate.
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
        width: rect.width,
        height: rect.height,
      });
      setContainerBoundaries({
        width: containerRect.width,
        height: containerRect.height,
      });
    }
  }, []);

  return (
    <div className="h-[350vh] w-[350vw] relative">
      <div
        ref={containerRef}
        className="w-screen h-[100svh] sticky top-0 overflow-hidden"
      >
        <MouseFollower
          shouldShow={mouseFollowerShouldShow}
          displayText={displayText}
        />
        <GallerySwitch setDrag={setDrag} galleryControls={galleryControls} />
        <motion.div
          ref={constraintsRef}
          drag={drag}
          dragConstraints={{
            right: constraints.left,
            left: -(constraints.right - containerBoundaries.width),
            top: -(constraints.bottom - containerBoundaries.height),
            bottom: -constraints.top,
          }}
          animate={galleryControls}
          className="min-h-screen w-max cursor-grabbing flex gap-[15vw]  bg-[#f4f3f0] p-4 draggable-gallery"
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
    </div>
  );
};
