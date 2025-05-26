"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthCard from "../../components/AuthCard";
import { useAuth } from "../../components/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const { login, error, isAuthenticated, loading, user } = useAuth();

    useEffect(() => {
        if (isAuthenticated && user) {
            if (callbackUrl) {
                if (user.role === "admin") {
                    router.push("/admin/dashboard");
                    toast.success("Login successful");
                } else if (user.role === "user") {
                    router.push("/dashboard");
                    toast.success("Login successful");
                }
            } else if (user.role === "admin") {
                router.push("/admin/dashboard");
                console.log(user.role);
                toast.success("Login successful");
            } else if (user.role === "user") {
                router.push("/dashboard");
                console.log(user.role);
                toast.success("Login successful");
            }
        }
    }, [isAuthenticated, user, router, callbackUrl]);

    const validateForm = () => {
        if (email === "" || password === "") {
            toast.error("Please fill in all fields.");
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
        await login(email, password);
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
                        Sign in
                    </h2>
                    <div className="mb-4 text-sm">
                        <span className="text-[#6b6b8d]">New User? </span>
                        <Link
                            href="/signup"
                            className="text-[#6b47dc] underline"
                        >
                            Create an account
                        </Link>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
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
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </AuthCard>
            </main>
        </div>
    );
}
