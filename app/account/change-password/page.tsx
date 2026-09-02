"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v2" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6 0 9.5 7 9.5 7a18.2 18.2 0 0 1-3.1 3.8" />
      <path d="M6.1 6.1C3.8 7.6 2.5 12 2.5 12s3.5 7 9.5 7c1.5 0 2.8-.4 4-1" />
    </svg>
  );
}

export default function ChangePasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      router.replace("/login");
      return;
    }

    setEmail(user.email || "");
  }, [router]);

  async function handleChangePassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setError("");

    const user = auth.currentUser;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from your current password.");
      return;
    }

    if (!user.email) {
      setError("Your account does not have an email/password login.");
      return;
    }

    try {
      setSaving(true);

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setMessage("Password changed successfully.");
    } catch (err: any) {
      console.error("Change password error:", err);

      if (err?.code === "auth/wrong-password" || err?.code === "auth/invalid-credential") {
        setError("Current password is incorrect.");
      } else if (err?.code === "auth/weak-password") {
        setError("Please choose a stronger password.");
      } else if (err?.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else if (err?.code === "auth/provider-already-linked") {
        setError("This account is not using email/password authentication.");
      } else {
        setError("Unable to change password. Please check your current password and try again.");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">

        {/* Hero */}
        <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-sky-700 via-cyan-600 to-teal-500 text-white shadow-lg">
          <div className="absolute -top-28 left-1/4 w-72 h-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 right-10 w-80 h-80 rounded-full bg-white/10" />

          <div className="absolute inset-0 opacity-30">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 260"
              preserveAspectRatio="none"
            >
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
            <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-white/40 bg-white/10 flex items-center justify-center">
              <LockIcon />
            </div>

            <div>
              <p className="text-base sm:text-lg text-white/85">
                Account security
              </p>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Change Password
              </h1>
              <p className="mt-2 text-sm sm:text-lg text-white/90">
                Keep your account secure
              </p>
            </div>
          </div>
        </section>

        {/* Form Card */}
        <section className="mt-7 bg-white rounded-[28px] border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <LockIcon />
              </div>

              <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-slate-800">
                Update Your Password
              </h2>

              <p className="mt-2 text-slate-500">
                Enter your current password and choose a new one.
              </p>
            </div>

            <div className="mb-7 rounded-2xl bg-slate-50 border border-slate-200 px-5 py-4">
              <p className="text-sm text-slate-500">Account</p>
              <p className="mt-1 font-semibold text-slate-800 break-all">
                {email || "Loading..."}
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
                {message}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-6">
              <PasswordField
                label="Current Password"
                value={currentPassword}
                onChange={setCurrentPassword}
                show={showCurrent}
                onToggle={() => setShowCurrent((v) => !v)}
                autoComplete="current-password"
              />

              <PasswordField
                label="New Password"
                value={newPassword}
                onChange={setNewPassword}
                show={showNew}
                onToggle={() => setShowNew((v) => !v)}
                autoComplete="new-password"
              />

              <PasswordField
                label="Confirm New Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                show={showConfirm}
                onToggle={() => setShowConfirm((v) => !v)}
                autoComplete="new-password"
              />

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-500">
                <p className="font-semibold text-slate-700 mb-2">
                  Password requirements
                </p>
                <ul className="space-y-1 list-disc pl-5">
                  <li>At least 6 characters</li>
                  <li>Use a password different from your current password</li>
                  <li>Keep your password private and secure</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-lg py-4 shadow-md hover:shadow-lg transition-all"
              >
                {saving ? "Changing Password..." : "Change Password"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => router.push("/account")}
              className="w-full mt-4 py-3 text-slate-500 hover:text-teal-700 font-medium transition"
            >
              ← Back to My Account
            </button>
          </div>
        </section>

        {/* Security note */}
        <div className="mt-5 text-center text-sm text-slate-500">
          Your password is securely managed through Firebase Authentication.
        </div>
      </div>
    </main>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggle,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onToggle: () => void;
  autoComplete: string;
}) {
  return (
    <div>
      <label className="block text-lg font-bold text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 pr-14 text-lg text-slate-800 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
          placeholder="Enter password"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600"
        >
          <EyeIcon open={show} />
        </button>
      </div>
    </div>
  );
}
