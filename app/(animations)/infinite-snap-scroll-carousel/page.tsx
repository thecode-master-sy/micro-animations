"use client";

import Nav from "./_components/nav";
import ImagePreview from "./_components/image-preview";
import Carousel from "./_components/carousel";

export default function InfiniteSnapScrollCarousel() {
  return (
    <div className="min-h-[100svh] flex flex-col text-white">
      <Nav />
      <ImagePreview />
      <h1 className="uppercase text-center md:mt-[5vw] my-auto font-bold">
        Project One
      </h1>
      <Carousel />
    </div>
  );
}
