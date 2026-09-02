type StatCardProps = {
  title: string;
  value: string | number;
  color?: string;
};

export default function StatCard({
  title,
  value,
  color = "bg-blue-500",
}: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all p-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">{title}</p>

          <h2 className="text-xl font-bold text-slate-800 mt-1">
            {value}
          </h2>
        </div>

        <div className={`w-2 h-8 rounded-full ${color}`} />
      </div>
    </div>
  );
}