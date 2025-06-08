"use client";
import { ArrowRight } from "lucide-react";
import { MotionValue, motion } from "motion/react";

export default function AddNoteTextArea({
  primaryColor,
  textAreaColor,
  backgroundColor,
}: {
  primaryColor: MotionValue<string>;
  textAreaColor: MotionValue<string>;
  backgroundColor: MotionValue<string>;
}) {
  return (
    <motion.div
      style={{ backgroundColor: textAreaColor }}
      className="p-4 grid border-2 rounded-2xl border-shopping-primary"
    >
      <textarea
        placeholder="Add note"
        autoFocus
        className="text-shopping-primary min-h-[100px] placeholder:text-shopping-primary w-full resize-none bg-transparent focus:outline-0 focus:border-none font-medium"
      />
      <motion.button
        style={{ backgroundColor: primaryColor, color: backgroundColor }}
        className="flex rounded-full px-6 py-4 gap-2 items-center text ml-auto"
      >
        <span>Submit</span>
        <ArrowRight />
      </motion.button>
    </motion.div>
  );
}
