import { gallery } from "../static";

export default function Carousel() {
  return (
    <div className="w-full fixed bottom-4 left-0 right-0 overflow-hidden">
      <div className="w-max flex gap-4 md:gap-[1vw]">
        {gallery.map((item) => (
          <div key={item.id} className="image-items">
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
