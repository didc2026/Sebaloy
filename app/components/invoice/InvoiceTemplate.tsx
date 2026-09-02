export default function InvoiceTemplate() {
  return (
    <div className="bg-gray-100 p-8 flex justify-center">
      <div className="w-[210mm] min-h-[297mm] bg-white p-10 shadow-lg">

        {/* Header */}
        <div className="border-b pb-6">
          <h1 className="text-3xl font-bold text-blue-700">
            Sebaloy
          </h1>

          <p className="text-gray-500">
            Trusted Online Healthcare Marketplace
          </p>

          <h2 className="text-2xl font-bold mt-6">
            Invoice
          </h2>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-10 mt-8">

          <div>
            <h3 className="font-semibold mb-3">
              Customer Information
            </h3>
        
            <p>Name:</p>
            <p>Phone:</p>
            <p>Address:</p>
          </div>

{/* Products */}
<div className="mt-10">
  <table className="w-full border border-gray-300">
    <thead className="bg-gray-100">
      <tr>
        <th className="border p-2 text-left">Product</th>
        <th className="border p-2">Qty</th>
        <th className="border p-2">Price</th>
        <th className="border p-2">Discount</th>
        <th className="border p-2">Total</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td className="border p-2">
          Aveeno Baby Daily Care Moisturizing Lotion
        </td>
        <td className="border p-2 text-center">1</td>
        <td className="border p-2 text-right">৳1200</td>
        <td className="border p-2 text-center">20%</td>
        <td className="border p-2 text-right">৳960</td>
      </tr>

      <tr>
        <td className="border p-2">Monas</td>
        <td className="border p-2 text-center">1</td>
        <td className="border p-2 text-right">৳180</td>
        <td className="border p-2 text-center">5%</td>
        <td className="border p-2 text-right">৳171</td>
      </tr>
    </tbody>
  </table>
</div>
          <div className="text-right">
            <p>Invoice No:</p>
            <p>Order No:</p>
            <p>Date:</p>
          </div>

        </div>

      </div>
    </div>
  );
}