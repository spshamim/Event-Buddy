"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import CreateEventModal from "../../../components/CreateEventModal";
import EditEventModal from "../../../components/EditEventModal";
import DeleteModal from "../../../components/DeleteModal";
import PrivateRoute from "../../../components/PrivateRoute";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

type EventType = {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    availableSeats: number;
    totalSeats: number;
    time: string;
    tags: string;
    image: string;
};

const AdminDashboardPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [eventToEdit, setEventToEdit] = useState<EventType | null>(null);
    const [eventToDelete, setEventToDelete] = useState<EventType | null>(null);
    const [eventsState, setEventsState] = useState<EventType[]>([]);

    const fetchEvents = async () => {
        try {
            const response = await axiosInstance.get("/events");
            const data = response.data;
            setEventsState(data);
        } catch (error: any) {
            toast.error(
                `Error fetching events: ${error.response?.data?.message}`
            );
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async () => {
        if (!eventToDelete) return;

        try {
            await axiosInstance.delete(`/events/${eventToDelete.id}`);
            setEventsState((prev) =>
                prev.filter((event) => event.id !== eventToDelete.id)
            );
            setIsDeleteModalOpen(false);
            setEventToDelete(null);
            toast.success("Event deleted successfully");
        } catch (error: any) {
            toast.error(
                `Error deleting event: ${error.response?.data?.message}`
            );
        }
    };

    return (
        <PrivateRoute>
            <div className="min-h-screen flex flex-col bg-white-100">
                <Header />
                <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
                    <h1 className="text-3xl font-bold text-[#1a1446] mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-lg text-[#8b7fc7] mb-8">
                        Manage events, view registrations, and monitor your
                        platform.
                    </p>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-[#1a1446]">
                            Events Management
                        </h2>
                        <button
                            className="px-6 py-2 rounded-md text-white font-semibold transition-colors shadow-md cursor-pointer"
                            style={{
                                background:
                                    "linear-gradient(180deg, #7B8BFF 0%, #4157FE 100%)",
                                boxShadow:
                                    "0px 3.22px 3.34px 0px #FFFFFF40 inset, 0px -3.62px 1.61px 0px #4D3DEA inset",
                            }}
                            onClick={() => setIsModalOpen(true)}
                        >
                            Create Event
                        </button>
                    </div>
                    <div className="overflow-x-auto bg-white rounded-xl border border-[#e0e2f1]">
                        <table className="min-w-full text-left">
                            <thead className="bg-slate-100">
                                <tr className="text-[#1a1446] text-base border-b border-[#e0e2f1]">
                                    <th className="py-3 px-6 font-semibold">
                                        Title
                                    </th>
                                    <th className="py-3 px-6 font-semibold">
                                        Date
                                    </th>
                                    <th className="py-3 px-6 font-semibold">
                                        Location
                                    </th>
                                    <th className="py-3 px-6 font-semibold">
                                        Seats
                                    </th>
                                    <th className="py-3 px-6 font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventsState.length > 0 ? (
                                    <>
                                        {eventsState.map((event) => (
                                            <tr
                                                key={event.id}
                                                className="border-b border-[#e0e2f1] last:border-b-0 hover:bg-[#f7f8fd]"
                                            >
                                                <td className="py-3 px-6">
                                                    {event.title}
                                                </td>
                                                <td className="py-3 px-6">
                                                    {new Date(
                                                        event.date
                                                    ).toLocaleString("en-US", {
                                                        weekday: "long",
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </td>
                                                <td className="py-3 px-6">
                                                    {event.location}
                                                </td>
                                                <td className="py-3 px-6">
                                                    {event.availableSeats}/
                                                    {event.totalSeats}
                                                </td>
                                                <td className="py-3 px-6">
                                                    <div className="flex items-center space-x-4">
                                                        <button
                                                            className="text-[#6b6b8d] hover:text-[#4157FE]"
                                                            title="View"
                                                        >
                                                            <FaEye size={18} />
                                                        </button>
                                                        <button
                                                            className="text-[#6b6b8d] hover:text-[#4157FE]"
                                                            title="Edit"
                                                            onClick={() => {
                                                                setEventToEdit(
                                                                    event
                                                                );
                                                                setIsEditModalOpen(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            <FaEdit size={18} />
                                                        </button>
                                                        <button
                                                            className="text-[#ff5c5c] hover:text-[#e04a4a]"
                                                            title="Delete"
                                                            onClick={() => {
                                                                setEventToDelete(
                                                                    event
                                                                );
                                                                setIsDeleteModalOpen(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            <FaTrash
                                                                size={18}
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="py-3 px-6 text-center text-gray-600"
                                        >
                                            No events found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <CreateEventModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={() => {
                            setIsModalOpen(false);
                            fetchEvents();
                        }}
                    />
                    <EditEventModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        event={eventToEdit}
                        onSuccess={() => {
                            setIsEditModalOpen(false);
                            fetchEvents();
                        }}
                    />
                    <DeleteModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => {
                            setIsDeleteModalOpen(false);
                            setEventToDelete(null);
                        }}
                        onDelete={handleDelete}
                    />
                </main>
                <Footer />
            </div>
        </PrivateRoute>
    );
};

export default AdminDashboardPage;
