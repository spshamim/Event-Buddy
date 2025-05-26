"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { BiLogOut } from "react-icons/bi";
import { HiMenu, HiX } from "react-icons/hi";

const Header: React.FC = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="w-full py-4 px-4 md:px-8 flex items-center justify-between bg-[#f3f4ff] relative">
            <div className="flex items-center space-x-2">
                <Link
                    href="/"
                    className="flex items-center space-x-2 cursor-pointer"
                >
                    <Image
                        src="/logo.png"
                        alt="Event Buddy Logo"
                        width={32}
                        height={32}
                    />
                    <span className="font-bold text-xl md:text-2xl text-[#1a1446]">
                        Event buddy.
                    </span>
                </Link>
            </div>

            <button
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? (
                    <HiX className="w-6 h-6 text-[#1a1446]" />
                ) : (
                    <HiMenu className="w-6 h-6 text-[#1a1446]" />
                )}
            </button>

            <div className="hidden md:flex items-center space-x-3">
                {isAuthenticated ? (
                    <div className="flex items-center space-x-3">
                        <p className="text-base md:text-lg text-[#1a1446] font-semibold">
                            Hello, {user?.name}
                        </p>
                        <button
                            className="flex items-center gap-2 px-4 md:px-6 py-2 rounded-md text-white font-semibold transition-colors shadow-md cursor-pointer"
                            style={{
                                background:
                                    "linear-gradient(180deg, #7B8BFF 0%, #4157FE 100%)",
                                boxShadow:
                                    "0px 3.22px 3.34px 0px #FFFFFF40 inset, 0px -3.62px 1.61px 0px #4D3DEA inset",
                            }}
                            onClick={logout}
                        >
                            <BiLogOut /> Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-3">
                        <Link href="/signin">
                            <button
                                className="px-4 md:px-6 py-2 rounded-md text-white font-semibold transition-colors shadow-md cursor-pointer"
                                style={{
                                    background:
                                        "linear-gradient(180deg, #7B8BFF 0%, #4157FE 100%)",
                                    boxShadow:
                                        "0px 3.22px 3.34px 0px #FFFFFF40 inset, 0px -3.62px 1.61px 0px #4D3DEA inset",
                                }}
                            >
                                Sign in
                            </button>
                        </Link>
                        <Link href="/signup">
                            <button
                                className="px-4 md:px-6 py-2 rounded-md text-white font-semibold transition-colors shadow-md cursor-pointer"
                                style={{
                                    background:
                                        "linear-gradient(180deg, #7B8BFF 0%, #4157FE 100%)",
                                    boxShadow:
                                        "0px 3.22px 3.34px 0px #FFFFFF40 inset, 0px -3.62px 1.61px 0px #4D3DEA inset",
                                }}
                            >
                                Sign up
                            </button>
                        </Link>
                    </div>
                )}
            </div>

            {isMobileMenuOpen && (
                <div className="z-50 absolute top-full left-0 right-0 bg-[#f3f4ff] p-4 shadow-lg md:hidden">
                    {isAuthenticated ? (
                        <div className="flex flex-col space-y-4">
                            <p className="text-base text-[#1a1446] font-semibold">
                                Hello, {user?.name}
                            </p>
                            <button
                                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white font-semibold transition-colors shadow-md cursor-pointer w-full"
                                style={{
                                    background:
                                        "linear-gradient(180deg, #7B8BFF 0%, #4157FE 100%)",
                                    boxShadow:
                                        "0px 3.22px 3.34px 0px #FFFFFF40 inset, 0px -3.62px 1.61px 0px #4D3DEA inset",
                                }}
                                onClick={logout}
                            >
                                <BiLogOut /> Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-4">
                            <Link href="/signin" className="w-full">
                                <button
                                    className="w-full px-4 py-2 rounded-md text-white font-semibold transition-colors shadow-md cursor-pointer"
                                    style={{
                                        background:
                                            "linear-gradient(180deg, #7B8BFF 0%, #4157FE 100%)",
                                        boxShadow:
                                            "0px 3.22px 3.34px 0px #FFFFFF40 inset, 0px -3.62px 1.61px 0px #4D3DEA inset",
                                    }}
                                >
                                    Sign in
                                </button>
                            </Link>
                            <Link href="/signup" className="w-full">
                                <button
                                    className="w-full px-4 py-2 rounded-md text-white font-semibold transition-colors shadow-md cursor-pointer"
                                    style={{
                                        background:
                                            "linear-gradient(180deg, #7B8BFF 0%, #4157FE 100%)",
                                        boxShadow:
                                            "0px 3.22px 3.34px 0px #FFFFFF40 inset, 0px -3.62px 1.61px 0px #4D3DEA inset",
                                    }}
                                >
                                    Sign up
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
