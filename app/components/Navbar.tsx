"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

type SearchProduct = {
  id: string;
  name: string;
  company?: string;
  imageUrl?: string;
  price: number;
};

type SearchResult = {
  id: string;
  name: string;
  company?: string;
  imageUrl?: string;
  price?: number;
};

export default function Navbar() {
  const { search, setSearch } = useSearch();
  const { cartCount } = useCart();

  const router = useRouter();
  const pathname = usePathname();

  const [results, setResults] = useState<SearchResult[]>([]);
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const searchBoxRef = useRef<HTMLDivElement>(null);

  /* --------------------------------
     LOAD PRODUCTS
  -------------------------------- */
  useEffect(() => {
    async function loadProducts() {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<SearchProduct, "id">),
        }));

        setProducts(data);
      } catch (error) {
        console.error("Navbar product loading error:", error);
      }
    }

    loadProducts();
  }, []);

  /* --------------------------------
     AUTH STATE
  -------------------------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  /* --------------------------------
     CLOSE SEARCH WHEN CLICK OUTSIDE
  -------------------------------- */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* --------------------------------
     SEARCH
  -------------------------------- */
  useEffect(() => {
    const keyword = search.trim().toLowerCase();

    if (keyword === "") {
      setResults([]);
      setShowResults(false);
      return;
    }

    const filtered = products
      .map((product) => {
        const name = product.name.toLowerCase();
        const company = (product.company || "").toLowerCase();

        let score = -1;

        // 1. Product name starts with keyword
        if (name.startsWith(keyword)) {
          score = 1;
        }

        // 2. Any word in product name starts with keyword
        else if (
          name
            .split(" ")
            .some((word) => word.startsWith(keyword))
        ) {
          score = 2;
        }

        // 3. Company starts with keyword
        else if (company.startsWith(keyword)) {
          score = 3;
        }

        // 4. Product name contains keyword
        else if (name.includes(keyword)) {
          score = 4;
        }

        // 5. Company contains keyword
        else if (company.includes(keyword)) {
          score = 5;
        }

        return {
          product,
          score,
        };
      })
      .filter((item) => item.score !== -1)
      .sort((a, b) => {
        if (a.score !== b.score) {
          return a.score - b.score;
        }

        return a.product.name.localeCompare(b.product.name);
      })
      .map((item) => item.product)
      .slice(0, 5);

    setResults(filtered);
    setShowResults(filtered.length > 0);
  }, [search, products]);

  return (
    <nav
      className={`print:hidden ${
        pathname === "/account"
          ? "relative z-50"
          : "sticky top-0 z-50"
      } bg-white shadow-sm border-b border-slate-200`}
    >
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          py-3
          flex items-center justify-between
          gap-3
        "
      >
        {/* --------------------------------
            LOGO
        -------------------------------- */}
        <Link
          href="/"
          className="flex items-center shrink-0"
        >
          <Image
            src="/logo/sebaloy-logo.png"
            alt="Sebaloy"
            width={170}
            height={50}
            priority
            className="
              w-32
              sm:w-40
              md:w-44
              h-auto
            "
          />
        </Link>

        {/* --------------------------------
            SEARCH
        -------------------------------- */}
        <div
          ref={searchBoxRef}
          className="
            hidden md:flex
            flex-1
            max-w-2xl
            mx-4 lg:mx-8
            relative
          "
        >
          <input
            onFocus={() => {
              if (results.length > 0) {
                setShowResults(true);
              }
            }}
            type="text"
            placeholder="🔍 Search medicines, healthcare products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-xl
              border border-slate-300
              bg-white
              px-4 py-2.5
              text-sm
              text-slate-700
              placeholder:text-slate-400
              shadow-sm
              transition
              focus:outline-none
              focus:ring-2
              focus:ring-teal-500/30
              focus:border-teal-500
            "
          />

          {/* Search Results */}
          {showResults && (
            <div
              className="
                absolute
                top-full
                left-0
                right-0
                mt-2
                bg-white
                rounded-xl
                shadow-2xl
                border border-slate-200
                overflow-hidden
                z-[100]
              "
            >
              {results.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    setShowResults(false);
                    router.push(`/product/${product.id}`);
                  }}
                  className="
                    w-full
                    flex items-center
                    gap-4
                    p-3
                    text-left
                    hover:bg-slate-50
                    border-b
                    last:border-b-0
                    transition
                  "
                >
                  <img
                    src={
                      product.imageUrl ||
                      "/images/no-image.png"
                    }
                    alt={product.name}
                    className="
                      w-14 h-14
                      object-contain
                      rounded-lg
                      bg-slate-50
                    "
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 truncate">
                      {product.name}
                    </h4>

                    <p className="text-sm text-slate-500 truncate">
                      {product.company}
                    </p>
                  </div>

                  <div className="font-bold text-teal-600 whitespace-nowrap">
                    ৳ {product.price}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --------------------------------
            ACCOUNT
        -------------------------------- */}
        {user ? (
          <Link
            href="/account"
            className="
              flex items-center
              gap-2
              rounded-xl
              px-2 sm:px-3
              py-2
              font-semibold
              text-slate-700
              hover:bg-slate-50
              hover:text-teal-700
              transition
              whitespace-nowrap
            "
          >
            <span className="text-lg">👤</span>

            <span className="hidden sm:inline">
              My Account
            </span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="
              flex items-center
              gap-2
              rounded-xl
              px-2 sm:px-3
              py-2
              font-semibold
              text-slate-700
              hover:bg-slate-50
              transition
              whitespace-nowrap
            "
          >
            <span>Sign In</span>
          </Link>
        )}

        {/* --------------------------------
            CART
        -------------------------------- */}
        <Link
          href="/cart"
          className="
            flex items-center
            gap-2
            rounded-xl
            px-2 sm:px-3
            py-2
            font-semibold
            text-slate-700
            hover:bg-blue-50
            hover:text-blue-600
            transition
            whitespace-nowrap
          "
        >
          <span className="text-xl">
            🛒
          </span>

          <span className="hidden sm:inline">
            Cart
          </span>

          <span
            className="
              min-w-7
              h-7
              px-1.5
              flex items-center justify-center
              rounded-full
              bg-blue-600
              text-white
              text-xs
              font-bold
              shadow-sm
            "
          >
            {cartCount}
          </span>
        </Link>
      </div>
    </nav>
  );
}