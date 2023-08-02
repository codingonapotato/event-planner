import { useState } from "react";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/solid"

export default function Layout() {
    const [selected, setSelected] = useState('');
    const [showNav, setShowNav] = useState(false);

    return (
        <div className="min-w-full min-h-screen flex flex-row bg-slate-100">
            {(showNav) ? 
                <div className={`transition-all transform w-fit ease-out duration-300 delay-150 ${(showNav) ? "left-0" : "-left-300px"}`}>
                    <Navbar showNav={showNav} setShowNav={setShowNav}/>
                </div> :
                <button 
                    className="place-self-start bg-transparent m-4"
                    onClick={() => setShowNav(!showNav)}
                >
                    <Bars3Icon className="w-8 h-8"/>
                </button>
            }
            {/* <div className="w-fit">
                <Navbar />
            </div> */}
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );

}
// ${(showNav) ? "translate-x-0" : "-translate-x-full"}`}