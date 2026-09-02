"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      router.push("/account");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
            required
          />

          {error && (
            <div className="text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-sky-600 py-3 text-white font-semibold"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <Link
            href="/login"
            className="text-sky-600 hover:underline"
          >
            Already have an account?
          </Link>

        </div>

      </div>
    </main>
  );
}