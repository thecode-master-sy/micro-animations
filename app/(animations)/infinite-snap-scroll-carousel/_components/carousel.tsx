import { gallery } from "../static";

export default function Carousel() {
  return (
    <div className="w-full fixed bottom-4 left-0 right-0 overflow-hidden">
      <div className="w-max flex gap-4">
        {gallery.map((item) => (
          <div key={item.id} className="w-[200px] h-[200px]">
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
