import KpiPill from "../KpiPill";

type OrderWorkflowProps = {
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;

  onPendingClick: () => void;
  onProcessingClick: () => void;
  onShippedClick: () => void;
  onDeliveredClick: () => void;
};

export default function OrderWorkflow({
  pendingOrders,
  processingOrders,
  shippedOrders,
  deliveredOrders,
  onPendingClick,
  onProcessingClick,
  onShippedClick,
  onDeliveredClick,
}: OrderWorkflowProps) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-slate-800 mb-2">
        📦 Order Workflow
      </h2>

      <div className="flex items-center gap-4 overflow-x-auto py-2">
<KpiPill
  title={`Pending (${pendingOrders})`}
  value=""
  icon="🟡"
  onClick={onPendingClick}
/>

<KpiPill
  title={`Processing (${processingOrders})`}
  value=""
  icon="🔵"
  onClick={onProcessingClick}
/>

<KpiPill
  title={`Shipped (${shippedOrders})`}
  value=""
  icon="🟣"
  onClick={onShippedClick}
/>

<KpiPill
  title={`Delivered (${deliveredOrders})`}
  value=""
  icon="🟢"
  onClick={onDeliveredClick}
/>      </div>
    </div>
  );
}