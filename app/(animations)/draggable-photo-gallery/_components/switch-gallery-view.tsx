"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { AnimationControls } from "motion/react";

gsap.registerPlugin(Flip);

export const GallerySwitch = ({
  setDrag,
  galleryControls,
}: {
  setDrag: Dispatch<SetStateAction<boolean>>;
  galleryControls: AnimationControls;
}) => {
  const { contextSafe } = useGSAP();

  const onSliderButtonClick = contextSafe(async () => {
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
        ">1.55"  //another hack here, this value is purely hardcoded, some kind of opacity glitch happens I cant explain the cause but this value fixes it.
      );
  });

  return (
    <div className="absolute bottom-4 left-1/2 flex bg-white p-4 rounded-sm z-10 -translate-x-1/2">
      <button onClick={() => onGridButtonClick()}>Grid view</button>
      <button onClick={() => onSliderButtonClick()}>Slider view</button>
    </div>
  );
};
