export default function DeliveryCard() {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm space-y-4">

      <div className="flex items-start gap-3">
        <span className="text-2xl">🚚</span>
        <div>
          <h3 className="font-semibold">Fast Delivery</h3>
          <p className="text-sm text-gray-600">
            Inside Dhaka: 24 Hours
          </p>
          <p className="text-sm text-gray-600">
            Outside Dhaka: 2–3 Working Days
          </p>
        </div>
      </div>

      <hr />

      <div className="flex items-start gap-3">
        <span className="text-2xl">🛡️</span>
        <div>
          <h3 className="font-semibold">100% Genuine Product</h3>
          <p className="text-sm text-gray-600">
            All products are sourced from authorized suppliers.
          </p>
        </div>
      </div>

      <hr />

      <div className="flex items-start gap-3">
        <span className="text-2xl">↩️</span>
        <div>
          <h3 className="font-semibold">Easy Return</h3>
          <p className="text-sm text-gray-600">
            Return or replacement according to our policy.
          </p>
        </div>
      </div>

      <hr />

      <div className="flex items-start gap-3">
        <span className="text-2xl">☎️</span>
        <div>
          <h3 className="font-semibold">Need Help?</h3>
          <p className="text-sm text-gray-600">
            Call us or send a message anytime.
          </p>
        </div>
      </div>

    </div>
  );
}