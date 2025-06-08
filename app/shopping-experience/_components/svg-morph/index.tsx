"use client";
import { interpolate } from "flubber";
import React, { useState, useEffect } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  MotionValue,
} from "motion/react";
import { CONTROL_CONSTRAIT } from "../constants";

export default function SVGMorph({
  paths,
  fill,
  controlX,
}: {
  paths: string[];
  fill: MotionValue<string>;
  controlX: MotionValue<number>;
}) {
  const progress = useTransform(
    controlX,
    [CONTROL_CONSTRAIT, 0],
    [0, paths.length - 1]
  );
  const arrayOfIndex = paths.map((_, i) => i);
  const path = useTransform(progress, arrayOfIndex, paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 1 }),
  });

  return <motion.path style={{ fill }} d={path} />;
}
