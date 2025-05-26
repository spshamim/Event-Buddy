"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthCard from "../../components/AuthCard";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosInstance from "../../lib/axios";

export default function SignUpPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const validateForm = () => {
        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            password === ""
        ) {
            toast.error("Please fill in all fields.");
            return false;
        }

        if (firstName.length < 3 || lastName.length < 3) {
            toast.error(
                "First and last name must be at least 3 characters long."
            );
            return false;
        }

        const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;

        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            toast.error(
                "First and last name can only contain letters and spaces (no numbers, special characters, or trailing/leading spaces)."
            );
            return false;
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
            toast.error(
                "Password must contain at least one uppercase and one lowercase letter and be at least 6 characters long."
            );
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error(
                "Please enter a valid email address. (i.e. user@example.com)"
            );
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        setError("");
        try {
            await axiosInstance.post("/users", {
                firstName,
                lastName,
                email,
                password,
            });
            router.push("/signin");
            toast.success("Registration successful. Please sign in.");
        } catch (error: any) {
            setError(`Registration failed: ${error.response?.data?.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f3f4ff] flex flex-col">
            <header className="w-full py-6 px-8">
                <div className="flex items-center space-x-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/logo.png"
                            alt="Event Buddy Logo"
                            width={32}
                            height={32}
                        />
                        <span className="font-bold text-xl text-[#1a1446]">
                            Event buddy.
                        </span>
                    </Link>
                </div>
            </header>
            <main className="flex-1 flex items-center justify-center">
                <AuthCard>
                    <h2 className="text-2xl font-semibold text-[#1a1446] mb-2">
                        Sign Up
                    </h2>
                    <div className="mb-4 text-sm">
                        <span className="text-[#6b6b8d]">
                            Already have an account?{" "}
                        </span>
                        <Link
                            href="/signin"
                            className="text-[#6b47dc] underline"
                        >
                            Sign in
                        </Link>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label
                                    htmlFor="firstName"
                                    className="block text-[#1a1446] mb-1"
                                >
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md bg-[#f8f8ff] placeholder-[#b0b0c3] focus:outline-none focus:ring-2 focus:ring-[#6b47dc]"
                                    placeholder="e.g. John"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex-1">
                                <label
                                    htmlFor="lastName"
                                    className="block text-[#1a1446] mb-1"
                                >
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md bg-[#f8f8ff] placeholder-[#b0b0c3] focus:outline-none focus:ring-2 focus:ring-[#6b47dc]"
                                    placeholder="e.g. Doe"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-[#1a1446] mb-1"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-4 py-2 border border-gray-200 rounded-md bg-[#f8f8ff] placeholder-[#b0b0c3] focus:outline-none focus:ring-2 focus:ring-[#6b47dc]"
                                placeholder="enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-[#1a1446] mb-1"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="w-full px-4 py-2 border border-gray-200 rounded-md bg-[#f8f8ff] placeholder-[#b0b0c3] focus:outline-none focus:ring-2 focus:ring-[#6b47dc]"
                                placeholder="enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}
                        <button
                            type="submit"
                            className="w-full py-2 rounded-md text-white font-semibold transition-colors disabled:opacity-60 shadow-md cursor-pointer"
                            style={{
                                background:
                                    "linear-gradient(180deg, #7B8BFF 0%, #4157FE 100%)",
                                boxShadow:
                                    "0px 3.22px 3.34px 0px #FFFFFF40 inset, 0px -3.62px 1.61px 0px #4D3DEA inset",
                            }}
                            disabled={loading}
                        >
                            {loading ? "Signing up..." : "Sign up"}
                        </button>
                    </form>
                </AuthCard>
            </main>
        </div>
    );
}
