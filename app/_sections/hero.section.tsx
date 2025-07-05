import HeroCard from "@/components/hero-card";

export default function HeroSection() {
  return (
    <div className="min-h-screen flex bg-homepage-background flex-col">
      <div className="text-center mx-auto my-auto">
        <h1 className="text-h1 font-bold -tracking-[0.05em] max-w-[23ch] leading-[1.1]">
          Curated gallery of awesome animations ui across the web
        </h1>
        <a
          href="https://x.com/thecode_master"
          className="uppercase text-orange-500 font-medium"
        >
          by thecodemaster
        </a>
      </div>

      <div className="grid md:grid-cols-4 md:flex-row border-t border-gray-300">
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <HeroCard />
      </div>
    </div>
  );
}
