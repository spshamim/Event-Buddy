"use client";
import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import axiosInstance from "../lib/axios";

interface Event {
    id: string;
    image: string;
    title: string;
    description: string;
    date: Date | string;
    time: string;
    location: string;
    tags: string;
    availableSeats: number;
    totalSeats: number;
}

export default function HomePage() {
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [pastEvents, setPastEvents] = useState<Event[]>([]);
    const [currentUpcomingPage, setCurrentUpcomingPage] = useState(1);
    const [currentPastPage, setCurrentPastPage] = useState(1);
    const eventsPerPage = 6;

    // state for search results
    const [searchResultsUpcoming, setSearchResultsUpcoming] = useState<
        Event[] | null
    >(null);
    const [searchResultsPast, setSearchResultsPast] = useState<Event[] | null>(
        null
    );

    // filter by event title
    const handleSearch = (query: string) => {
        if (!query.trim()) {
            setSearchResultsUpcoming(null);
            setSearchResultsPast(null);
            return;
        }
        const lowerQuery = query.toLowerCase();
        setSearchResultsUpcoming(
            upcomingEvents.filter((event) =>
                event.title.toLowerCase().includes(lowerQuery)
            )
        );
        setSearchResultsPast(
            pastEvents.filter((event) =>
                event.title.toLowerCase().includes(lowerQuery)
            )
        );
        setCurrentUpcomingPage(1);
        setCurrentPastPage(1);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axiosInstance.get("/events/upcoming");
            setUpcomingEvents(response.data);
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axiosInstance.get("/events/past");
            setPastEvents(response.data);
        };
        fetchEvents();
    }, []);

    // Calculation of pagination for upcoming events
    const indexOfLastUpcomingEvent = currentUpcomingPage * eventsPerPage;
    const indexOfFirstUpcomingEvent = indexOfLastUpcomingEvent - eventsPerPage;
    const filteredUpcoming = searchResultsUpcoming ?? upcomingEvents;
    const currentUpcomingEvents = filteredUpcoming.slice(
        indexOfFirstUpcomingEvent,
        indexOfLastUpcomingEvent
    );
    const totalUpcomingPages = Math.ceil(
        filteredUpcoming.length / eventsPerPage
    );

    // Calculation of pagination for past events
    const indexOfLastPastEvent = currentPastPage * eventsPerPage;
    const indexOfFirstPastEvent = indexOfLastPastEvent - eventsPerPage;
    const filteredPast = searchResultsPast ?? pastEvents;
    const currentPastEvents = filteredPast.slice(
        indexOfFirstPastEvent,
        indexOfLastPastEvent
    );
    const totalPastPages = Math.ceil(filteredPast.length / eventsPerPage);

    const handleUpcomingPageChange = (pageNumber: number) => {
        setCurrentUpcomingPage(pageNumber);
    };

    const handlePastPageChange = (pageNumber: number) => {
        setCurrentPastPage(pageNumber);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <HeroSection handleSearch={handleSearch} />
            <main className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4 sm:mb-6">
                        Upcoming Events
                    </h2>

                    {currentUpcomingEvents.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                                {currentUpcomingEvents.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                            {/* Upcoming Events Pagination */}
                            <div className="flex justify-center mt-4 sm:mt-6 gap-1 sm:gap-2">
                                {Array.from(
                                    { length: totalUpcomingPages },
                                    (_, i) => i + 1
                                ).map((number) => (
                                    <button
                                        key={number}
                                        onClick={() =>
                                            handleUpcomingPageChange(number)
                                        }
                                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base ${
                                            currentUpcomingPage === number
                                                ? "bg-blue-600 text-white"
                                                : "bg-white text-blue-600 hover:bg-blue-100"
                                        }`}
                                    >
                                        {number}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-32 sm:h-40">
                            <p className="text-gray-500 text-sm sm:text-base">
                                No upcoming events
                            </p>
                        </div>
                    )}

                    <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mt-8 sm:mt-10 mb-4 sm:mb-6">
                        Past Events
                    </h2>

                    {currentPastEvents.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                                {currentPastEvents.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                            {/* Past Events Pagination */}
                            <div className="flex justify-center mt-4 sm:mt-6 gap-1 sm:gap-2">
                                {Array.from(
                                    { length: totalPastPages },
                                    (_, i) => i + 1
                                ).map((number) => (
                                    <button
                                        key={number}
                                        onClick={() =>
                                            handlePastPageChange(number)
                                        }
                                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base ${
                                            currentPastPage === number
                                                ? "bg-blue-600 text-white"
                                                : "bg-white text-blue-600 hover:bg-blue-100"
                                        }`}
                                    >
                                        {number}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-32 sm:h-40">
                            <p className="text-gray-500 text-sm sm:text-base">
                                No past events
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
