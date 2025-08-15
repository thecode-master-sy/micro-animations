"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { div } from "motion/react-client";
import { InfoPannel } from "./info-pannel";

gsap.registerPlugin(Flip);

export const GallerySwitch = ({
  setDrag,
}: // galleryControls,
{
  setDrag: Dispatch<SetStateAction<boolean>>;
  // galleryControls: AnimationControls;
}) => {
  const { contextSafe } = useGSAP();
  const router = useRouter();
  const [activeLayout, setActiveLayout] = useState("grid");

  const onSliderButtonClick = contextSafe(async () => {
    const firstColumn = document.querySelector(".gallery-column:first-child");
    if (firstColumn!.classList.contains("is-row")) {
      return;
    }
    setActiveLayout("slider");
    const mainTimeLine = gsap.timeline();
    console.log(firstColumn);

    const timeline = gsap.timeline();
    //this is probably bad code, trying to combine two animation libraries and forcing a wait here, well who cares. it works doesn't it? Does it?
    setDrag(false);
    timeline.to(".draggable-gallery", {
      y: 0,
      x: 0,
    });

    timeline.to(".gallery-column:not(:first-child)", {
      opacity: 0,
    });

    mainTimeLine.add(timeline).add(() => {
      const state = Flip.getState(
        ".gallery-column:first-child, .gallery-column:first-child .gallery-item"
      );
      firstColumn!.classList.add("is-row");
      Flip.from(state, {
        duration: 0.5, // The duration of the flip animation
        ease: "power1.inOut",
        absolute: true, // Recommended to prevent layout shifts
        stagger: 0.1,
      });
    }, ">-0.05");
  });

  const onGridButtonClick = contextSafe(() => {
    const firstColumn = document.querySelector(
      ".gallery-column:not(.slider-element)"
    );
    if (!firstColumn!.classList.contains("is-row")) {
      return;
    }
    setActiveLayout("grid");
    const mainTimeLine = gsap.timeline();

    mainTimeLine.to(".draggable-gallery", {
      y: 0,
      x: 0,
    });

    mainTimeLine
      .add(() => {
        const state = Flip.getState(
          ".gallery-column:first-child, .gallery-column:first-child .gallery-item"
        );

        firstColumn!.classList.remove("is-row");
        Flip.from(state, {
          duration: 0.5,
          ease: "power1.inOut",
          absolute: true,
          stagger: 0.1,
          onComplete: () => {
            setDrag(true);
          },
        });
      })
      .to(
        ".gallery-column:not(:first-child):not(.slider-element)",
        {
          opacity: 1,
        },
        ">1.55" //another hack here, this value is purely hardcoded, some kind of opacity glitch happens I cant explain the cause but this value fixes it.
      );
  });

  return (
    <div className="absolute md:bottom-7 bottom-10 w-[55%] right-4 flex justify-between z-10 ">
      <div className="flex bg-blur rounded-sm justify-self-center px-4 py-2 md:py-[0.8vw] md:px-[1.2vw]">
        <button
          className={cn(
            "px-2 py-1 w-fit md:px-[1vw] md:py-[0.5vw] rounded-sm relative"
          )}
          onClick={() => onGridButtonClick()}
        >
          <span className="w-max">Grid view</span>
          {activeLayout === "grid" && (
            <motion.span
              layoutId="active-item"
              className="absolute inset-0 -z-10 bg-white rounded-md"
            />
          )}
        </button>
        <button
          className={cn(
            "px-2 py-1 w-fit  md:px-[1vw] md:py-[0.5vw] relative"
          )}
          onClick={() => onSliderButtonClick()}
        >
          <span className="w-max"> Slider view</span>
          {activeLayout === "slider" && (
            <motion.span
              layoutId="active-item"
              className="absolute inset-0 -z-10 bg-white rounded-md"
            />
          )}
        </button>
      </div>

      <div className="ml-auto">
        <InfoPannel />
      </div>
    </div>
  );
};
