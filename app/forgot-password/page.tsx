"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  EmailAuthProvider,
  RecaptchaVerifier,
  sendPasswordResetEmail,
  signInWithPhoneNumber,
  signOut,
  updatePassword,
  type ConfirmationResult,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

type RecoveryMethod = "email" | "mobile";

export default function ForgotPasswordPage() {
  const [method, setMethod] = useState<RecoveryMethod>("email");

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const confirmationResultRef = useRef<ConfirmationResult | null>(null);

  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  function clearMessages() {
    setMessage("");
    setError("");
  }

  function normalizeBangladeshMobile(value: string) {
    let number = value.trim().replace(/\s+/g, "");

    if (number.startsWith("+880")) {
      number = "0" + number.slice(4);
    } else if (number.startsWith("880")) {
      number = "0" + number.slice(3);
    }

    return number;
  }

  function getInternationalMobile(value: string) {
    const number = normalizeBangladeshMobile(value);

    if (!/^01[3-9]\d{8}$/.test(number)) {
      return null;
    }

    return `+880${number.slice(1)}`;
  }

  async function handleEmailRecovery(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    clearMessages();

    try {
      await sendPasswordResetEmail(auth, email.trim());

      setMessage(
        "Password reset link has been sent to your email address."
      );
      setEmail("");
    } catch (err: any) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/user-not-found":
          setError("No account found with this email address.");
          break;

        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;

        default:
          setError(
            "Unable to send reset email. Please check your email and try again."
          );
      }
    } finally {
      setLoading(false);
    }
  }

  async function sendMobileOTP() {
    if (loading) return;

    clearMessages();

    const internationalNumber = getInternationalMobile(mobile);

    if (!internationalNumber) {
      setError(
        "Please enter a valid Bangladesh mobile number, for example 017XXXXXXXX."
      );
      return;
    }

    setLoading(true);

    try {
      if (!recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "normal",
            callback: () => {
              // reCAPTCHA solved
            },
            "expired-callback": () => {
              setError("reCAPTCHA expired. Please verify again.");
            },
          }
        );

        await recaptchaVerifierRef.current.render();
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        internationalNumber,
        recaptchaVerifierRef.current
      );

      confirmationResultRef.current = confirmationResult;

      setOtpSent(true);
      setMessage(
        "OTP has been sent to your mobile number."
      );
    } catch (err: any) {
      console.error("Mobile OTP error:", err);

      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }

      switch (err.code) {
        case "auth/invalid-phone-number":
          setError("Invalid mobile number.");
          break;

        case "auth/too-many-requests":
          setError(
            "Too many attempts. Please try again later."
          );
          break;

        case "auth/quota-exceeded":
          setError(
            "SMS quota has been exceeded. Please try again later."
          );
          break;

        case "auth/captcha-check-failed":
          setError(
            "reCAPTCHA verification failed. Please try again."
          );
          break;

        default:
          setError(
            "Unable to send OTP. Please check the number and try again."
          );
      }
    } finally {
      setLoading(false);
    }
  }

  async function verifyOTP() {
    if (loading) return;

    clearMessages();

    if (!confirmationResultRef.current) {
      setError("Please request an OTP first.");
      return;
    }

    if (!/^\d{6}$/.test(otp.trim())) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    if (newPassword.length < 6) {
      setError(
        "New password must be at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const userCredential =
        await confirmationResultRef.current.confirm(
          otp.trim()
        );

      const user = userCredential.user;

      /*
       * Security check:
       * The phone-authenticated account must already have
       * an email/password identity.
       */
      const hasEmailPasswordProvider =
        user.providerData.some(
          (provider) =>
            provider.providerId ===
            EmailAuthProvider.PROVIDER_ID
        );

      if (!hasEmailPasswordProvider) {
        await signOut(auth);

        setError(
          "This mobile number is not linked to an existing email/password account."
        );

        setLoading(false);
        return;
      }

      await updatePassword(user, newPassword);

      await signOut(auth);

      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setMobile("");
      setOtpSent(false);
      confirmationResultRef.current = null;

      setMessage(
        "Your password has been reset successfully. You can now sign in with your new password."
      );
    } catch (err: any) {
      console.error("Password reset error:", err);

      switch (err.code) {
        case "auth/invalid-verification-code":
          setError("Incorrect OTP. Please try again.");
          break;

        case "auth/code-expired":
          setError(
            "The OTP has expired. Please request a new OTP."
          );
          break;

        case "auth/requires-recent-login":
          setError(
            "Please request a new OTP and try again."
          );
          break;

        case "auth/weak-password":
          setError(
            "Password should be at least 6 characters."
          );
          break;

        default:
          setError(
            "Unable to reset password. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  }

  function changeMethod(nextMethod: RecoveryMethod) {
    setMethod(nextMethod);
    clearMessages();

    setOtpSent(false);
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    confirmationResultRef.current = null;

    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear();
      recaptchaVerifierRef.current = null;
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 px-4 py-8 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
        <div className="w-full">

          {/* Brand */}
          <div className="mb-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-xl font-bold text-white shadow-md">
                S
              </div>

              <span className="text-2xl font-extrabold tracking-tight text-slate-800">
                Sebaloy
              </span>
            </Link>
          </div>

          {/* Card */}
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">

            {/* Header */}
            <div className="bg-gradient-to-r from-sky-600 to-cyan-500 px-6 py-8 text-center sm:px-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl text-white ring-1 ring-white/25">
                🔐
              </div>

              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Forgot Password?
              </h1>

              <p className="mt-2 text-sm text-sky-50 sm:text-base">
                Recover your Sebaloy account
              </p>
            </div>

            {/* Form Area */}
            <div className="px-6 py-7 sm:px-8 sm:py-8">

              <p className="mb-6 text-center text-sm leading-6 text-slate-500">
                Choose how you want to recover your account.
              </p>

              {/* Method Tabs */}
              <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => changeMethod("email")}
                  className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                    method === "email"
                      ? "bg-white text-sky-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  ✉ Email
                </button>

                <button
                  type="button"
                  onClick={() => changeMethod("mobile")}
                  className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                    method === "mobile"
                      ? "bg-white text-sky-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  📱 Mobile OTP
                </button>
              </div>

              {/* EMAIL RECOVERY */}
              {method === "email" && (
                <form
                  onSubmit={handleEmailRecovery}
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        ✉
                      </span>

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearMessages();
                        }}
                        placeholder="Enter your email"
                        autoComplete="email"
                        className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 sm:text-base"
                        required
                      />
                    </div>
                  </div>

                  {message && (
                    <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm leading-5 text-green-700">
                      ✓ {message}
                    </div>
                  )}

                  {error && (
                    <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                      ⚠ {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 py-3.5 font-semibold text-white shadow-md shadow-sky-200 transition hover:from-sky-700 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              )}

              {/* MOBILE RECOVERY */}
              {method === "mobile" && (
                <div className="space-y-5">

                  <div>
                    <label
                      htmlFor="mobile"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Mobile Number
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        📱
                      </span>

                      <input
                        id="mobile"
                        type="tel"
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value);
                          clearMessages();
                        }}
                        placeholder="017XXXXXXXX"
                        autoComplete="tel"
                        disabled={otpSent}
                        className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 disabled:bg-slate-50 sm:text-base"
                      />
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      Enter the mobile number linked to your Sebaloy account.
                    </p>
                  </div>

                  {/* reCAPTCHA */}
                  {!otpSent && (
                    <div
                      id="recaptcha-container"
                      className="flex justify-center"
                    />
                  )}

                  {/* OTP */}
                  {otpSent && (
                    <>
                      <div>
                        <label
                          htmlFor="otp"
                          className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                          Verification Code
                        </label>

                        <input
                          id="otp"
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => {
                            setOtp(
                              e.target.value.replace(/\D/g, "")
                            );
                            clearMessages();
                          }}
                          placeholder="Enter 6-digit OTP"
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-center text-lg font-semibold tracking-[0.35em] text-slate-800 outline-none transition placeholder:text-slate-400 placeholder:tracking-normal focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="newPassword"
                          className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                          New Password
                        </label>

                        <div className="relative">
                          <input
                            id="newPassword"
                            type={
                              showNewPassword
                                ? "text"
                                : "password"
                            }
                            value={newPassword}
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                              clearMessages();
                            }}
                            placeholder="Enter new password"
                            autoComplete="new-password"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 pr-16 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 sm:text-base"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowNewPassword(
                                (prev) => !prev
                              )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100"
                          >
                            {showNewPassword
                              ? "Hide"
                              : "Show"}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                          Confirm Password
                        </label>

                        <div className="relative">
                          <input
                            id="confirmPassword"
                            type={
                              showConfirmPassword
                                ? "text"
                                : "password"
                            }
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(
                                e.target.value
                              );
                              clearMessages();
                            }}
                            placeholder="Confirm new password"
                            autoComplete="new-password"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 pr-16 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 sm:text-base"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(
                                (prev) => !prev
                              )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100"
                          >
                            {showConfirmPassword
                              ? "Hide"
                              : "Show"}
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {message && (
                    <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm leading-5 text-green-700">
                      ✓ {message}
                    </div>
                  )}

                  {error && (
                    <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                      ⚠ {error}
                    </div>
                  )}

                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={sendMobileOTP}
                      disabled={loading}
                      className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 py-3.5 font-semibold text-white shadow-md shadow-sky-200 transition hover:from-sky-700 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading
                        ? "Sending OTP..."
                        : "Send OTP"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={verifyOTP}
                      disabled={loading}
                      className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 py-3.5 font-semibold text-white shadow-md shadow-sky-200 transition hover:from-sky-700 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading
                        ? "Verifying..."
                        : "Verify & Reset Password"}
                    </button>
                  )}
                </div>
              )}

              {/* Back to Login */}
              <div className="mt-7 text-center">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-sky-600 transition hover:text-sky-700 hover:underline"
                >
                  ← Back to Sign In
                </Link>
              </div>
            </div>
          </section>

          {/* Trust */}
          <div className="mt-5 flex items-center justify-center gap-4 text-xs text-slate-400 sm:gap-6">
            <span>🔒 Secure Recovery</span>
            <span>•</span>
            <span>Trusted Care</span>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-slate-500 transition hover:text-sky-600"
            >
              ← Back to Sebaloy
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}