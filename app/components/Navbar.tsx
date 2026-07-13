"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link href="/" className="flex flex-col">
          <span className="text-3xl font-bold text-sky-600">
            Seb@loy
          </span>
          <span className="text-sm text-gray-500">
            Online Trusted Market Place
          </span>
        </Link>

        <Link
          href="/cart"
          className="text-lg font-semibold"
        >
          🛒 Cart ({cartCount})
        </Link>

      </div>
    </nav>
  );
}