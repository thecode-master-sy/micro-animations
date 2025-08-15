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
import { motion} from "motion/react"
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Draggable, InertiaPlugin, Observer);

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

      const valueObj = {
        newX: 0,
        newY: 0
      }
      const xTo = gsap.quickTo('.draggable-gallery', "x");
      const yTo = gsap.quickTo('.draggable-gallery', "y");
      const maxX =  drag
      ? -(dragRect.width - containerRect.width)
      : -(sliderRect.clientWidth - containerRect.width);
      const maxY =  -(dragRect.height - containerRect.height);
      const clampX = gsap.utils.clamp(maxX, 0);
      const clampY = drag ? gsap.utils.clamp(maxY, 0) : () => 0

      function syncPosition() {
        valueObj.newX = this.x;
        if (drag) {
          valueObj.newY = this.y;
        }
      }

      const draggable = Draggable.create(".draggable-gallery", {
        type: drag ? "x,y" : "x",
        inertia: true,
        bounds: {
          minX: 0,
          minY: 0,
          maxX: maxX,
          maxY: maxY,
        },
        edgeResistance: 0.5,
        onClick: function () {
          console.log("clicked");
        },
        onDragEnd: function () {
          console.log("drag ended");
        },
        onPress() {
          xTo.tween.invalidate().pause();
          drag && yTo.tween.invalidate().pause();
        },
        onDrag: syncPosition,
        onThrowUpdate: syncPosition
      })[0];


      Observer.create({
        type: "wheel",
        target: ".target-element",
        onChange(self) {
            valueObj.newX = clampX(valueObj.newX - self.deltaX * 1.2);
            if(drag) {
              valueObj.newY = clampY(valueObj.newY - self.deltaY * 1.2);
            }
            
            if (xTo.tween.paused()) {
                // if it's paused, we must have recently dragged, so kill any inertia tweens.
                draggable.tween && draggable.tween.kill();
            }

            if (yTo.tween.paused()) {
              // if it's paused, we must have recently dragged, so kill any inertia tweens.
              draggable.tween && draggable.tween.kill();
            }
            
            xTo(valueObj.newX);
            yTo(valueObj.newY);
        }
      });
     
    },
    {
      dependencies: [dragRef, containerRef, drag],
      scope: containerRef,
    }
  );

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen overflow-hidden target-element"
    >
      {/* <MouseFollower
        shouldShow={mouseFollowerShouldShow}
        displayText={displayText}
      /> */}
      <GallerySwitch setDrag={setDrag} />

      <DraggableGalleryColumn className="absolute slider-element opacity-0 is-row" />

      <motion.div
        ref={dragRef}
        className="h-fit w-fit cursor-grabbing flex gap-[15vw]  bg-[#f4f3f0] p-4 draggable-gallery"
      >
        <DraggableGalleryColumn />

        {columns.map((_, index) => (
          <DraggableGalleryColumn key={index} inverse={index % 2 === 0} />
        ))}
      </motion.div>
    </div>
  );
};
