import React, { useState } from "react";
import Image from "next/image";

const HeroSection = ({
    handleSearch,
}: {
    handleSearch: (query: string) => void;
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <section className="relative flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-b from-white to-[#eaeaff] overflow-hidden px-4 sm:px-6 lg:px-8 pb-10">
            {/* Left Ticket */}
            <div className="hidden md:block absolute left-0 top-24 md:top-45 md:left-10 z-10 rotate-[-15deg] scale-75 sm:scale-100">
                <Image
                    src="/OneWayTicket Left.png"
                    alt="One Way Ticket Left"
                    width={220}
                    height={100}
                    priority
                    className="drop-shadow-lg"
                />
            </div>
            {/* Right Ticket */}
            <div className="hidden md:block absolute right-0 top-32 md:top-45 md:right-10 z-10 rotate-[15deg] scale-75 sm:scale-100">
                <Image
                    src="/OneWayTicket Right.png"
                    alt="One Way Ticket Right"
                    width={220}
                    height={100}
                    priority
                    className="drop-shadow-lg"
                />
            </div>
            {/* Stars (decorative) */}
            <div className="absolute left-40 top-80 opacity-60 scale-75 sm:scale-150">
                <Image
                    src="/Star.png"
                    alt="Star"
                    width={80}
                    height={80}
                    className="drop-shadow-md"
                />
            </div>
            <div className="absolute right-40 top-80 opacity-60 scale-75 sm:scale-150">
                <Image
                    src="/Star.png"
                    alt="Star"
                    width={80}
                    height={80}
                    className="drop-shadow-md"
                />
            </div>
            {/* Headline */}
            <h1 className="text-4xl sm:text-[2.8rem] md:text-[4.5rem] font-extrabold text-center mt-16 leading-tight px-4">
                <span className="text-[#232252]">Discover </span>
                <span className="text-[#3B6BFF] drop-shadow font-extrabold">
                    Amazing
                </span>
                <span className="text-[#232252]"> Events</span>
            </h1>
            {/* Subheading */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-2xl text-center text-[#5B5B7B] max-w-2xl font-medium px-4">
                Find and book events that match your interests. From tech
                conferences to music festivals, we've got you covered.
            </p>
            {/* Search Bar */}
            <div className="mt-8 sm:mt-12 flex flex-col items-center w-full max-w-4xl px-4">
                <span className="mb-2 text-lg sm:text-xl font-semibold text-gray-800">
                    Find Your Next Event
                </span>
                <form
                    className="flex w-full max-w-xl bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E0E0FF]"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch(searchQuery);
                    }}
                >
                    <div className="flex items-center px-3 sm:px-4">
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-[#B3B3FF]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search events"
                        className="flex-1 py-3 sm:py-4 px-2 outline-none text-gray-700 bg-transparent placeholder:text-[#B3B3FF] text-base sm:text-lg w-1/2 sm:w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="rounded-none rounded-r-2xl bg-gradient-to-b from-[#7B8BFF] to-[#4157FE] hover:from-[#5B6BFF] hover:to-[#2B47FE] text-white px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold shadow transition-colors cursor-pointer"
                        style={{
                            boxShadow:
                                "0px 3.22px 3.34px 0px #FFFFFF40 inset, 0px -3.62px 1.61px 0px #4D3DEA inset",
                        }}
                    >
                        Search Events
                    </button>
                </form>
            </div>
            {/* grid background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <svg
                    width="100%"
                    height="100%"
                    className="opacity-20"
                    style={{ position: "absolute", inset: 0 }}
                >
                    <defs>
                        <pattern
                            id="grid"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="#b3b3ff"
                                strokeWidth="0.5"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;
