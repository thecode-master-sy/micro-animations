"use client";
import { cn } from "@/lib/utils";
import useMousePosition from "./useMousePositon";
import { motion } from "motion/react";

export const MouseFollower = ({
  shouldShow,
  displayText,
  target,
  className,
}: {
  shouldShow: boolean;
  displayText: string;
  target?: HTMLElement;
  className?: string;
}) => {
  const { x, y } = useMousePosition(target);

  return (
    <motion.div
      animate={{ x, y, opacity: shouldShow ? 1 : 0 }}
      className={cn(
        "w-max px-2 py-1 hidden md:flex bg-blur opacity-0 text-[12px] rounded-sm text-black absolute z-10 cursor-grabbing select-none",
        className
      )}
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
