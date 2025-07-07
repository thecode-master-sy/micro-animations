"use client";
import { CONTROL_CONSTRAIT } from "@/app/shopping-experience/_components/constants";
import ShoppingExperience from "@/app/shopping-experience/shopping";
import { useMotionValue, useTransform, motion } from "motion/react";

export default function ShoppingExperienceComponent() {
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
    ["#b2cc53", "#f2b341", "#fc9d84"]
  );
  const bgTextArea = useTransform(
    controlX,
    [CONTROL_CONSTRAIT, 150, 0],
    ["#c6df53", "#F0B74C", "#EA937B"]
  );
  return (
    <motion.div
      style={{ backgroundColor }}
      className="min-h-screen py-10 px-4 flex flex-col md:flex-row gap-4 text-[#153301]"
    >
      <div className="w-[40%]">
        <h2 className="text-paragraph font-semibold">Shopping experience</h2>
        <p className="max-w-[40ch] mt-4 ">
          Beautifully designed shopping experience animation, this recreation
          focuses only on the slider and morphing svg effect. This animation was
          originally designed by @something
        </p>
        <div></div>
      </div>
      <motion.div
        style={{ borderColor: borderColor }}
        className="flex-2 overflow-hidden w-[60%] p-4 border rounded-md"
      >
        <div className="w-[500px] mx-auto">
          <ShoppingExperience
            controlX={controlX}
            backgroundColor={backgroundColor}
            accentColor={accentColor}
            primaryColor={primaryColor}
            bgTextArea={bgTextArea}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
