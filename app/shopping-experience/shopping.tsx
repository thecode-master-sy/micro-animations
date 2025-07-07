"use client";
import RightEye from "./_components/right-eye";
import LeftEye from "./_components/left-eye";
import { Info, X } from "lucide-react";
import Mouth from "./_components/mouth";
import { useState } from "react";
import Control from "./_components/control";
import {
  motion,
  AnimatePresence,
  MotionValue,
} from "motion/react";
import { CONTROL_CONSTRAIT } from "./_components/constants";
import ExperienceText from "./_components/experience-text";
import SubmitButton from "./_components/submit-button/page";
import AddNoteTextArea from "./_components/text-area";

type ShoppingExperienceProps = {
  backgroundColor: MotionValue<string>;
  accentColor: MotionValue<string>;
  controlX: MotionValue<number>;
  primaryColor: MotionValue<string>;
  bgTextArea: MotionValue<string>;
};

export default function ShoppingExperience({
  backgroundColor,
  accentColor,
  controlX,
  primaryColor,
  bgTextArea,
}: ShoppingExperienceProps) {
  const [isAddingNote, setIsAddingNote] = useState(false);

  return (
    <motion.div
      className="h-screen flex flex-col p-4 overflow-hidden text-paragraph"
      style={{ backgroundColor }}
    >
      <div className="flex items-center justify-between">
        <motion.span
          style={{ backgroundColor: accentColor }}
          className="flex p-3 rounded-full w-max"
        >
          <X size={20} />
        </motion.span>
        <motion.span
          style={{ backgroundColor: accentColor }}
          className="flex p-3 rounded-full w-max"
        >
          <Info size={20} />
        </motion.span>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence>
          {!isAddingNote && (
            <motion.div
              key="text"
              exit={{ y: "-1000px" }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
              }}
              className="text-[#153301] text-center flex justify-center"
            >
              <p>How was your shopping experience?</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center gap-4 mt-4">
          <LeftEye controlX={controlX} fill={primaryColor} />
          <RightEye controlX={controlX} fill={primaryColor} />
        </div>

        <div className="flex justify-center">
          <Mouth controlX={controlX} fill={primaryColor} />
        </div>

        <AnimatePresence>
          {!isAddingNote && (
            <motion.div
              key="experience-text"
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
              }}
              className="flex justify-center overflow-hidden text-center mt-4"
            >
              <ExperienceText controlX={controlX} accentColor={accentColor} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isAddingNote && (
            <motion.div
              key="control"
              exit={{ opacity: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
              }}
              className="mt-7 flex justify-center"
            >
              <Control
                controlX={controlX}
                primaryColor={primaryColor}
                accentColor={accentColor}
                backgroundColor={backgroundColor}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isAddingNote && (
            <motion.div
              key={"submit-button"}
              className="mt-20 flex justify-center"
              transition={{
                ease: "easeInOut",
                duration: 0.5,
              }}
              exit={{ opacity: 0 }}
            >
              <SubmitButton
                primaryColor={primaryColor}
                accentColor={accentColor}
                backgroundColor={backgroundColor}
                setIsAddingNote={setIsAddingNote}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isAddingNote && (
            <motion.div
              key="text-area"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
              }}
              className="mt-7 w-full max-w-[500px] mx-auto"
            >
              <AddNoteTextArea
                primaryColor={primaryColor}
                textAreaColor={bgTextArea}
                backgroundColor={backgroundColor}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

//understanding the animation

//=> we will have the left and right morph svg's
//=> the down svg would just be a transform value
