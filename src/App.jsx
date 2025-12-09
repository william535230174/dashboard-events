import React from "react";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EventList from "./pages/EventList";
import EventTransaction from "./pages/EventTransaction";
import Sidebar from "./components/Sidebar";

export default function App() {
    const [page, setPage] = useState("login");
    const [isLogged, setIsLogged] = useState(false);

    if (!isLogged) return <Login onLogin={() => { setIsLogged(true); setPage("dashboard"); }} />;

    return (
        <div className="flex h-screen bg-gray-100">
        <Sidebar onNavigate={setPage} onLogout={() => setIsLogged(false)} />

        <div className="flex-1 p-6 overflow-y-auto">
            {page === "dashboard" && <Dashboard />}
            {page === "event-list" && <EventList />}
            {page === "event-transaction" && <EventTransaction />}
        </div>
        </div>
    );
}
