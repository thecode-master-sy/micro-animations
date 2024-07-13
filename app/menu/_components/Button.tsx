import { MotionProps, motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: "sm" | "lg";
}

function generateClassName(size: "sm" | "lg") {
	if (size === "sm") return "px-4 py-2 text-[12px]";
	if (size === "lg") return "px-7 py-3 text-[14px]";
	return "";
}

export const Button: React.FC<ButtonProps & MotionProps> = ({
	size = "sm",
	className,
	...props
}) => {
	const sizeClassName = generateClassName(size);
	return (
		<motion.button
			className={`uppercase bg-menu-button-background text-white font-bold rounded-md ${sizeClassName} ${className}`}
			{...props}
		/>
	);
};
