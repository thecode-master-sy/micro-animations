"use client";

import {
  useMotionValue,
  useTransform,
  motion,
  AnimatePresence,
} from "motion/react";
import { CONTROL_CONSTRAIT } from "./_components/constants";
import { useState } from "react";
import { Info, X } from "lucide-react";
import Mouth from "./_components/mouth";
import ExperienceText from "./_components/experience-text";
import Control from "./_components/control";
import LeftEye from "./_components/left-eye";
import RightEye from "./_components/right-eye";
import SubmitButton from "./_components/submit-button/page";
import AddNoteTextArea from "./_components/text-area";

export default function ShoppingExperience() {
  const controlX = useMotionValue(CONTROL_CONSTRAIT);
  const backgroundColor = useTransform(
    controlX,
    [CONTROL_CONSTRAIT, 150, 0],
    ["#A5BD4C", "#DDA33A", "#FC8054"]
  );
  const primaryColor = useTransform(
    controlX,
    [CONTROL_CONSTRAIT, 150, 0],
    ["#153301", "#472007", "#6D0A01"]
  );
  const accentColor = useTransform(
    controlX,
    [CONTROL_CONSTRAIT, 150, 0],
    ["#798E1A", "#AD750E", "#DA4B23"]
  );
  const borderColor = useTransform(
    controlX,
    [CONTROL_CONSTRAIT, 150, 0],
    ["#788A38", "#af812c", "#d75b18"]
  );
  const bgTextArea = useTransform(
    controlX,
    [CONTROL_CONSTRAIT, 150, 0],
    ["#c6df53", "#F0B74C", "#EA937B"]
  );
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
              <p className="text-base">How was your shopping experience?</p>
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
