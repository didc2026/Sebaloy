import KpiPill from "../KpiPill";

type BusinessStatsProps = {
  todaySales: number;
  monthSales: number;
  onSalesClick: () => void;
  onOrdersClick: () => void;
};

export default function BusinessStats({
  todaySales,
  monthSales,
  onSalesClick,
  onOrdersClick,
}: BusinessStatsProps) {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-800">
            📈 Business Analytics
          </h2>

          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Sales performance overview
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <KpiPill
          title="Today's Sales"
          value={`৳${todaySales.toLocaleString()}`}
          icon="📅"
          onClick={onSalesClick}
        />

        <KpiPill
          title="This Month Sales"
          value={`৳${monthSales.toLocaleString()}`}
          icon="📆"
          onClick={onOrdersClick}
        />
      </div>
    </section>
  );
}