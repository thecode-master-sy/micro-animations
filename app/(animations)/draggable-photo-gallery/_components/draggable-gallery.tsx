"use client";

import { DraggableGalleryColumn } from "./draggable-gallery-column";

export const DraggableGallery = () => {
  const columns = Array.from({ length: 12 }, (_, index) => index);
  return (
    <div className="w-screen h-screen absolute overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="min-h-screen cursor-grabbing flex gap-4 w-full bg-[#f4f3f0] p-4">
        {columns.map((_, index) => (
          <DraggableGalleryColumn key={index} inverse={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
};
