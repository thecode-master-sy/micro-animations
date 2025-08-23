"use client";
import { useState, useEffect } from "react";

// Define the shape of the mouse position state
interface MousePosition {
  x: number;
  y: number;
}

// Define the hook's return type and parameters
const useMousePosition = (target?: HTMLElement | null): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const updateMousePosition = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX + 20, y: e.clientY + 20 });
  };

  useEffect(() => {
    const caller: Window | HTMLElement = target ?? window;
    caller.addEventListener("mousemove", updateMousePosition as EventListener);

    return () => {
      caller.removeEventListener(
        "mousemove",
        updateMousePosition as EventListener
      );
    };
  }, [target]);

  return mousePosition;
};

export default useMousePosition;
