"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-[#f3f4ff] pt-4 sm:pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 pb-2">
                <div className="flex items-center space-x-2 mb-3 md:mb-0">
                    <Image
                        src="/logo.png"
                        alt="Event Buddy Logo"
                        width={24}
                        height={24}
                        className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                    <span className="font-bold text-base sm:text-lg text-[#1a1446]">
                        Event buddy.
                    </span>
                </div>
                <nav className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-[#1a1446] text-xs sm:text-sm font-medium">
                    <Link
                        href="/"
                        className="hover:text-blue-600 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/signin"
                        className="hover:text-blue-600 transition-colors"
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/signup"
                        className="hover:text-blue-600 transition-colors"
                    >
                        Sign up
                    </Link>
                    <Link
                        href="/privacy-policy"
                        className="hover:text-blue-600 transition-colors"
                    >
                        Privacy Policy
                    </Link>
                </nav>
            </div>
            <hr className="border-t border-[#e0e2f1] mx-4 sm:mx-6 md:mx-8" />
            <div className="text-center text-[#444] text-xs sm:text-sm py-3 sm:py-4">
                © {new Date().getFullYear()} Event buddy. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
