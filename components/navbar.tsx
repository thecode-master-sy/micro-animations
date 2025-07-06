"use client";
import { ArrowRight, Cpu, Mail, Moon } from "lucide-react";
import { GithubLogoIcon, XLogoIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="fixed  items-center top-0 left-0 right-0 z-[20] flex py-2 px-4 -tracking-[0.03em] justify-between">
      <div>
        <span className="uppercase text-navbar">Micro animations</span>
      </div>
      <div className="md:flex hidden gap-4">
        <ul className="flex items-center gap-2 font-medium text-navbar uppercase rounded-full">
          <li className="px-4 py-1 bg-homepage-navbar-hover rounded-full border border-gray-300">
            <Link href="/home">Home</Link>
          </li>
          <li className="px-4 py-1 ">
            <Link href="/about">About</Link>
          </li>
          <li className="px-4 py-1 ">
            <Link href="/contact">Socials</Link>
          </li>
        </ul>
      </div>

      <div className="flex gap-4 items-center">
        <button className="bg-homepage-navbar-bg px-4 py-1 text-navbar rounded-sm">
          Log in
        </button>
        <button className="px-4 py-[6px] rounded-sm bg-orange-500 font-medium text-navbar">
          Become a member
        </button>
      </div>
    </div>
  );
}
