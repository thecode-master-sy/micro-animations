"use client";

import Nav from "./_components/nav";
import ImagePreview from "./_components/image-preview";
import Carousel from "./_components/carousel";
import { ReactLenis } from "@/lib/smooth-scroll";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function InfiniteSnapScrollCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis
    if (!scrollContainerRef.current) return;
    const lenis = new Lenis({
      autoRaf: true,
      orientation: "horizontal",
      wrapper: scrollContainerRef.current,
      gestureOrientation: "both",
      wheelMultiplier: 2,
      infinite: true,
      syncTouch: true,
    });

    // Listen for the scroll event and log the event data
    lenis.on("scroll", (e) => {
      console.log(e);
    });
  }, []);
  return (
    <div className="text-white flex flex-col w-full h-screen overflow-y-hidden">
      <Nav />
      <ImagePreview />
      <h1 className="uppercase text-center font-bold mt-auto mb-[50vh]">
        Project One
      </h1>

      <div
        ref={scrollContainerRef}
        className="h-[100svh] fixed top-0 left-0 right-0 bottom-0 w-screen overflow-y-hidden overflow-x-auto scroll-container  flex flex-col  pb-4 md:pb-[2vw] text-white"
      >
        <div className="mt-auto">
          <Carousel />
        </div>
      </div>
    </div>
  );
}
