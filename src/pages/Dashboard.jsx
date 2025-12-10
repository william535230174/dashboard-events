import React, {useEffect, useState} from "react";
import PieChart from "../components/PieChart";
import defaultData from "../json/data.json";

export default function Dashboard() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("events");

        if (saved) {
            setEvents(JSON.parse(saved));
        } else {
            setEvents(defaultData.events);
        }
    }, []);

    const totalEvents = events.length;

    const finishedEvents = events.filter(e => e.status === "finished").length;
    const onGoingEvents = events.filter(e => e.status === "on going").length;
    const scheduledEvents = events.filter(e => e.status === "scheduled").length;

    const totalParticipants = events.reduce((acc, ev) => {
        return acc + (ev.participants?.length || 0);
    }, 0);

    const data = [
        {
            label: "Participants",
            value: totalParticipants,
            total: totalParticipants === 0 ? 1 : totalParticipants,
            color: "#4f46e5"
        },
        {
            label: "Finished Events",
            value: finishedEvents,
            total: totalEvents || 1,
            color: "#16a34a"
        },
        {
            label: "On Going Events",
            value: onGoingEvents,
            total: totalEvents || 1,
            color: "#ca8a04"
        },
        {
            label: "Scheduled Events",
            value: scheduledEvents,
            total: totalEvents || 1,
            color: "#dc2626"
        },
        {
            label: "All Events",
            value: totalEvents,
            total: totalEvents || 1,
            color: "#0ea5e9"
        }
    ];

    return (
        <div className = "animate-fadeIn">
            <h1 className = "text-3xl font-bold mb-5 tracking-wide animate-slideDown">
                Dashboard
            </h1>

            <div className = "grid grid-cols-2 md:grid-cols-5 gap-6">
                {data.map((d, i) => (
                    <div
                        key = {d.label}
                        className ="
                            p-6 bg-white shadow rounded-xl
                            transform transition duration-300
                            hover:scale-105 hover:shadow-xl
                            opacity-0 animate-card
                        "
                        style = {{animationDelay: `${i * 0.15}s`}}
                    >
                        <PieChart
                            value = {d.value}
                            total = {d.total}
                            color = {d.color}
                        />

                        <p className = "text-center mt-4 font-semibold tracking-wide">
                            {d.label}
                        </p>

                        <p className = "text-center text-gray-600 text-sm">
                            {d.value} total
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
