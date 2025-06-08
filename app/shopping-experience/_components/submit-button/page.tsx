"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { MotionValue } from "motion/react";

export default function SubmitButton({
  primaryColor,
  accentColor,
  backgroundColor,
}: {
  primaryColor: MotionValue<string>;
  accentColor: MotionValue<string>;
  backgroundColor: MotionValue<string>;
}) {
  return (
    <div className="w-full">
      <motion.div
        style={{ backgroundColor: accentColor }}
        className="flex rounded-full w-full cursor-text max-w-[400px] mx-auto"
      >
        <motion.p
          style={{ color: primaryColor }}
          className="pl-4 py-[14px] flex-1 font-medium cursor-text"
        >
          Add note
        </motion.p>
        <motion.button
          style={{ backgroundColor: primaryColor, color: backgroundColor }}
          className="flex items-center gap-2 rounded-full px-7 font-bold"
        >
          <span>Submit</span>
          <ArrowRight />
        </motion.button>
      </motion.div>
    </div>
  );
}
