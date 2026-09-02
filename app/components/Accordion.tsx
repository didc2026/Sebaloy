"use client";

import { useState } from "react";

type AccordionProps = {
title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-4 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition"
      >
        <h3 className="text-lg font-semibold text-slate-800">
          {title}
        </h3>

        <span className="text-2xl font-bold text-slate-500">
          {open ? "−" : "+"}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[2000px]" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-6 text-slate-600 whitespace-pre-line leading-7">
          {children}
        </div>
      </div>
    </div>
  );
}