import React from "react";
import PieChart from "../components/PieChart";

export default function Dashboard() { 
    const data = [
        {label: "Participant", value: 40, color: "#4f46e5"}, 
        {label: "Event", value: 30, color: "#16a34a"}, 
        {label: "Transaction", value: 20, color: "#dc2626"}, 
        {label: "Feedback", value: 10, color: "#ca8a04"} 
    ]; 

    return ( 
        <div className = "animate-fadeIn">
            <h1 className = "text-3xl font-bold mb-5 tracking-wide animate-slideDown">
                Dashboard
            </h1>

            <div className = "grid grid-cols-2 md:grid-cols-4 gap-6">
                {data.map((d, i) => (
                    <div 
                        key = {d.label} 
                        className ="
                            p-4 bg-white shadow rounded 
                            transform transition duration-300 
                            hover:scale-105 hover:shadow-lg
                            opacity-0 animate-card
                        "
                        style = {{ animationDelay: `${i * 0.15}s` }}
                    >
                        <PieChart percent={d.value} color={d.color} />

                        <p className = "text-center mt-2 font-semibold tracking-wide">
                            {d.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    ); 
}
