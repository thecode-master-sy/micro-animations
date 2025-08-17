"use client";

import Nav from "./_components/nav";
import ImagePreview from "./_components/image-preview";
import Carousel from "./_components/carousel";

export default function InfiniteSnapScrollCarousel() {
  return (
    <div className="min-h-[100svh] flex flex-col">
      <Nav />
      <ImagePreview />
      <h1 className="uppercase text-center md:mt-[5vw] my-auto font-bold">
        Selected Works
      </h1>
      <Carousel />
    </div>
  );
}
