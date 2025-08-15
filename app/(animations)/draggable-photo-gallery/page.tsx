"use client";
import { DraggableGallery } from "./_components/draggable-gallery";
import { useRef } from "react";


export default function DragglePhotoGallery() {
  
  return (
    <div className="photo-gallery-container bg-[#f4f3f0] overflow-hidden relative">
      <DraggableGallery />
    </div>
  );
}
