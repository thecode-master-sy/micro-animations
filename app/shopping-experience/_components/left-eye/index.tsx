"use client";
import { MotionValue } from "motion";
import { shapeOne, shapeOneMorphedTwo, shapeOneMorphedOne } from "../path";
import SVGMorph from "../svg-morph";

export default function LeftEye({
  fill,
  controlX,
}: {
  controlX: MotionValue<number>;
  fill: MotionValue<string>
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
          fill={fill}
          controlX={controlX}
          paths={[shapeOne, shapeOneMorphedTwo, shapeOneMorphedOne]}
        />
      </svg>
    </div>
  );
}
