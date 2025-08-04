"use client";
import { motion } from "motion/react";
import { DraggableGallery } from "./_components/draggable-gallery";

export default function DragglePhotoGallery() {
  return (
    <div className="w-full min-h-screen bg-[#f4f3f0] relative">
      <DraggableGallery />
    </div>
  );
}
