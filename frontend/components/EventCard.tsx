import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface EventCardProps {
    event: {
        id: string;
        image: string;
        title: string;
        description: string;
        date: string | Date;
        time: string;
        location: string;
        tags: string;
        availableSeats: number;
        totalSeats: number;
    };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const router = useRouter();

    // Parse date
    const dateObj = new Date(event.date);
    const month = dateObj
        .toLocaleString("en-US", { month: "short" })
        .toUpperCase();
    const day = dateObj.getDate();
    // Parse tags
    const tags = Array.isArray(event.tags)
        ? event.tags
        : event.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean);
    return (
        <div
            className="bg-white overflow-hidden w-full max-w-sm border border-gray-100 relative p-0 hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => {
                router.push(`/events/${event.id}`);
            }}
            style={{
                clipPath:
                    "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
            }}
        >
            {/* Event Image */}
            <div className="w-full h-32 sm:h-40 relative">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            {/* Card Content */}
            <div className="p-3 sm:p-5 pb-2 sm:pb-3 bg-white">
                {/* Date and Title */}
                <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex flex-col items-center justify-center min-w-[36px] sm:min-w-[40px]">
                        <span className="text-[10px] sm:text-xs font-bold text-blue-700 leading-none">
                            {month}
                        </span>
                        <span className="text-xl sm:text-2xl font-extrabold text-blue-900 leading-none">
                            {day}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-blue-900 leading-tight">
                            {event.title}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">
                            {event.description}
                        </p>
                    </div>
                </div>
                {/* Details Row */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4">
                    <div className="flex items-center gap-1">
                        <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 7V3M16 7V3M4 11H20M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" />
                        </svg>
                        {dateObj.toLocaleString("en-US", { weekday: "long" })}
                    </div>
                    <div className="flex items-center gap-1">
                        <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                        {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                        <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.657 16.657L13.414 12.414A6 6 0 1 0 12.414 13.414l4.243 4.243a1 1 0 0 0 1.414-1.414z" />
                        </svg>
                        <span className="line-clamp-1">{event.location}</span>
                    </div>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                    {tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-semibold"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            {/* Spots/Seats Info */}
            <div className="flex justify-between items-center px-3 sm:px-5 py-2 sm:py-3 border-t border-gray-100 bg-white text-[10px] sm:text-xs text-gray-500 font-semibold">
                <span className="flex items-center gap-1">
                    <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <rect x="3" y="7" width="18" height="13" rx="2" />
                        <path d="M16 3v4M8 3v4" />
                    </svg>
                    {event.availableSeats} Spots Left
                </span>
                <span>Total {event.totalSeats} Seats</span>
            </div>
            {/* Glow effect */}
            <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                    boxShadow:
                        "0 8px 32px 0 rgba(99,102,241,0.25), 0 1.5px 8px 0 rgba(99,102,241,0.10)",
                }}
            />
        </div>
    );
};

export default EventCard;
