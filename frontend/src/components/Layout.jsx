import { useState } from "react";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    const [selected, setSelected] = useState('');

    return (
        <div className="min-w-full min-h-screen flex flex-row">
            <div className="w-1/6">
                <Navbar />
            </div>
            <div className="w-5/6">
                <Outlet />
            </div>
        </div>
    );

}