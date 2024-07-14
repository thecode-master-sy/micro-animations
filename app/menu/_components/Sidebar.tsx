"use client";
import { RefObject, useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { MenutItem, ListItemNumber } from "./MenuItem";
import { MenuToggle } from "./MenuToogle";
import { motion, MotionProps } from "framer-motion";

const menuContent = [
	"what we do",
	"process",
	"case studies",
	"our team",
	"services",
	"Faq",
	"get in touch",
];

type clipValuesProp = {
	clipRight: number;
	clipBottom: number;
};

const sidebarVariants = {
	open: {
		clipPath: `inset(0px 0px 0px 0px round 6px)`,
		transition: {
			ease: [0.22, 1, 0.36, 1],
			duration: 0.5,
		},
	},
	closed: ({
		spaceAroundClip,
		clipValues,
	}: {
		spaceAroundClip: number;
		clipValues: clipValuesProp;
	}) => ({
		clipPath: `inset(${spaceAroundClip}px ${spaceAroundClip}px ${clipValues.clipBottom}px ${clipValues.clipRight}px round 6px)`,
		transition: {
			ease: [0.22, 1, 0.36, 1],
			duration: 0.5,
		},
	}),
};

const navigationMenuVariants = {
	open: {
		x: 0,
		transition: {
			staggerChildren: 0.01,
		},
	},
	closed: {
		x: "100%",
	},
};

const ButtonVariants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			ease: [0.33, 1, 0.68, 1],
			delay: 0.3,
		},
	},
	closed: {
		y: "100%",
		opacity: 0,
	},
};

const sayHelloVariants = {
	open: {
		opacity: 1,
		transition: {
			delay: 0.4,
		},
	},
	closed: {
		opacity: 0,
	},
};

type DimensionsProp = {
	width: number | undefined;
	height: number | undefined;
};

export default function SideBar() {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	const spaceAroundClip = 12;
	const navRef = useRef<HTMLDivElement>(null);
	const navTopRef = useRef<HTMLDivElement>(null);
	const [dimensions, setDimensions] = useState<DimensionsProp>({
		width: 0,
		height: 0,
	});
	const [clipValues, setClipValues] = useState({
		clipBottom: 0,
		clipRight: 0,
	});

	useEffect(() => {
		const getSizing = () => {
			setDimensions((prev) => ({
				width: navRef.current?.offsetWidth,
				height: navRef.current?.offsetHeight,
			}));
			if (navRef.current != undefined && navTopRef.current != undefined) {
				const space = 8 + spaceAroundClip;
				const clipRight =
					navRef.current.offsetWidth - navTopRef.current.offsetWidth - space;
				const clipBottom =
					navRef.current.offsetHeight - navTopRef.current.offsetHeight - space;
				// console.log(navRef.current.offsetWidth - navTopRef.current.offsetWidth);
				/* console.log(
				navRef.current.offsetHeight - navTopRef.current.offsetHeight - 32
			); */
				setClipValues({ clipBottom, clipRight });
			}
		};

		getSizing();

		window.addEventListener("resize", getSizing);

		return () => {
			window.removeEventListener("resize", getSizing);
		};
	}, []);

	return (
		<motion.nav
			ref={navRef}
			initial={false}
			variants={sidebarVariants}
			custom={{ spaceAroundClip, clipValues }}
			animate={isOpen ? "open" : "closed"}
			style={{
				clipPath: `inset(${spaceAroundClip}px ${spaceAroundClip}px ${clipValues.clipBottom}px ${clipValues.clipRight}px round 6px)`,
			}}
			className="relative ml-auto bg-white overflow-hidden pl-8 py-4 pr-4 rounded-md nav-width grid gap-7 border border-menu-background"
		>
			<NavigationTop navTopRef={navTopRef} toggle={toggleMenu} />
			<NavigationMenu isOpen={isOpen} />
			<NavigationBottom />
		</motion.nav>
	);
}

const NavigationTop = ({
	navTopRef,
	toggle,
}: {
	navTopRef: RefObject<HTMLDivElement>;
	toggle: () => void;
}) => {
	return (
		<div className="flex items-center gap-2 ml-auto" ref={navTopRef}>
			<Button>Book a call</Button>
			<MenuToggle toggle={() => toggle()} />
		</div>
	);
};

const NavigationMenu = ({ isOpen }: { isOpen: boolean }) => {
	return (
		<motion.ul initial={false} animate={isOpen ? "open" : "closed"}>
			{menuContent.map((item, index) => {
				return (
					<MenutItem
						animationIndex={index}
						isOpen={isOpen}
						key={index}
						className={menuContent.length - 1 == index ? "border-b " : ""}
					>
						<ListItemNumber>{"0" + index}</ListItemNumber>
						<span>{item}</span>
					</MenutItem>
				);
			})}
		</motion.ul>
	);
};

const NavigationBottom = () => {
	return (
		<div>
			<motion.div variants={sayHelloVariants}>
				<p className="uppercase font-bold text-menu-background text-[12px]">
					Say hello
				</p>
				<p className="text-menu-background text-[12px]">hello@example.com</p>
			</motion.div>

			<Button variants={ButtonVariants} size="lg" className="mt-4">
				Inquire on Pricing
			</Button>
		</div>
	);
};
