"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useAuth } from "../../components/AuthContext";
import PrivateRoute from "../../components/PrivateRoute";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axios";

interface Event {
    id: string;
    event: {
        title: string;
        date: string;
        location: string;
        time: string;
    };
}

const DashboardPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const router = useRouter();

    const handleCancelRegistration = async (eventId: string) => {
        try {
            await axiosInstance.delete(`/bookings/${eventId}`);
            setEvents(events.filter((event) => event.id !== eventId));
            toast.success("Registration cancelled successfully");
        } catch (error: any) {
            toast.error(
                `Error canceling registration: ${error.response?.data?.message}`
            );
        }
    };

    useEffect(() => {
        try {
            const fetchEvents = async () => {
                const response = await axiosInstance.get(
                    "/bookings/my-bookings"
                );
                setEvents(response.data);
            };
            fetchEvents();
        } catch (error: any) {
            toast.error(
                `Error fetching events: ${error.response?.data?.message}`
            );
        }
    }, []);

    const { user } = useAuth();

    return (
        <PrivateRoute>
            <div className="min-h-screen flex flex-col bg-white">
                <Header />
                <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
                    <h1 className="text-3xl font-bold text-[#1a1446] mb-2">
                        Dashboard
                    </h1>
                    <p className="text-lg text-[#8b7fc7] mb-8">
                        Welcome back, {user?.name}! Here you can manage your
                        event registrations.
                    </p>
                    <h2 className="text-xl font-semibold text-[#1a1446] mb-4">
                        My Registered Events
                    </h2>
                    <div className="space-y-4 mb-8">
                        {events.length > 0 ? (
                            <>
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex sm:flex-row flex-col gap-4 sm:gap-0items-center justify-between bg-white rounded-xl border border-[#e0e2f1] px-6 py-4 shadow-sm"
                                    >
                                        <div className="flex items-center">
                                            <div className="flex flex-col items-center justify-center mr-6">
                                                <span className="text-xs font-bold text-[#7b8bff] uppercase">
                                                    {new Date(
                                                        event.event.date
                                                    ).toLocaleString("en-US", {
                                                        month: "short",
                                                    })}
                                                </span>
                                                <span className="text-4xl font-extrabold text-[#1a1446] leading-none">
                                                    {new Date(
                                                        event.event.date
                                                    ).getDate()}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-lg text-[#1a1446] mb-1">
                                                    {event.event.title}
                                                </div>
                                                <div className="flex flex-wrap items-center text-[#6b6b8d] text-sm space-x-4">
                                                    <span className="flex items-center">
                                                        <FaCalendarAlt className="mr-1" />
                                                        {new Date(
                                                            event.event.date
                                                        ).toLocaleString(
                                                            "en-US",
                                                            {
                                                                weekday: "long",
                                                            }
                                                        )}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <FaClock className="mr-1" />
                                                        {event.event.time}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <FaMapMarkerAlt className="mr-1" />
                                                        {event.event.location}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="px-5 py-2 rounded-md text-white font-semibold bg-[#ff5c5c] hover:bg-[#e04a4a] transition-colors shadow-sm cursor-pointer text-sm"
                                            onClick={() =>
                                                handleCancelRegistration(
                                                    event.id
                                                )
                                            }
                                        >
                                            Cancel registration
                                        </button>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p className="text-center text-lg text-[#8b7fc7]">
                                No registered events
                            </p>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="px-8 py-2 rounded-md text-white font-semibold transition-colors shadow-md cursor-pointer"
                            style={{
                                background:
                                    "linear-gradient(180deg, #7B8BFF 0%, #4157FE 100%)",
                                boxShadow:
                                    "0px 3.22px 3.34px 0px #FFFFFF40 inset, 0px -3.62px 1.61px 0px #4D3DEA inset",
                            }}
                            onClick={() => router.push("/")}
                        >
                            Browse more events
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        </PrivateRoute>
    );
};

export default DashboardPage;
