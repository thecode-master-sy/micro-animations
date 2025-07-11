import DisplayAnimation from "@/components/display-animation";
import HeroCard from "@/components/hero-card";

export default function HeroSection() {
  return (
    <div className="bg-homepage-background px-4">
      <div className="py-24 flex flex-col min-h-screen justify-center gap-12">
        <div className="text-center">
          <a
            href="https://x.com/thecode_master"
            className="uppercase text-[#ff4c24] font-medium -tracking-[0.03em] text-navbar"
          >
            by thecodemaster
          </a>
          <h1 className="text-h1 font-bold -tracking-[0.06em] max-w-[20ch] mx-auto leading-[1.1]">
            Recreating awesome ui animations across the web
          </h1>
        </div>

        <DisplayAnimation/>
      </div>
    </div>
  );
}
