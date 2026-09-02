"use client";

import { useEffect, useState } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function UserIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c.8-3.5 3.1-5.5 7-5.5s6.2 2 7 5.5" strokeLinecap="round" />
        </svg>
    );
}

function CameraIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
            <path d="M4 7h3l1.5-2h7L17 7h3v12H4V7Z" strokeLinejoin="round" />
            <circle cx="12" cy="13" r="3.5" />
        </svg>
    );
}

function SaveIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
            <path d="M5 4h12l2 2v14H5V4Z" strokeLinejoin="round" />
            <path d="M8 4v5h8V4M8 20v-6h8v6" strokeLinecap="round" />
        </svg>
    );
}

export default function ProfilePage() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const user = auth.currentUser;

        if (!user) return;

        const uid = user.uid;
        setEmail(user.email || "");

        async function loadProfile() {
            const profileRef = doc(db, "users", uid);
            const snap = await getDoc(profileRef);
            if (snap.exists()) {
                setName(snap.data().name || "");
                setPhone(snap.data().phone || "");
                setPhotoURL(snap.data().photoURL || "");
            }
        }

        loadProfile();
    }, []);

    async function saveProfile() {
        const user = auth.currentUser;

        if (!user) {
            alert("Please login first.");
            return;
        }

        if (saving) return;

        if (!name.trim() || !phone.trim()) {
            alert("Please enter your name and phone number.");
            return;
        }

        setSaving(true);

        try {
            const uid = user.uid;
            let imageUrl = photoURL;

            if (imageFile) {
                const imageRef = ref(storage, `profiles/${uid}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
            }

            await setDoc(
                doc(db, "users", uid),
                {
                    uid,
                    email: user.email,
                    name: name.trim(),
                    phone: phone.trim(),
                    photoURL: imageUrl,
                },
                { merge: true }
            );

            setPhotoURL(imageUrl);
            setImageFile(null);
            alert("Profile updated successfully.");
        } catch (error) {
            console.error("Profile update error:", error);
            alert("Could not update your profile. Please try again.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

                {/* Premium Profile Header */}
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-700 via-cyan-600 to-teal-500 text-white shadow-lg">
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
                    <div className="absolute -bottom-24 left-1/3 w-72 h-72 rounded-full bg-white/5" />

                    <div className="relative z-10 flex items-center gap-4 px-6 sm:px-8 py-6 sm:py-7">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center">
                            <UserIcon />
                        </div>

                        <div>
                            <p className="text-sm text-white/80 font-medium">
                                Account information
                            </p>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                My Profile
                            </h1>
                            <p className="mt-1 text-sm text-white/85">
                                Update your personal information
                            </p>
                        </div>
                    </div>
                </section>

                {/* Profile Card */}
                <section className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 sm:p-8">

                        {/* Profile Photo */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-7 border-b border-slate-100">
                            <div className="relative">
                                {photoURL ? (
                                    <img
                                        src={photoURL}
                                        alt="Profile"
                                        onError={() => setPhotoURL("")}
                                        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg ring-2 ring-teal-100 bg-slate-100"
                                    />
                                ) : (
                                    <div
                                        aria-label="Profile"
                                        className="w-28 h-28 rounded-full border-4 border-white shadow-lg ring-2 ring-teal-100 bg-slate-50 text-teal-600 flex items-center justify-center"
                                    >
                                        <UserIcon />
                                    </div>
                                )}

                                <label className="absolute right-0 bottom-0 w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center cursor-pointer shadow-md hover:bg-teal-700 transition">
                                    <CameraIcon />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                const file = e.target.files[0];
                                                setImageFile(file);
                                                setPhotoURL(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                </label>
                            </div>

                            <div className="text-center sm:text-left">
                                <h2 className="text-xl font-bold text-slate-800">
                                    Profile Photo
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Upload a clear photo for your account.
                                </p>

                                {imageFile && (
                                    <p className="mt-2 text-xs font-medium text-teal-600">
                                        New photo selected: {imageFile.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Form */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-7">

                            <label className="block">
                                <span className="text-sm font-semibold text-slate-700">
                                    Full Name
                                </span>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1.5 w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                                    placeholder="Enter your full name"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-semibold text-slate-700">
                                    Phone
                                </span>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="mt-1.5 w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                                    placeholder="01XXXXXXXXX"
                                    inputMode="numeric"
                                />
                            </label>

                            <label className="block sm:col-span-2">
                                <span className="text-sm font-semibold text-slate-700">
                                    Email
                                </span>
                                <input
                                    value={email}
                                    disabled
                                    className="mt-1.5 w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-100 text-slate-500 cursor-not-allowed"
                                />
                                <p className="mt-1.5 text-xs text-slate-400">
                                    Email is linked to your account and cannot be edited here.
                                </p>
                            </label>

                        </div>

                        {/* Save */}
                        <div className="mt-7 pt-6 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={saveProfile}
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-7 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <SaveIcon />
                                {saving ? "Saving..." : "Save Profile"}
                            </button>
                        </div>

                    </div>
                </section>

            </div>
        </main>
    );
}
