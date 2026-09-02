"use client";

import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-500 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

        {/* Left Content */}
        <div className="p-8 md:p-14">

          <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-medium">
            Trusted Online Healthcare Marketplace
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight">
            Your Trusted Healthcare
            <br />
            Shopping Destination
          </h1>

          <p className="mt-5 text-lg text-sky-100">
            Buy medicines, baby care, healthcare products,
            laboratory items and medical devices from one trusted platform.
          </p>

          <div className="flex gap-4 mt-8">

            <Link
              href="/products"
              className="bg-white text-sky-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100"
            >
              Shop Now
            </Link>

            <Link
              href="/offers"
              className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-sky-700"
            >
              View Offers
            </Link>

          </div>

        </div>

        {/* Right Image */}
        <div className="hidden lg:flex justify-center p-8">

          <img
            src="/banner/hero-banner.png"
            alt="Sebaloy Hero"
            className="max-h-[420px] object-contain"
          />

        </div>

      </div>
    </section>
  );
}