"use client";
import { Bookmark, Folder, House, Pen, StickyNote, Box } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const menuItems = [
  { name: "Projects", icon: <Box size={24} strokeWidth={1} /> },
  { name: "Folder", icon: <Folder size={24} strokeWidth={1} /> },
  { name: "Bookmark", icon: <Bookmark size={24} strokeWidth={1} /> },
  { name: "Pen", icon: <Pen size={24} strokeWidth={1} /> },
  { name: "Note", icon: <StickyNote size={24} strokeWidth={1} /> },
];

export default function MenuWithTooltip() {
  const [activeTab, setActiveTab] = useState("Projects");
  const [currentlyHovered, setCurrentlyHovered] = useState("");
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#fafafa]">
      <div
        onMouseLeave={() => setCurrentlyHovered("")}
        className="bg-white p-2 rounded-md border shadow-sm flex items-center gap-2 border-gray-200"
      >
        {menuItems.map((item, index) => (
          <motion.button
            onMouseEnter={() => setCurrentlyHovered(item.name)}
            animate={{
              opacity: currentlyHovered === item.name ? 1 : 0.7,
            }}
            className={cn(
              "p-2 relative",
              activeTab !== item.name && "opacity-70"
            )}
            onClick={() => setActiveTab(item.name)}
            key={index}
          >
            {item.icon}
            {activeTab === item.name && (
              <motion.span
                layoutId="active-item"
                className="absolute inset-0 bg-black/5 rounded-md"
              />
            )}

            <motion.div className="absolute mb-4 -top-[140%] left-1/2 -translate-x-1/2 w-max text-sm p-2 rounded-md">
              <motion.span
                animate={{
                  opacity: currentlyHovered === item.name ? 1 : 0,
                  filter:
                    currentlyHovered === item.name ? "blur(0px)" : "blur(10px)",
                }}
                className="mix-blend-exclusion relative z-10 text-white"
              >
                {item.name}
              </motion.span>

              {currentlyHovered === item.name && (
                <motion.span
                  layoutId="active-item-2"
                  className="absolute inset-0 bg-[#151612] rounded-md"
                />
              )}
            </motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
