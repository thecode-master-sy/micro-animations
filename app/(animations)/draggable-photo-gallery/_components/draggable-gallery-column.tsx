"use client";
import { gallery } from "../static";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";

export const DraggableGalleryColumn = ({
  inverse,
  setMouseFollowerShouldShow,
  setDisplayText,
}: {
  inverse?: boolean;
  setMouseFollowerShouldShow: Dispatch<SetStateAction<boolean>>;
  setDisplayText: Dispatch<SetStateAction<string>>;
}) => {
  const galleryArray = inverse ? gallery.slice().reverse() : gallery;
  return (
    <div className="gallery-column">
      {galleryArray.map((item, index) => (
        <motion.div
          key={item.id}
          className="overflow-hidden relative flex gap-1 gallery-item"
        >
          <span className="text-[1vw] select-none">0{index}</span>
          <Image
            width={150}
            height={200}
            className="gallery-image select-none touch-none"
            src={item.image}
            alt={item.name}
            draggable={false}
            onPointerEnter={() => {
              setMouseFollowerShouldShow(true);
              setDisplayText(item.name);
            }}
            onPointerLeave={() => {
              setMouseFollowerShouldShow(false);
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};
