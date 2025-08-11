"use client";
import { DraggableGalleryColumn } from "./draggable-gallery-column";
import { useRef, useEffect, useState } from "react";
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
  const [drag, setDrag] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const dragRect = dragRef.current?.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!dragRect || !containerRect) return;
      console.log(containerRect);
      Draggable.create(".draggable-gallery", {
        type: "x,y",
        autoScroll: 1,
        inertia: true,
        bounds: {
          minX: 0,
          minY: 0,
          maxX: -(dragRect.width - containerRect.width),
          maxY: -(dragRect.height - containerRect.height),
        },
        edgeResistance: 0.8,
        onClick: function () {
          console.log("clicked");
        },
        onDragEnd: function () {
          console.log("drag ended");
        },
      });
    },
    { dependencies: [dragRef, containerRef], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-screen h-[100svh] overflow-hidden">
      <InfoPannel />
      {/* <MouseFollower
        shouldShow={mouseFollowerShouldShow}
        displayText={displayText}
      /> */}
      <GallerySwitch setDrag={setDrag} />
      <div
        ref={dragRef}
        className="min-h-screen w-fit cursor-grabbing flex gap-[15vw]  bg-[#f4f3f0] p-4 draggable-gallery"
      >
        <DraggableGalleryColumn />
        {columns.map((_, index) => (
          <DraggableGalleryColumn key={index} inverse={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
};
