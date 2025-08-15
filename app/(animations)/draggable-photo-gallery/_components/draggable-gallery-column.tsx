"use client";
import { gallery } from "../static";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";
import { toast } from "sonner"

export const DraggableGalleryColumn = ({
  inverse,
  className,
}: // setMouseFollowerShouldShow,
// setDisplayText,
{
  inverse?: boolean;
  className?: string;
  // setMouseFollowerShouldShow: Dispatch<SetStateAction<boolean>>;
  // setDisplayText: Dispatch<SetStateAction<string>>;
}) => {
  const handleClick = () => {
    toast("This is just a demo 😀. You can choose to do something here, like scaling the image when it clicked, or showing more details. its up to you")
  }
  const galleryArray = inverse ? gallery.slice().reverse() : gallery;
  return (
    <div className={cn("gallery-column", className)}>
      {galleryArray.map((item, index) => (
        <motion.div
          key={item.id}
          className="overflow-hidden relative flex gap-1 gallery-item"
        >
          <span className="text-[12px] lg:text-[1vw] select-none">
            0{index}
          </span>
          <Image
            width={150}
            height={200}
            className="gallery-image select-none cursor-pointer touch-none"
            src={item.image}
            alt={item.name}
            onClick={() => handleClick()}
            draggable={false}
          />
        </motion.div>
      ))}
    </div>
  );
};
