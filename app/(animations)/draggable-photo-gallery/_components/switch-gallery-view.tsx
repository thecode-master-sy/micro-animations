"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { Dispatch, SetStateAction } from "react";

gsap.registerPlugin(Flip);

export const GallerySwitch = ({
  setShowRestOfImages,
}: {
  setShowRestOfImages: Dispatch<SetStateAction<boolean>>;
}) => {
  const { contextSafe } = useGSAP();

  const onGridButtonClick = contextSafe(() => {
    const mainTimeLine = gsap.timeline();
    const firstColumn = document.querySelector(".gallery-column:first-child");
    console.log(firstColumn);

    const timeline = gsap.timeline();

    timeline.to(".gallery-column:not(:first-child)", {
      opacity: 0,
      onComplete: () => setShowRestOfImages(false),
    });

    mainTimeLine.add(timeline).add(() => {
      const state = Flip.getState(".gallery-column, .gallery-item");
      firstColumn!.classList.add("is-row");
      Flip.from(state, {
        duration: 0.5, // The duration of the flip animation
        ease: "power1.inOut",
        absolute: true, // Recommended to prevent layout shifts
        stagger: 0.1,
      });
    });
  });

  return (
    <div className="absolute bottom-4 left-1/2 flex bg-white p-4 rounded-sm z-10 -translate-x-1/2">
      <button onClick={() => onGridButtonClick()}>Grid view</button>
      <button>Slider view</button>
    </div>
  );
};
