"use client";
import { ArrowRight, Cpu, Mail, Moon } from "lucide-react";
import { GithubLogo, XLogo } from "@phosphor-icons/react";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[20] flex justify-between items-center py-4 px-4">
      <div className="flex items-center gap-2">
        <Cpu size={32} strokeWidth={1} className="text-orange-500" />
        <span className="uppercase -tracking-[0.02em]">Micro animations</span>
      </div>
      <div className="bg-homepage-navbar-bg flex gap-4 rounded-full border w-max  px-4 py-[6px] shadow-sm border-gray-300">
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>

        <span className="h-full w-[1px] bg-gray-300" />

        <div className="flex  items-center gap-4">
          <Mail strokeWidth={1} size={18} />

          <GithubLogo size={18} />
          <XLogo size={18} />
          <button>
            <Moon strokeWidth={1} size={18} />
          </button>
        </div>
      </div>

      <a
        href="https://x.com/thecode_master"
        className="uppercase font-medium flex items-center gap-2"
      >
        <span>View source code</span>
        <ArrowRight />
      </a>
    </div>
  );
}
