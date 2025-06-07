"use client";
import RightEye from "./_components/right-eye";
import LeftEye from "./_components/left-eye";
import { Info, X } from "lucide-react";
import Mouth from "./_components/mouth";
import { useState } from "react";
import Control from "./_components/control";
import { useMotionValue, useAnimation } from "motion/react";
import { CONTROL_CONSTRAIT } from "./_components/constants";

export default function ShoppingExperience() {
  const controlX = useMotionValue(CONTROL_CONSTRAIT);

  return (
    <div className="bg-shopping-background min-h-screen p-4">
      <div className="flex items-center justify-between">
        <span className="flex p-3 bg-shopping-accent rounded-full w-max">
          <X size={20} />
        </span>
        <span className="flex p-3 bg-shopping-accent rounded-full w-max">
          <Info size={20} />
        </span>
      </div>
      <div className="text-[#153301] text-center mt-4 flex justify-center text-xl">
        <p>How was your shopping experience?</p>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <LeftEye controlX={controlX} />
        <RightEye controlX={controlX} />
      </div>
      <div className="flex justify-center">
        <Mouth controlX={controlX} />
      </div>

      <div className="mt-7 flex justify-center">
        <Control controlX={controlX} />
      </div>
    </div>
  );
}

//understanding the animation

//=> we will have the left and right morph svg's
//=> the down svg would just be a transform value
