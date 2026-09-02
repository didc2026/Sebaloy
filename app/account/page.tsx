"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

function Icon({
  type,
}: {
  type: "orders" | "wishlist" | "address" | "profile" | "password" | "logout" | "arrow" | "shield" | "support" | "delivery" | "care";
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "w-7 h-7",
  };

  if (type === "orders")
    return <svg {...common}><path d="M6 8h12v12H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>;

  if (type === "wishlist")
    return <svg {...common}><path d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.4Z" /></svg>;

  if (type === "address")
    return <svg {...common}><path d="M12 21s7-6.1 7-12A7 7 0 0 0 5 9c0 5.9 7 12 7 12Z" /><circle cx="12" cy="9" r="2.3" /></svg>;

  if (type === "profile")
    return <svg {...common}><circle cx="12" cy="7.5" r="3.2" /><path d="M5.5 20c.8-3.4 3-5.2 6.5-5.2s5.7 1.8 6.5 5.2" /></svg>;

  if (type === "password")
    return <svg {...common}><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><path d="M12 14v2" /></svg>;

  if (type === "logout")
    return <svg {...common}><path d="M10 17l5-5-5-5" /><path d="M15 12H4" /><path d="M20 4v16" /></svg>;

  if (type === "arrow")
    return <svg {...common}><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>;

  if (type === "shield")
    return <svg {...common}><path d="M12 3 19 6v5c0 4.7-2.9 8.2-7 10-4.1-1.8-7-5.3-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" /></svg>;

  if (type === "support")
    return <svg {...common}><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><path d="M4 13h3v5H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 1-2Z" /><path d="M20 13h-3v5h2a2 2 0 0 0 2-2v-1a2 2 0 0 0-1-2Z" /></svg>;

  if (type === "delivery")
    return <svg {...common}><path d="M3 6h11v10H3z" /><path d="M14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.7" /><circle cx="18" cy="18" r="1.7" /></svg>;

  return <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M8 12h8M12 8v8" /></svg>;
}

type CardProps = {
  href: string;
  title: string;
  description: string;
  icon: "orders" | "wishlist" | "address" | "profile" | "password";
  tone: string;
};

function AccountCard({ href, title, description, icon, tone }: CardProps) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-5 sm:p-6 flex items-center gap-5"
    >
      <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${tone}`}>
        <Icon type={icon} />
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <p className="mt-1 text-slate-500 leading-6">{description}</p>
      </div>

      <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${tone} group-hover:translate-x-1 transition-transform`}>
        <Icon type="arrow" />
      </div>
    </Link>
  );
}

export default function AccountPage() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Unable to logout. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">

        {/* Account Hero */}
        <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-sky-700 via-cyan-600 to-teal-500 text-white shadow-lg">
          <div className="absolute -top-28 left-1/4 w-72 h-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 right-10 w-80 h-80 rounded-full bg-white/10" />

          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 1000 260" preserveAspectRatio="none">
              <path
                d="M0 155 C110 90 160 220 280 145 S470 85 590 150 S780 215 1000 105"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M0 185 C110 120 160 250 280 175 S470 115 590 180 S780 245 1000 135"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div className="relative z-10 flex items-center gap-5 sm:gap-7 px-6 sm:px-9 py-7 sm:py-8">
            <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white/50 bg-white/10 flex items-center justify-center">
              <Icon type="profile" />
            </div>

            <div>
              <p className="text-base sm:text-lg text-white/85">Welcome back,</p>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                My Account
              </h1>
              <p className="mt-2 text-sm sm:text-lg text-white/90">
                Manage your account, orders and preferences
              </p>
            </div>
          </div>
        </section>

        {/* Account Options */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">
          <AccountCard
            href="/account/orders"
            title="My Orders"
            description="View and track your order history"
            icon="orders"
            tone="bg-emerald-50 text-emerald-600"
          />

          <AccountCard
            href="/account/wishlist"
            title="Wishlist"
            description="View and manage your saved products"
            icon="wishlist"
            tone="bg-rose-50 text-rose-500"
          />

          <AccountCard
            href="/account/addresses"
            title="Addresses"
            description="Manage your delivery addresses"
            icon="address"
            tone="bg-blue-50 text-blue-600"
          />

          <AccountCard
            href="/account/profile"
            title="Profile"
            description="Update your personal information"
            icon="profile"
            tone="bg-violet-50 text-violet-600"
          />

          <AccountCard
            href="/account/change-password"
            title="Change Password"
            description="Keep your account secure"
            icon="password"
            tone="bg-amber-50 text-amber-600"
          />

          {/* Working Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="group text-left rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-5 sm:p-6 flex items-center gap-5 bg-gradient-to-r from-red-500 to-orange-500 text-white"
          >
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center">
              <Icon type="logout" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold">Logout</h2>
              <p className="mt-1 text-white/90 leading-6">
                Sign out from your account securely
              </p>
            </div>

            <div className="shrink-0 w-12 h-12 rounded-full bg-white text-red-500 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <Icon type="arrow" />
            </div>
          </button>
        </section>

        {/* Trust Strip */}
        <section className="mt-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="flex items-center gap-3 px-2 sm:px-4 py-3 border-r border-slate-200">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Icon type="shield" />
              </div>
              <div>
                <p className="font-bold text-emerald-700">100% Secure</p>
                <p className="text-sm text-slate-500">Your data is safe</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 sm:px-4 py-3 md:border-r border-slate-200">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Icon type="support" />
              </div>
              <div>
                <p className="font-bold text-emerald-700">24/7 Support</p>
                <p className="text-sm text-slate-500">We are here to help</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 sm:px-4 py-3 border-r border-slate-200">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Icon type="delivery" />
              </div>
              <div>
                <p className="font-bold text-emerald-700">Fast Delivery</p>
                <p className="text-sm text-slate-500">Quick & reliable</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 sm:px-4 py-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Icon type="care" />
              </div>
              <div>
                <p className="font-bold text-emerald-700">Trusted Care</p>
                <p className="text-sm text-slate-500">Quality healthcare</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
