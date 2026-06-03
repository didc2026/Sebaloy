export default function Home() {
  const categories = [
    "Medicine",
    "Healthcare",
    "Baby & Mom",
    "Lab Test",
    "Beauty",
    "Nutrition",
    "Pet Care",
    "Medical Devices",
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-teal-600 text-white p-6">
        <h1 className="text-4xl font-bold">Sebaloy</h1>
        <p className="text-lg mt-2">
          Your Healthcare Marketplace
        </p>
      </div>

      <section className="max-w-7xl mx-auto p-6">
        {/* Search Box */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <input
            type="text"
            placeholder="Search medicines and healthcare products..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
          />
        </div>

        {/* Hero Banner */}
        <div className="mt-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-10 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to Sebaloy
          </h2>

          <p className="text-lg mb-6">
            Buy medicines, healthcare products and book lab tests online.
          </p>

          <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold">
            Shop Now
          </button>
        </div>

        {/* Categories */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">
            Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((item) => (
              <div
                key={item}
                className="bg-white p-5 rounded-xl shadow text-center hover:shadow-lg transition"
              >
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-bold text-lg">Napa Extra</h3>
              <p className="text-gray-600 mt-2">
                Pain Relief Tablet
              </p>
              <p className="font-bold text-teal-600 mt-3">
                ৳ 30
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-bold text-lg">Vitamin C</h3>
              <p className="text-gray-600 mt-2">
                Immune Support
              </p>
              <p className="font-bold text-teal-600 mt-3">
                ৳ 250
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-bold text-lg">Baby Lotion</h3>
              <p className="text-gray-600 mt-2">
                Baby Care Product
              </p>
              <p className="font-bold text-teal-600 mt-3">
                ৳ 180
              </p>
            </div>
          </div>
        </div>

        {/* Lab Test */}
        <div className="mt-12 bg-white rounded-xl shadow p-8">
          <h2 className="text-2xl font-bold mb-3">
            Lab Test Booking
          </h2>

          <p className="text-gray-600 mb-4">
            Book diagnostic tests from home.
          </p>

          <button className="bg-teal-600 text-white px-6 py-3 rounded-lg">
            Book Lab Test
          </button>
        </div>
      </section>
    </main>
  );
}