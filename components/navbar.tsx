"use client";
import { ArrowRight, Cpu, Mail, Moon } from "lucide-react";
import { GithubLogoIcon, XLogoIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  return (
    <div className="fixed  items-center top-0 left-0 right-0 z-[20] flex py-2 px-4 -tracking-[0.04em] justify-between">
      <div>
        <span className="uppercase text-navbar">Micro animations</span>
      </div>
      <div className="md:flex hidden">
        <ul className="flex items-center gap-2 font-medium text-navbar uppercase  rounded-full">
          <li className="px-4 py-1 rounded-sm bg-[#312e29] text-white">
            <Link className="relative" href="/home">
              <span>Home</span>
            </Link>
          </li>
          <li className="px-4 py-1 bg-homepage-navbar-bg  rounded-sm">
            <Link href="/about">About</Link>
          </li>
          <li className="px-4 py-1 bg-homepage-navbar-bg  rounded-sm">
            <Link href="/contact">Socials</Link>
          </li>
          <li className="px-4 py-1 bg-homepage-navbar-bg  rounded-sm">
            <Link href="/contact">Gallery</Link>
          </li>
        </ul>
      </div>

      <div className="md:flex gap-4 items-center hidden">
        <button className="bg-homepage-navbar-bg px-4 py-1 text-navbar rounded-sm">
          Log in
        </button>
        <button className="px-4 py-[6px] rounded-sm bg-orange-500 font-medium text-navbar">
          Become a member
        </button>
      </div>

      <button className="bg-homepage-navbar-bg px-4 py-1 text-navbar rounded-sm uppercase md:hidden">
        Menu
      </button>
    </div>
  );
}
