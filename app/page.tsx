import Image from "next/image";
import HeroSection from "./_sections/hero.section";
import NavBar from "../components/navbar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <HeroSection />
    </div>
  );
}
