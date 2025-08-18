"use client";
import { gallery } from "../static";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";


export default function Carousel() {
  const selectedIndex = 0;
  //drag for mobile
  //scroll on the y and x direction for desktop and mobile
  //snaping
  //onClick it selects and moves to the clicked item.
  //infinite scroll

  return (
    <div className="w-full fixed bottom-4 left-0 right-0 overflow-hidden carousel-container">
      <div className="w-max flex carousel px-4 gap-4 md:gap-[1.05vw] ">
        {gallery.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "image-items opacity-50",
              index === selectedIndex && "opacity-100"
            )}
          >
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
