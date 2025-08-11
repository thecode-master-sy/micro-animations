"use client";
import { DraggableGalleryColumn } from "./draggable-gallery-column";
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { MouseFollower } from "./mouse-follower";
import { GallerySwitch } from "./switch-gallery-view";
import { InfoPannel } from "./info-pannel";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Draggable, InertiaPlugin);

export const DraggableGallery = () => {
  const columns = Array.from({ length: 11 }, (_, index) => index);
  const containerRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState(true);
  const dragRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const dragRect = dragRef.current?.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      const sliderRect = document.querySelector(".slider-element");
      if (!dragRect || !containerRect || !sliderRect) return;
      Draggable.create(".draggable-gallery", {
        type: drag ? "x,y" : "x",
        inertia: true,
        bounds: {
          minX: 0,
          minY: 0,
          maxX: drag
            ? -(dragRect.width - containerRect.width)
            : -(sliderRect.clientWidth - containerRect.width),
          maxY: -(dragRect.height - containerRect.height),
        },
        edgeResistance: 0.5,
        onClick: function () {
          console.log("clicked");
        },
        onDragEnd: function () {
          console.log("drag ended");
        },
      });
    },
    {
      dependencies: [dragRef, containerRef, drag],
      scope: containerRef,
    }
  );

  return (
    <div ref={containerRef} className="w-screen h-screen overflow-hidden">
      <InfoPannel />
      {/* <MouseFollower
        shouldShow={mouseFollowerShouldShow}
        displayText={displayText}
      /> */}
      <GallerySwitch setDrag={setDrag} />

      <DraggableGalleryColumn className="absolute slider-element opacity-0 is-row" />

      <div
        ref={dragRef}
        className="h-fit w-fit cursor-grabbing flex gap-[15vw]  bg-[#f4f3f0] p-4 draggable-gallery"
      >
        <DraggableGalleryColumn />

        {columns.map((_, index) => (
          <DraggableGalleryColumn key={index} inverse={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
};
