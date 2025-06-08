"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { MotionValue } from "motion/react";
import { Dispatch, SetStateAction } from "react";

export default function SubmitButton({
  primaryColor,
  accentColor,
  backgroundColor,
  setIsAddingNote,
}: {
  primaryColor: MotionValue<string>;
  accentColor: MotionValue<string>;
  backgroundColor: MotionValue<string>;
  setIsAddingNote: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="w-full">
      <motion.div
        style={{ backgroundColor: accentColor }}
        className="flex rounded-full w-full cursor-text max-w-[400px] mx-auto"
      >
        <motion.button
          style={{ color: primaryColor }}
          onClick={() => setIsAddingNote(true)}
          className="pl-4 py-[14px] flex-1 font-medium cursor-text"
        >
          Add note
        </motion.button>
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
