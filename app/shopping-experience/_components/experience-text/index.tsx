"use client";
import { easeInOut } from "motion";
import { motion, MotionValue, useSpring, useTransform } from "motion/react";
import { CONTROL_CONSTRAIT } from "../constants";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function ExperienceText({
  accentColor,
  controlX,
}: {
  controlX: MotionValue<number>;
  accentColor: MotionValue<string>;
}) {
  const [itemRef, { width }] = useMeasure();
  const translateXValue = useTransform(
    controlX,
    [0, 150, CONTROL_CONSTRAIT],
    [0, -(width / 3), -((2 * width) / 3)],
    {
      ease: easeInOut,
    }
  );

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        ref={itemRef}
        className={cn("flex w-max text-center")}
        style={{
          color: accentColor,
          x: width ? translateXValue : "-66.66%",
        }}
      >
        <div className="w-screen">
          <h1 className="text-5xl font-extrabold uppercase -tracking-[0.05em]">
            Bad
          </h1>
        </div>

        <div className="w-screen">
          <h1 className="text-5xl font-extrabold uppercase -tracking-[0.05em]">
            Not Bad
          </h1>
        </div>

        <div className="w-screen">
          <h1 className="text-5xl font-extrabold uppercase -tracking-[0.05em]">
            Good
          </h1>
        </div>
      </motion.div>
    </div>
  );
}
