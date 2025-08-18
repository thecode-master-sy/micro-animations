import { gallery } from "../static";

export default function ImagePreview() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 -z-10">
      <div className="w-full h-full">
        <img
          className="w-full h-full image-preview"
          src={gallery[0].image}
          alt={gallery[0].name}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-[5vw]"></div>
      </div>
    </div>
  );
}
