type DashboardHeaderProps = {
  onLogout: () => void;
};

export default function DashboardHeader({
  onLogout,
}: DashboardHeaderProps) {
  return (
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            🛡️ Sebaloy Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Manage Products, Orders, Customers & Inventory
          </p>
        </div>

        <button
          onClick={onLogout}
          className="rounded-xl bg-red-500 px-5 py-3 font-semibold text-white hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
  );
}