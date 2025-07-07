import Image from "next/image";
import HeroSection from "./_sections/hero.section";
import NavBar from "../components/navbar";
import FeaturedSection from "./_sections/featured.section";

export default function Home() {
  return (
    <div className="text-paragraph bg-homepage-background ">
    

      <HeroSection />
      <FeaturedSection />
    </div>
  );
}
