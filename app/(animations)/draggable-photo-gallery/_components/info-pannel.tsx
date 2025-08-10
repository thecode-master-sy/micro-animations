"use client";

import { Move } from "lucide-react";

export const InfoPannel = () => {
  return (
    <div className="hidden md:flex gap-2 items-center bg-blur absolute right-4 bottom-4 p-4 z-10 rounded-sm  ">
      <Move />
      <span>Drag to explore</span>
    </div>
  );
};
