"use client";
import useMousePosition from "./useMousePositon";
import { motion } from "motion/react";

export const MouseFollower = ({
  shouldShow,
  displayText,
}: {
  shouldShow: boolean;
  displayText: string;
}) => {
  const { x, y } = useMousePosition();

  return (
    <motion.div
      animate={{ x, y, opacity: shouldShow ? 1 : 0 }}
      className="w-max p-1 text-white opacity-0 text-[12px] rounded-sm bg-black absolute z-10 cursor-grabbing select-none"
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
    >
      <motion.span
        animate={{ filter: shouldShow ? "blur(0px)" : "blur(10px)" }}
      >
        {displayText}
      </motion.span>
    </motion.div>
  );
};
