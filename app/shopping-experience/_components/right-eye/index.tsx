"use client";
import { MotionValue } from "motion";
import SVGMorph from "../svg-morph";
import { shapeOne, shapeOneMorphedOne, shapeOneMorphedTwo } from "../path";

export default function RightEye({
  controlX,
}: {
  controlX: MotionValue<number>;
}) {
  return (
    <div>
      <svg
        width="120"
        height="120"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <path d={shapeOne} fill="#153301" />
        <path d={shapeOneMorphedOne} fill="#153301" />
        <path d={shapeOneMorphedTwo} fill="#153301" /> */}
        <SVGMorph
          fill="#153301"
          controlX={controlX}
          paths={[shapeOne, shapeOneMorphedTwo, shapeOneMorphedOne]}
        />
      </svg>
    </div>
  );
}
