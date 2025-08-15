"use client";

import { Move } from "lucide-react";

export const InfoPannel = () => {
  return (
    <div className="hidden md:flex gap-2 items-center bg-blur bottom-7 p-4 z-10 rounded-sm ">
      <Move strokeWidth={1}/>
      <span>Drag to explore</span>
    </div>
  );
};
