"use client";
import {
  motion,
  MotionValue,
  PanInfo,
  useAnimation,
  useMotionValue,
  animate,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CONTROL_CONSTRAIT, SLIDER_SIZE } from "../constants";

type Option = {
  label: string;
  value: string;
  color?: string;
};

const options: Option[] = [
  {
    label: "Bad",
    value: "bad",
    color: "#CC0000",
  },
  {
    label: "Not bad",
    value: "not-bad",
    color: "#B94E00",
  },
  {
    label: "Good",
    value: "good",
    color: "#406686",
  },
];

export default function Control({
  controlX,
}: {
  controlX: MotionValue<number>;
}) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const DIVISION_LENGTH = Math.ceil(CONTROL_CONSTRAIT / (options.length - 1));

  const handleDragEnd = () => {
    const translateXvalue = controlX.get();

    const translateXValueRounded = Math.round(translateXvalue);

    const division = Math.abs(
      Math.round(translateXValueRounded / DIVISION_LENGTH)
    );

    animate(controlX, division * DIVISION_LENGTH, {
      ease: "easeInOut",
    });
  };

  const handleDivisionClick = (index: number) => {
    controlX.set(index * DIVISION_LENGTH);
  };

  return (
    <div className="w-[340px]" ref={constraintsRef}>
      <motion.div
        className="w-[40px] h-[40px] bg-red-500 rounded-full hover:cursor-grab active:cursor-grabbing"
        drag="x"
        style={{ x: controlX }}
        dragConstraints={constraintsRef}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
}
