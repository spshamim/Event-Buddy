"use client";

import React, { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import {
    FaRegCalendarAlt,
    FaRegClock,
    FaChevronDown,
    FaUpload,
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

interface EventType {
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
}

interface EditEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: EventType | null;
    onSuccess: () => void;
}

const EditEventModal: React.FC<EditEventModalProps> = ({
    isOpen,
    onClose,
    event,
    onSuccess,
}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        totalSeats: "",
        tags: "",
    });
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title,
                description: event.description,
                date: new Date(event.date).toISOString().split("T")[0],
                time: event.time,
                location: event.location,
                totalSeats: event.totalSeats.toString(),
                tags: event.tags,
            });
            setImagePreview(event.image);
        }
    }, [event]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);

            // Preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImageToImgbb = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                formData
            );
            return response.data.data.display_url;
        } catch (error: any) {
            console.log(error);
            toast.error(`Error uploading image: ${error?.message}`);
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!event) return;

        if (
            formData.title === "" ||
            formData.description === "" ||
            formData.date === "" ||
            formData.time === "" ||
            formData.location === "" ||
            formData.totalSeats === "" ||
            formData.tags === ""
        ) {
            toast.error("Please fill all the fields");
            return;
        }

        // Validate title length
        if (formData.title.length < 6) {
            toast.error("Title must be at least 6 characters long");
            return;
        }

        // Validate description length
        if (formData.description.length < 6) {
            toast.error("Description must be at least 6 characters long");
            return;
        }

        // Validate tags format
        const tagsRegex = /^[a-zA-Z]+(?:,[a-zA-Z]+)*$/;
        if (!tagsRegex.test(formData.tags)) {
            toast.error(
                "Tags must be comma-separated words without spaces, numbers, or special characters"
            );
            return;
        }

        // Validate totalSeats
        const seatsRegex = /^\d+$/;
        if (!seatsRegex.test(formData.totalSeats)) {
            toast.error(
                "Total seats must be a number without any special characters or letters"
            );
            return;
        }

        // Validate time format
        const timeRegex =
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM) - ([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/;
        if (!timeRegex.test(formData.time)) {
            toast.error("Time must be in format: HH:MM AM - HH:MM PM");
            return;
        }

        // Validate image format
        const allowedFormats = [".jpg", ".jpeg", ".png"];
        const fileExtension = "." + image?.name.split(".").pop()?.toLowerCase();
        if (!allowedFormats.includes(fileExtension)) {
            toast.error("Only .jpg, .jpeg, and .png image formats are allowed");
            return;
        }

        // Validate image size (5MB = 5 * 1024 * 1024 bytes)
        const maxSize = 5 * 1024 * 1024;
        if (image && image.size > maxSize) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        setIsSubmitting(true);
        try {
            let imageUrl = event.image; // Keep existing image by default

            // If new image is selected, upload it
            if (image) {
                imageUrl = await uploadImageToImgbb(image);
            }

            await axiosInstance.patch(`/events/${event.id}`, {
                ...formData,
                totalSeats: parseInt(formData.totalSeats),
                image: imageUrl,
            });

            onSuccess();
            onClose();
            toast.success("Event updated successfully");
        } catch (error: any) {
            console.log(error);
            toast.error(
                `Error updating event: ${error.response?.data?.message}` ||
                    error?.message
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className={`fixed inset-0 z-[200000000] bg-[#0000002a] flex items-center justify-center transition-all duration-300 ${
                isOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
        >
            <div className="bg-white rounded-2xl w-[95%] max-w-xl p-6 my-12 relative shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
                <button
                    className="absolute top-4 right-4 text-2xl text-[#1a1446] hover:bg-[#f3f4ff] rounded-full p-1 transition"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <RxCross1 />
                </button>
                <h2 className="text-2xl font-semibold text-[#1a1446] mb-6">
                    Edit Event
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <div className="md:col-span-2">
                        <label className="block text-[#1a1446] mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border border-[#e0e2f1] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B8BFF]"
                        />
                    </div>
                    <div>
                        <label className="block text-[#1a1446] mb-1">
                            Date
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full border border-[#e0e2f1] rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#7B8BFF]"
                            />
                            <FaRegCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7B8BFF]" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[#1a1446] mb-1">
                            Time
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                placeholder="e.g. 09:00 AM - 11:00 AM"
                                className="w-full border border-[#e0e2f1] rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#7B8BFF]"
                            />
                            <FaRegClock className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7B8BFF]" />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[#1a1446] mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border border-[#e0e2f1] rounded-md px-4 py-2 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#7B8BFF]"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[#1a1446] mb-1">
                            Event Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full border border-[#e0e2f1] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B8BFF]"
                        />
                    </div>
                    <div>
                        <label className="block text-[#1a1446] mb-1">
                            Capacity
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                name="totalSeats"
                                value={formData.totalSeats}
                                onChange={handleChange}
                                min="1"
                                className="w-full border border-[#e0e2f1] rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#7B8BFF]"
                            />
                            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7B8BFF]" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[#1a1446] mb-1">
                            Tags (comma separated)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full border border-[#e0e2f1] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B8BFF]"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[#1a1446] mb-1">
                            Image
                        </label>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                {imagePreview ? (
                                    <div className="relative w-16 h-16">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                        <button
                                            type="button"
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                            onClick={() => {
                                                setImage(null);
                                                setImagePreview(null);
                                            }}
                                        >
                                            <RxCross1 size={12} />
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className="flex flex-col items-center justify-center border-2 border-dashed border-[#e0e2f1] rounded-full w-16 h-16 text-[#7B8BFF] cursor-pointer"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                    >
                                        <FaUpload size={28} />
                                    </div>
                                )}
                                <div className="text-xs text-[#6b6b8d]">
                                    Drag or{" "}
                                    <span
                                        className="text-[#7B8BFF] underline cursor-pointer"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                    >
                                        upload
                                    </span>{" "}
                                    the picture here
                                    <br />
                                    Max. 5MB | JPG, PNG
                                </div>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/png, image/jpeg"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <button
                                type="button"
                                className="px-4 py-2 rounded-md bg-[#f3f4ff] text-[#4157FE] font-semibold border border-[#e0e2f1] shadow-sm cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Browse
                            </button>
                            {image && (
                                <span className="text-xs text-[#1a1446]">
                                    {image.name}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            className="text-[#8b7fc7] font-semibold px-4 py-2 rounded-md hover:bg-[#f3f4ff] transition"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 rounded-md text-white font-semibold transition-colors shadow-md cursor-pointer disabled:opacity-50"
                            style={{
                                background:
                                    "linear-gradient(180deg, #7B8BFF 0%, #4157FE 100%)",
                                boxShadow:
                                    "0px 3.22px 3.34px 0px #FFFFFF40 inset, 0px -3.62px 1.61px 0px #4D3DEA inset",
                            }}
                        >
                            {isSubmitting ? "Updating..." : "Update Event"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEventModal;
