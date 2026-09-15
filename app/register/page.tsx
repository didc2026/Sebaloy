"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

type RegisterMethod = "email" | "mobile";

export default function RegisterPage() {
  const router = useRouter();

  const [method, setMethod] = useState<RegisterMethod>("email");

  // Email registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Mobile registration
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const confirmationResultRef = useRef<ConfirmationResult | null>(null);

  // =========================================================
  // BANGLADESH MOBILE NUMBER FORMAT
  // =========================================================

  function formatBangladeshPhone(value: string) {
    const cleaned = value.replace(/\D/g, "");

    // Example: 01332601180
    if (cleaned.startsWith("01") && cleaned.length === 11) {
      return `+880${cleaned.substring(1)}`;
    }

    // Example: 8801332601180
    if (cleaned.startsWith("8801") && cleaned.length === 13) {
      return `+${cleaned}`;
    }

    // Example: 1332601180
    if (cleaned.startsWith("1") && cleaned.length === 10) {
      return `+880${cleaned}`;
    }

    return "";
  }

  // =========================================================
  // EMAIL REGISTRATION
  // =========================================================

  async function handleEmailRegister(e: React.FormEvent) {
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
      setError(
        err?.message || "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // MOBILE REGISTRATION - SEND OTP
  // =========================================================

  async function handleSendOtp() {
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    const formattedPhone = formatBangladeshPhone(phone);

    if (!formattedPhone) {
      setError(
        "Please enter a valid Bangladesh mobile number."
      );
      return;
    }

    setLoading(true);

    try {
      // Create invisible reCAPTCHA only once
      if (!recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current =
          new RecaptchaVerifier(
            auth,
            "send-otp-button",
            {
              size: "invisible",

              callback: () => {
                // Invisible reCAPTCHA completed.
              },

              "expired-callback": () => {
                setError(
                  "Verification expired. Please try again."
                );
              },
            }
          );
      }

      // Send OTP
      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptchaVerifierRef.current
      );

      confirmationResultRef.current = result;

      setOtpSent(true);
      setError("");
    } catch (err: any) {
      console.error(
        "Mobile registration error:",
        err
      );

      setError(
        err?.message ||
          "Unable to send OTP. Please check your mobile number and try again."
      );

      // Reset verifier so another attempt can be made
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch {
          // Ignore reset error
        }

        recaptchaVerifierRef.current = null;
      }
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // MOBILE REGISTRATION - VERIFY OTP
  // =========================================================

  async function handleVerifyOtp(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    if (!otp || otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    if (!confirmationResultRef.current) {
      setError("Please request an OTP first.");
      return;
    }

    setLoading(true);

    try {
      // Verify OTP
      const result =
        await confirmationResultRef.current.confirm(
          otp
        );

      // Save user's name
      await updateProfile(result.user, {
        displayName: name,
      });

      // Go to account
      router.push("/account");
    } catch (err: any) {
      console.error(
        "OTP verification error:",
        err
      );

      setError(
        err?.message ||
          "Invalid OTP. Please check the code and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // SWITCH REGISTRATION METHOD
  // =========================================================

  function switchToEmail() {
    setMethod("email");

    setError("");
    setOtpSent(false);
    setOtp("");

    confirmationResultRef.current = null;
  }

  function switchToMobile() {
    setMethod("mobile");

    setError("");
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-500 text-sm">
          Choose how you want to create your account
        </p>

        {/* =====================================================
            REGISTRATION METHOD
        ===================================================== */}

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">

          {/* EMAIL */}
          <button
            type="button"
            onClick={switchToEmail}
            className={`rounded-lg py-2.5 font-semibold transition ${
              method === "email"
                ? "bg-white text-sky-600 shadow"
                : "text-gray-600"
            }`}
          >
            ✉️ Email
          </button>

          {/* MOBILE */}
          <button
            type="button"
            onClick={switchToMobile}
            className={`rounded-lg py-2.5 font-semibold transition ${
              method === "mobile"
                ? "bg-white text-sky-600 shadow"
                : "text-gray-600"
            }`}
          >
            📱 Mobile
          </button>

        </div>

        {/* =====================================================
            EMAIL REGISTRATION
        ===================================================== */}

        {method === "email" && (
          <form
            onSubmit={handleEmailRegister}
            className="mt-8 space-y-5"
          >

            {/* FULL NAME */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3"
              required
            />

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3"
              required
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3"
              required
            />

            {/* ERROR */}
            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* CREATE ACCOUNT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-sky-600 py-3 text-white font-semibold disabled:opacity-60"
            >
              {loading
                ? "Creating..."
                : "Create Account"}
            </button>

          </form>
        )}

        {/* =====================================================
            MOBILE REGISTRATION
        ===================================================== */}

        {method === "mobile" && (
          <form
            onSubmit={handleVerifyOtp}
            className="mt-8 space-y-5"
          >

            {/* FULL NAME */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3"
              required
            />

            {/* MOBILE NUMBER */}
            <input
              type="tel"
              placeholder="Mobile Number (01XXXXXXXXX)"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3"
              required
              disabled={otpSent}
            />

            {/* =================================================
                SEND OTP
            ================================================= */}

            {!otpSent && (
              <>
                {error && (
                  <div className="text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <button
                  id="send-otp-button"
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full rounded-xl bg-sky-600 py-3 text-white font-semibold disabled:opacity-60"
                >
                  {loading
                    ? "Sending OTP..."
                    : "Send OTP"}
                </button>
              </>
            )}

            {/* =================================================
                OTP VERIFICATION
            ================================================= */}

            {otpSent && (
              <>
                <p className="text-sm text-gray-600 text-center">
                  A verification code has been
                  sent to your mobile number.
                </p>

                {/* OTP */}
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  className="w-full rounded-xl border px-4 py-3 text-center tracking-widest"
                  required
                />

                {/* ERROR */}
                {error && (
                  <div className="text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {/* VERIFY */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-sky-600 py-3 text-white font-semibold disabled:opacity-60"
                >
                  {loading
                    ? "Verifying..."
                    : "Verify & Create Account"}
                </button>
              </>
            )}

          </form>
        )}

        {/* =====================================================
            LOGIN LINK
        ===================================================== */}

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