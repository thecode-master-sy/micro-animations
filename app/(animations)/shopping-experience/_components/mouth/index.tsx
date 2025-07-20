"use client";
import { MotionValue, useTransform, motion } from "motion/react";
import { CONTROL_CONSTRAIT } from "../constants";

export default function Mouth({
  controlX,
  fill,
}: {
  controlX: MotionValue<number>;
  fill: MotionValue<string>;
}) {
  const rotate = useTransform(
    controlX,
    [CONTROL_CONSTRAIT, CONTROL_CONSTRAIT / 2],
    [0, 180]
  );
  return (
    <motion.div style={{ rotate }}>
      <svg
        width="100"
        height="60"
        viewBox="0 0 27 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M24.979 0C26.0952 0 27.019 0.91275 26.8095 2.00912C26.3439 4.44628 25.0385 6.71411 23.046 8.48528C20.5142 10.7357 17.0805 12 13.5 12C9.91961 12 6.48583 10.7357 3.95409 8.48528C1.96152 6.71411 0.656156 4.44628 0.190533 2.00912C-0.0189318 0.912751 0.904894 2.05716e-06 2.0211 1.90735e-06C3.1373 1.75753e-06 4.01671 0.92057 4.31278 1.99679C4.72055 3.47903 5.57833 4.84778 6.81231 5.94464C8.586 7.52126 10.9916 8.40699 13.5 8.40699C16.0084 8.40699 18.4141 7.52126 20.1878 5.94464C21.4217 4.84778 22.2795 3.47902 22.6873 1.99679C22.9834 0.920569 23.8628 0 24.979 0Z"
          style={{ fill }}
        />
      </svg>
    </motion.div>
  );
}
