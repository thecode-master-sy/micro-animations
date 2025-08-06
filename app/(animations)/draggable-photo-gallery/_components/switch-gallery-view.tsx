"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimationControls, motion } from "motion/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(Flip);

export const GallerySwitch = ({
  setDrag,
  galleryControls,
}: {
  setDrag: Dispatch<SetStateAction<boolean>>;
  galleryControls: AnimationControls;
}) => {
  const { contextSafe } = useGSAP();
  const [activeLayout, setActiveLayout] = useState("grid");

  const onSliderButtonClick = contextSafe(async () => {
    setActiveLayout("slider");
    const firstColumn = document.querySelector(".gallery-column:first-child");
    const mainTimeLine = gsap.timeline();
    console.log(firstColumn);

    const timeline = gsap.timeline();
    //this is probably bad code, trying to combine two animation libraries and forcing a wait here, well who cares. it works doesn't it? Does it?
    setDrag(false);
    await galleryControls.start(
      { x: 0, y: 0 },
      { duration: 0.5, ease: "linear" }
    );

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
    setActiveLayout("grid");
    const firstColumn = document.querySelector(".gallery-column:first-child");
    if (!firstColumn!.classList.contains("is-row")) {
      return;
    }
    const mainTimeLine = gsap.timeline();

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
        ".gallery-column:not(:first-child)",
        {
          opacity: 1,
        },
        ">1.55" //another hack here, this value is purely hardcoded, some kind of opacity glitch happens I cant explain the cause but this value fixes it.
      );
  });

  return (
    <div className="absolute bottom-4 left-1/2 flex bg-blur px-4 py-2 rounded-sm z-10 -translate-x-1/2">
      <button
        className={cn("px-2 py-1 rounded-sm relative text-black")}
        onClick={() => onGridButtonClick()}
      >
        <span>Grid view</span>
        {activeLayout === "grid" && (
          <motion.span
            layoutId="active-item"
            className="absolute inset-0 -z-10 bg-white rounded-md"
          />
        )}
      </button>
      <button
        className={cn("px-2 py-1 relative text-black")}
        onClick={() => onSliderButtonClick()}
      >
        <span> Slider view</span>
        {activeLayout === "slider" && (
          <motion.span
            layoutId="active-item"
            className="absolute inset-0 -z-10 bg-white rounded-md"
          />
        )}
      </button>
    </div>
  );
};
