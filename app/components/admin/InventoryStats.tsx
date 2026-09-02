import KpiPill from "../KpiPill";

type InventoryStatsProps = {
  totalProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  activeProducts: number;

  onTotalProductsClick: () => void;
  onLowStockClick: () => void;
  onOutOfStockClick: () => void;
  onActiveProductsClick: () => void;
};

export default function InventoryStats({
  totalProducts,
  lowStockProducts,
  outOfStockProducts,
  activeProducts,
  onTotalProductsClick,
  onLowStockClick,
  onOutOfStockClick,
  onActiveProductsClick,
}: InventoryStatsProps) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-slate-800 mb-2">
        📦 Inventory
      </h2>

      <div className="flex items-center gap-4 overflow-x-auto py-2">
        <KpiPill
          title={`Total Products (${totalProducts})`}
          value=""
          icon="🟢"
          onClick={onTotalProductsClick}
        />

        <KpiPill
          title={`Low Stock (${lowStockProducts})`}
          value=""
          icon="🟠"
          onClick={onLowStockClick}
        />

        <KpiPill
          title={`Out of Stock (${outOfStockProducts})`}
          value=""
          icon="🔴"
          onClick={onOutOfStockClick}
        />

        <KpiPill
          title={`Active Products (${activeProducts})`}
          value=""
          icon="🔵"
          onClick={onActiveProductsClick}
        />
      </div>
    </div>
  );
}