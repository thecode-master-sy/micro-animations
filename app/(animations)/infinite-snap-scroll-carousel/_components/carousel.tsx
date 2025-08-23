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

const config = {
  SCROLL_SPEED: 1.75,
  LERP_FACTOR: 0.08,
  MAX_VELOCITY: 150,
  SNAP_LERP_FACTOR: 0.3,
};

export default function Carousel({
  currentSlideIndex,
  setCurrentSlideIndex,
}: {
  currentSlideIndex: number;
  setCurrentSlideIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const stateRef = useRef({
    currentX: 0,
    targetX: 0,
    slideWidth: 300,
    lastScrollTime: Date.now(),
    isMoving: false,
    velocity: 0,
    lastCurrentX: 0,
    dragDistance: 0,
    hasActuallyDragged: false,
    isDragging: false,
    startX: 0,
    lastX: 0,
    lastMouseX: 0,
    hasSnapped: false,
    prevIsMoving: false,
    isSnapping: false,
  });

  const trackRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef(null);
  const animationFrameRef = useRef(0);
  const totalSlideCount = gallery.length;
  const copies = 6;
  const totalSlides = totalSlideCount * copies;

  const calculateSlideWidth = useCallback(() => {
    if (slideRef.current && trackRef.current) {
      const slideStyle = window.getComputedStyle(slideRef.current);
      const slideWidth = parseFloat(slideStyle.width);
      const trackStyle = window.getComputedStyle(trackRef.current);
      const gap =
        parseFloat(trackStyle.gap) || parseFloat(trackStyle.columnGap) || 0;

      stateRef.current.slideWidth = slideWidth + gap;
      return slideWidth + gap;
    }
    return 300;
  }, []);

  useEffect(() => {
    const startOffset = -(totalSlideCount * stateRef.current.slideWidth * 2);
    stateRef.current.currentX = startOffset;
    stateRef.current.targetX = startOffset;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${startOffset}px, 0, 0)`;
    }
  }, [totalSlideCount]);

  useEffect(() => {
    if (slideRef.current && gallery.length > 0) {
      calculateSlideWidth();
      const startOffset = -(totalSlideCount * stateRef.current.slideWidth * 2);
      stateRef.current.currentX = startOffset;
      stateRef.current.targetX = startOffset;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${startOffset}px, 0, 0)`;
      }
    }
  }, [gallery, calculateSlideWidth, totalSlideCount]);

  const handleSlideClick = useCallback(
    (slideIndex: number) => {
      const sequenceWidth = stateRef.current.slideWidth * totalSlideCount;
      // Calculate the position to align the clicked slide to the left edge
      const targetSlideIndex = slideIndex % totalSlideCount;
      const sequenceOffset = Math.floor(slideIndex / totalSlideCount);
      const targetX = -(
        targetSlideIndex * stateRef.current.slideWidth +
        sequenceOffset * sequenceWidth
      );

      stateRef.current.targetX = targetX;
      stateRef.current.lastScrollTime = Date.now();

      // Set the current slide index to the clicked slide's gallery index
      const displayIndex = targetSlideIndex;
      setCurrentSlideIndex(displayIndex);
    },
    [totalSlideCount]
  );

  const snapToNearestSlide = useCallback(() => {
    const sequenceWidth = stateRef.current.slideWidth * totalSlideCount;
    const normalizedX = stateRef.current.currentX % sequenceWidth;
    const slideIndex = Math.round(normalizedX / stateRef.current.slideWidth);
    const snapX = slideIndex * stateRef.current.slideWidth;

    stateRef.current.targetX =
      stateRef.current.currentX - (normalizedX - snapX);
    stateRef.current.hasSnapped = true;
    stateRef.current.isSnapping = true;

    // Calculate the display index (0 to totalSlideCount - 1) for the slide closest to the left edge
    const adjustedIndex = Math.round(
      -stateRef.current.targetX / stateRef.current.slideWidth
    );
    const displayIndex =
      ((adjustedIndex % totalSlideCount) + totalSlideCount) % totalSlideCount;
    setCurrentSlideIndex(displayIndex);
  }, [totalSlideCount]);

  const updateSlidePositions = useCallback(() => {
    if (!trackRef.current) return;

    const sequenceWidth = stateRef.current.slideWidth * totalSlideCount;

    // Infinite loop logic
    if (stateRef.current.currentX > -sequenceWidth * 1) {
      stateRef.current.currentX -= sequenceWidth;
      stateRef.current.targetX -= sequenceWidth;
    } else if (stateRef.current.currentX < -sequenceWidth * 4) {
      stateRef.current.currentX += sequenceWidth;
      stateRef.current.targetX += sequenceWidth;
    }

    // Apply transform directly to DOM
    trackRef.current.style.transform = `translate3d(${stateRef.current.currentX}px, 0, 0)`;
  }, [totalSlideCount]);

  const updateMovingState = useCallback(() => {
    const velocity = Math.abs(
      stateRef.current.currentX - stateRef.current.lastCurrentX
    );
    stateRef.current.velocity = velocity;
    stateRef.current.lastCurrentX = stateRef.current.currentX;

    const isSlowEnough = velocity < 0.1;
    const hasBeenStillLongEnough =
      Date.now() - stateRef.current.lastScrollTime > 200;

    const isMoving =
      stateRef.current.hasActuallyDragged ||
      !isSlowEnough ||
      !hasBeenStillLongEnough;
    stateRef.current.isMoving = isMoving;

    // Trigger snapping when the carousel stops moving
    if (
      !stateRef.current.isMoving &&
      stateRef.current.prevIsMoving &&
      !stateRef.current.hasSnapped
    ) {
      snapToNearestSlide();
    }

    if (
      stateRef.current.isSnapping &&
      Math.abs(stateRef.current.currentX - stateRef.current.targetX) < 0.1
    ) {
      stateRef.current.isSnapping = false;
    }

    stateRef.current.prevIsMoving = stateRef.current.isMoving;
  }, [snapToNearestSlide]);

  const animate = useCallback(() => {
    const lerpFactor = stateRef.current.isSnapping
      ? config.SNAP_LERP_FACTOR
      : config.LERP_FACTOR;
    stateRef.current.currentX +=
      (stateRef.current.targetX - stateRef.current.currentX) * lerpFactor;

    updateMovingState();
    updateSlidePositions();

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateMovingState, updateSlidePositions]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  const handleDragStart = useCallback(() => {
    stateRef.current.hasSnapped = false;
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      return;
    }

    e.preventDefault();

    const scrollData = e.deltaY * config.SCROLL_SPEED;
    const clampedScroll = Math.max(
      Math.min(scrollData, config.MAX_VELOCITY),
      -config.MAX_VELOCITY
    );

    stateRef.current.targetX -= clampedScroll;
    stateRef.current.lastScrollTime = Date.now();
    stateRef.current.hasSnapped = false;
  }, []);

  useEffect(() => {
    addEventListener("wheel", handleWheel, {
      passive: false,
    });
    return () => {
      removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      stateRef.current.isDragging = true;
      stateRef.current.startX = e.touches[0].clientX;
      stateRef.current.lastX = stateRef.current.targetX;
      stateRef.current.dragDistance = 0;
      stateRef.current.hasActuallyDragged = false;
      stateRef.current.lastScrollTime = Date.now();
      stateRef.current.hasSnapped = false;
    },
    []
  );

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!stateRef.current.isDragging) {
      return;
    }

    const deltaX = (e.touches[0].clientX - stateRef.current.startX) * 3;
    stateRef.current.targetX = stateRef.current.lastX + deltaX;

    stateRef.current.dragDistance = Math.abs(deltaX);

    if (stateRef.current.dragDistance > 5) {
      stateRef.current.hasActuallyDragged = true;
    }
    stateRef.current.lastScrollTime = Date.now();
  }, []);

  const handleTouchEnd = useCallback(() => {
    stateRef.current.isDragging = false;
    setTimeout(() => {
      stateRef.current.hasActuallyDragged = false;
    }, 100);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    stateRef.current.isDragging = true;
    stateRef.current.startX = e.clientX;
    stateRef.current.lastMouseX = e.clientX;
    stateRef.current.lastX = stateRef.current.targetX;
    stateRef.current.dragDistance = 0;
    stateRef.current.hasActuallyDragged = false;
    stateRef.current.lastScrollTime = Date.now();
    stateRef.current.hasSnapped = false;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!stateRef.current.isDragging) {
      return;
    }

    e.preventDefault();

    const deltaX = (e.clientX - stateRef.current.lastMouseX) * 2;
    stateRef.current.targetX += deltaX;
    stateRef.current.lastMouseX = e.clientX;
    stateRef.current.dragDistance = Math.abs(deltaX);

    if (stateRef.current.dragDistance > 5) {
      stateRef.current.hasActuallyDragged = true;
    }

    stateRef.current.lastScrollTime = Date.now();
  }, []);

  const handleMouseUp = useCallback(() => {
    stateRef.current.isDragging = false;
    setTimeout(() => {
      stateRef.current.hasActuallyDragged = false;
    }, 100);
  }, []);

  const slides = Array.from({ length: totalSlides }, (_, i) => {
    const dataIndex = i % totalSlideCount;
    const slideData = gallery[dataIndex];

    if (!slideData) return null;

    return (
      <motion.div
        animate={
          currentSlideIndex == dataIndex
            ? {
                filter: "grayscale(0%)",
                opacity: 1,
              }
            : undefined
        }
        key={i}
        ref={i === 0 ? slideRef : undefined}
        className="image-items"
        onClick={() => handleSlideClick(i)}
      >
        <Image
          width={150}
          height={200}
          src={slideData.image}
          alt={slideData.name}
          className="select-none"
          draggable={false}
        />
      </motion.div>
    );
  });

  console.log(currentSlideIndex);

  return (
    <div className="w-full fixed bottom-4 left-0 right-0 overflow-hidden carousel-container">
      <div
        className="w-max flex carousel px-4 gap-4 md:gap-[1.05vw]"
        ref={trackRef}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onDragStart={(e) => e.preventDefault()}
      >
        {slides}
      </div>
    </div>
  );
}
