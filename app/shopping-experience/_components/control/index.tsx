"use client";
import {
  motion,
  MotionValue,
  PanInfo,
  useAnimation,
  useMotionValue,
  animate,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CONTROL_CONSTRAIT, SLIDER_SIZE } from "../constants";
import { div } from "motion/react-client";
import { cn } from "@/lib/utils";

type Option = {
  label: string;
  value: string;
  color?: string;
};

const options: Option[] = [
  {
    label: "Bad",
    value: "bad",
    color: "#CC0000",
  },
  {
    label: "Not bad",
    value: "not-bad",
    color: "#B94E00",
  },
  {
    label: "Good",
    value: "good",
    color: "#406686",
  },
];

export default function Control({
  controlX,
}: {
  controlX: MotionValue<number>;
}) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useState(options[2]);

  const DIVISION_LENGTH = Math.ceil(CONTROL_CONSTRAIT / (options.length - 1));

  const handleDragEnd = () => {
    const translateXvalue = controlX.get();

    const translateXValueRounded = Math.round(translateXvalue);

    const division = Math.abs(
      Math.round(translateXValueRounded / DIVISION_LENGTH)
    );

    animate(controlX, division * DIVISION_LENGTH, {
      ease: "easeInOut",
    });
  };

  const handleDivisionClick = (index: number) => {
    controlX.set(index * DIVISION_LENGTH);
  };

  const handleDivisionPointerDown = (
    division: number,
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    setCurrentValue(options[division]);
  };

  useEffect(() => {
    const currentValueIndex = options.findIndex(
      (option) => option === currentValue
    );
    if (currentValueIndex >= 0) {
      // animationControls.start({
      //   x: DIVISION_LENGTH * currentValueIndex,
      //   transition: transitionEnabled ? { duration: 0.25 } : { duration: 0 },
      //   backgroundColor: currentValue.color ? currentValue.color : undefined
      // });
      animate(controlX, DIVISION_LENGTH * currentValueIndex, {
        ease: "easeInOut",
      });
    }
  }, [currentValue, DIVISION_LENGTH]);

  return (
    <div className="w-[340px] relative z-[1]" ref={constraintsRef}>
      <motion.div
        className="w-[40px] h-[40px] relative z-[5] flex justify-center items-center bg-shopping-primary rounded-full hover:cursor-grab active:cursor-grabbing"
        drag="x"
        style={{ x: controlX }}
        dragConstraints={constraintsRef}
        onDragEnd={handleDragEnd}
        dragMomentum={false}
      >
        <svg
          width="24"
          height="10"
          viewBox="0 0 27 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.979 0C26.0952 0 27.019 0.91275 26.8095 2.00912C26.3439 4.44628 25.0385 6.71411 23.046 8.48528C20.5142 10.7357 17.0805 12 13.5 12C9.91961 12 6.48583 10.7357 3.95409 8.48528C1.96152 6.71411 0.656156 4.44628 0.190533 2.00912C-0.0189318 0.912751 0.904894 2.05716e-06 2.0211 1.90735e-06C3.1373 1.75753e-06 4.01671 0.92057 4.31278 1.99679C4.72055 3.47903 5.57833 4.84778 6.81231 5.94464C8.586 7.52126 10.9916 8.40699 13.5 8.40699C16.0084 8.40699 18.4141 7.52126 20.1878 5.94464C21.4217 4.84778 22.2795 3.47902 22.6873 1.99679C22.9834 0.920569 23.8628 0 24.979 0Z"
            fill="#AAC051"
          />
        </svg>
      </motion.div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
       w-full h-2 bg-shopping-accent -z-[1] rounded-full"
      ></div>

      {options.map((option, index) => {
        return (
          <div
            className={cn(
              "absolute top-1/2 w-[40px] h-[40px] flex items-center",
              options.length - 1 === index && "justify-end"
            )}
            key={`key-${option.value}-${index}`}
            style={{
              transform: `translate3d(calc(${
                index * DIVISION_LENGTH
              }px ), -50%, 0)`,
            }}
          >
            <div
              className="absolute w-[20px] h-[20px] rounded-full bg-shopping-accent cursor-pointer"
              onPointerDown={(event) => handleDivisionPointerDown(index, event)}
            />
            <div
              className="absolute h-[20px] w-max left-1/2 -translate-x-1/2 top-[150%] cursor-pointer"
              onPointerDown={(event) => handleDivisionPointerDown(index, event)}
            >
              {option.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
