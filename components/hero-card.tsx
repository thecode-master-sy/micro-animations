"use client";
import { cn } from "@/lib/utils";

export default function HeroCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-homepage-card-bg p-3 border border-gray-300 rounded-md",
        className
      )}
    >
      <div className="rounded-md overflow-hidden">
        <img src="/01.png"></img>
      </div>

      <div className="mt-2">
        <p>Shopping Experience</p>
      </div>
    </div>
  );
}
