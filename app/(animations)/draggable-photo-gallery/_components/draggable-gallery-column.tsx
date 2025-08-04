"use client";
import { gallery } from "../static";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const DraggableGalleryColumn = ({ inverse }: { inverse?: boolean }) => {
  const galleryArray = inverse ? gallery.slice().reverse() : gallery;
  return (
    <div className="flex flex-col w-full gap-4">
      {galleryArray.map((item, index) => (
        <div
          key={item.id}
          className="overflow-hidden relative flex gap-1 min-w-[150px] min-h-[200px] w-[25vw] h-[25vh]"
        >
          <span className="text-[1vw] select-none">0{index}</span>
          <Image
            width={150}
            height={200}
            className="w-[10vw] h-[25vh] min-w-[150px] min-h-[200px] select-none touch-none"
            src={item.image}
            alt={item.name}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
};
