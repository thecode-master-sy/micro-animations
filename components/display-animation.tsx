"use client";
import HeroCard from "@/components/hero-card";
import { CodeXml, X, GraduationCap } from "lucide-react";

export default function DisplayAnimation() {
  return (
    <div>
      <div className="flex gap-4 flex-wrap">
        <div className="flex bg-white py-1 border border-gray-300 rounded-sm items-center px-2">
          <div className="flex gap-1 p-3 items-center">
            <CodeXml strokeWidth={1} />
            <span>Source</span>
          </div>

          <button className="py-2 px-3 rounded-sm hover:bg-homepage-navbar-hover">
            <span>Free</span>
          </button>

          <button className="py-2 px-3 rounded-sm hover:bg-homepage-navbar-hover">
            <span>Pro</span>
          </button>
        </div>

        <div className="flex bg-white py-1 border border-gray-300 rounded-sm items-center px-2">
          <div className="flex gap-1 p-3 items-center">
            <GraduationCap strokeWidth={1} />
            <span>level</span>
          </div>

          <button className="py-2 px-3 rounded-sm hover:bg-homepage-navbar-hover">
            <span>Beginer</span>
          </button>

          <button className="py-2 px-3 rounded-sm hover:bg-homepage-navbar-hover">
            <span>Medium</span>
          </button>

          <button className="py-2 px-3 rounded-sm hover:bg-homepage-navbar-hover">
            <span>Hard</span>
          </button>
        </div>

        <button className="flex gap-2 px-4  py-2 items-center bg-white border border-gray-300 rounded-sm">
          <X strokeWidth={1} />
          <span>Clear filters</span>
        </button>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 md:flex-row gap-4 mt-4">
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <HeroCard />
      </div>
    </div>
  );
}
