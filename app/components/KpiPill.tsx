import { ReactNode } from "react";

type KpiPillProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  onClick?: () => void;
};

export default function KpiPill({
  title,
  value,
  icon,
  onClick,
}: KpiPillProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-lg">
          {icon}
        </div>

        <span className="text-xs font-semibold text-slate-700">
          {title}
        </span>
      </div>

      <span className="text-2xl font-bold text-slate-900">
        {value}
      </span>
    </button>
  );
}