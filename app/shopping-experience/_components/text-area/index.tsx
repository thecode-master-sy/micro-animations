"use client";
import { ArrowRight } from "lucide-react";
export default function AddNoteTextArea() {
  return (
    <div className="p-4 grid bg-[#c6df53] border-2 rounded-2xl border-shopping-primary">
      <textarea
        placeholder="Add note"
        autoFocus
        className="text-shopping-primary min-h-[100px] placeholder:text-shopping-primary w-full resize-none bg-transparent focus:outline-0 focus:border-none font-medium"
      />
      <button className="flex rounded-full text-shopping-background px-6 py-4 gap-2 items-center text ml-auto bg-shopping-primary">
        <span>Submit</span>
        <ArrowRight />
      </button>
    </div>
  );
}
