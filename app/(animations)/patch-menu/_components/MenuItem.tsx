"use client";
import { HTMLAttributes, LiHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, MotionProps, AnimatePresence, delay } from "motion/react";

interface MenuItemProps extends LiHTMLAttributes<HTMLLIElement> {
  isOpen: boolean;
  animationIndex: number;
}
interface ListItemProps extends HTMLAttributes<HTMLSpanElement> {}

const hoverVariants = {
  initial: {
    y: "-100%",
  },
  animate: {
    y: 0,
  },
  exit: {
    y: "100%",
  },
};

const menuItemVariants = {
  open: (index: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      ease: [0.33, 1, 0.68, 1],
      duration: 0.6,
      delay: index * 0.01,
      opacity: {
        duration: 0.4,
      },
    },
  }),
  closed: (index: number) => ({
    x: "100%",
    opacity: 0,
  }),
};

export const MenutItem: React.FC<MenuItemProps & MotionProps> = ({
  animationIndex,
  isOpen,
  className,
  children,
  ...props
}) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <motion.li
      variants={menuItemVariants}
      initial={false}
      whileHover={{ color: "#ffff", paddingLeft: "0.7rem" }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      custom={animationIndex}
      className={cn(
        "relative overflow-hidden uppercase cursor-pointer font-bold text-xl text-menu-background flex gap-7 py-2 border-t border-menu-background items-center",
        className
      )}
      {...props}
    >
      {children}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            variants={hoverVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute -z-[1] top-0 left-0 w-full h-full bg-menu-background"
          ></motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export const ListItemNumber: React.FC<ListItemProps> = ({ ...props }) => {
  return (
    <span
      className="text-[10px] bg-white text-menu-background border border-all border-menu-background w-5 h-5 font-bold flex justify-center items-center"
      {...props}
    />
  );
};
