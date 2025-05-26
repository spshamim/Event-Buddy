"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaChair,
} from "react-icons/fa";
import { useParams, usePathname, useRouter } from "next/navigation";
import axiosInstance from "../../../lib/axios";
import { useAuth } from "../../../components/AuthContext";
import toast from "react-hot-toast";

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    image: string;
    tags: string;
    description: string;
    availableSeats: number;
    totalSeats: number;
}

const seatOptions = [1, 2, 3, 4];

const EventDetailsPage = () => {
    const [event, setEvent] = useState<Event | null>(null);
    const [selectedSeats, setSelectedSeats] = useState(1);
    const { id } = useParams();
    const router = useRouter();

    const { user } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await axiosInstance.get(`/events/${id}`);
            setEvent(response.data);
        };
        fetchEvent();
    }, [id]);

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col bg-[#f3f4ff]">
                <Header />
                <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
                    <div>Loading...</div>
                </main>
                <Footer />
            </div>
        );
    }

    // Parse tags
    const tags = event.tags
        ? event.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
        : [];

    // Parse date
    const dateObj = new Date(event.date);

    const handleBooking = async () => {
        try {
            if (!user) {
                router.push(
                    `/signin?callbackUrl=${encodeURIComponent(pathname)}`
                );
                toast.error("Please login to book a seat");
                return;
            }

            if (event.availableSeats < selectedSeats) {
                toast.error("Not enough seats available");
                return;
            }

            await axiosInstance.post("/bookings", {
                eventId: event.id,
                numberOfSeats: selectedSeats,
            });
            router.push("/dashboard");
            toast.success("Booking successful");
        } catch (error: any) {
            toast.error(`Booking failed: ${error.response?.data?.message}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f3f4ff]">
            <Header />
            <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
                <Link
                    href="/"
                    className="flex items-center text-[#6b6b8d] mb-4 hover:underline"
                >
                    <IoArrowBackCircleOutline className="text-2xl mr-2" /> Back
                    to event
                </Link>
                <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden mb-6 relative">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-indigo-100 text-[#4157FE] text-xs px-3 py-1 rounded-lg font-semibold"
                        >
                            ● {tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#1a1446] mb-4">
                    {event.title}
                </h1>
                <div className="bg-white rounded-xl border border-[#e0e2f1] px-6 py-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Date */}
                    <div className="flex items-center gap-4 flex-1 min-w-[180px]">
                        <FaCalendarAlt className="text-2xl text-[#6778f6]" />
                        <div>
                            <div className="text-[#6b6b8d] text-sm font-medium">
                                Date
                            </div>
                            <div className="text-[#6b6b8d] font-semibold text-base">
                                {dateObj.toLocaleString("en-US", {
                                    weekday: "long",
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </div>
                        </div>
                    </div>
                    {/* Time */}
                    <div className="flex items-center gap-4 flex-1 min-w-[180px]">
                        <FaClock className="text-2xl text-[#6778f6]" />
                        <div>
                            <div className="text-[#6b6b8d] text-sm font-medium">
                                Time
                            </div>
                            <div className="text-[#6b6b8d] font-semibold text-base">
                                {event.time}
                            </div>
                        </div>
                    </div>
                    {/* Location */}
                    <div className="flex items-center gap-4 flex-1 min-w-[180px]">
                        <FaMapMarkerAlt className="text-2xl text-[#6778f6]" />
                        <div>
                            <div className="text-[#6b6b8d] text-sm font-medium">
                                Location
                            </div>
                            <div className="text-[#6b6b8d] font-semibold text-base">
                                <a href="#" className="hover:underline">
                                    {event.location}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Seat Selection */}
                <div className="bg-white rounded-xl border border-[#e0e2f1] p-6 mb-8">
                    <div className="font-semibold text-[#1a1446] mb-4">
                        Select Number of Seats
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 w-full">
                        {seatOptions.map((num) => (
                            <button
                                key={num}
                                className={`flex flex-col cursor-pointer items-center px-6 py-4 border rounded-lg transition-all duration-150 ${
                                    selectedSeats === num
                                        ? "border-[#4157FE] bg-[#f3f4ff] shadow-md"
                                        : "border-[#e0e2f1] bg-white"
                                }`}
                                onClick={() => setSelectedSeats(num)}
                            >
                                <FaChair className="mb-1 text-lg" />
                                <span className="font-bold text-[#1a1446]">
                                    {num}
                                </span>
                                <span className="text-xs text-[#6b6b8d]">
                                    {num === 1 ? "Seat" : "Seats"}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-center items-center">
                        {event.date > new Date().toISOString() ? (
                            <button
                                className="px-6 py-2 rounded-md text-white font-semibold transition-colors shadow-md cursor-pointer"
                                style={{
                                    background:
                                        "linear-gradient(180deg, #7B8BFF 0%, #4157FE 100%)",
                                    boxShadow:
                                        "0px 3.22px 3.34px 0px #FFFFFF40 inset, 0px -3.62px 1.61px 0px #4D3DEA inset",
                                }}
                                onClick={handleBooking}
                            >
                                Book {selectedSeats}{" "}
                                {selectedSeats === 1 ? "Seat" : "Seats"}
                            </button>
                        ) : (
                            <button
                                className="px-6 py-2 rounded-md text-black bg-red-200 font-semibold transition-colors shadow-md cursor-not-allowed"
                                disabled
                            >
                                Event is over
                            </button>
                        )}
                    </div>
                </div>
                {/* About Section */}
                <div className="mb-8">
                    <div className="font-semibold text-[#1a1446] mb-2">
                        About this event
                    </div>
                    <div className="text-[#8570AD] whitespace-pre-line text-sm md:text-base">
                        {event.description}
                    </div>
                </div>
                {/* Spots Left Bar */}
                <div className="flex items-center gap-3 text-[#4157FE] font-semibold bg-white rounded-xl border border-[#e0e2f1] p-4 mb-8">
                    <FaChair className="text-2xl text-[#8570AD]" />
                    <span className="text-[#8570AD] text-2xl">
                        {event.availableSeats} Spots Left
                    </span>
                    <span className="text-[#6b6b8d] ml-1 text-lg font-semibold">
                        ({event.totalSeats - event.availableSeats} registered)
                    </span>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default EventDetailsPage;
