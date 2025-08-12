"use client";

import { Move } from "lucide-react";

export const InfoPannel = () => {
  return (
    <div className="hidden md:flex gap-2 items-center bg-blur absolute right-4 bottom-7 p-4 z-10 rounded-sm text-[14px] md:text-[1.05vw]">
      <Move />
      <span>Drag to explore</span>
    </div>
  );
};
