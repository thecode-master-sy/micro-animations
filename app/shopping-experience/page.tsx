"use client";
import RightEye from "./_components/right-eye";
import LeftEye from "./_components/left-eye";
import { Info, X } from "lucide-react";
import Mouth from "./_components/mouth";
import { useEffect, useState } from "react";
import Control from "./_components/control";
import {
  useMotionValue,
  useAnimation,
  useTransform,
  motion,
  AnimatePresence,
} from "motion/react";
import { CONTROL_CONSTRAIT } from "./_components/constants";
import ExperienceText from "./_components/experience-text";
import SubmitButton from "./_components/submit-button/page";

export default function ShoppingExperience() {
  const [isAddingNote, setIsAddingNote] = useState(false);
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

  useEffect(() => {
    console.log(isAddingNote);
  }, [isAddingNote]);

  return (
    <motion.div
      className="min-h-screen flex flex-col p-4"
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
      <motion.div className="flex-1 flex flex-col justify-center">
        <div className="text-[#153301] text-center flex justify-center text-xl">
          <p>How was your shopping experience?</p>
        </div>
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
              key="expereince-text"
              exit={{ x: "-100%", opacity: 0 }}
              className="flex justify-center overflow-hidden text-center mt-4"
            >
              <ExperienceText controlX={controlX} accentColor={accentColor} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-7 flex justify-center">
          <Control
            controlX={controlX}
            primaryColor={primaryColor}
            accentColor={accentColor}
            backgroundColor={backgroundColor}
          />
        </div>

        <div className="mt-20 flex justify-center">
          <SubmitButton
            primaryColor={primaryColor}
            accentColor={accentColor}
            backgroundColor={backgroundColor}
            setIsAddingNote={setIsAddingNote}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

//understanding the animation

//=> we will have the left and right morph svg's
//=> the down svg would just be a transform value
