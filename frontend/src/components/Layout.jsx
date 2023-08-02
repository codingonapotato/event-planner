import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Outlet, Link, Navigate } from "react-router-dom";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid"
import axios from 'axios';

export default function Layout() {
    const [userInfo, setUserInfo] = useState({});
    const userID = localStorage.getItem('user_id');

    // Retrieve user information
    useEffect(() => {
        axios.get(`http://localhost:8000/user/${userID}`)
        .then((res) => {
            setUserInfo(res.data[0]);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    if (userID === null || userID < 0) {
        return (
            <Navigate to="/login" replace={true} />
        )
    } else {
        return (
            <>
                <div className="min-w-full min-h-screen flex flex-row bg-slate-100">
                    <Navbar />
                    <div className="flex-1 flex flex-col">
                        <div className='flex bg-white border-b-4 border-b-indigo-500'>
                            <div className='text-left text-2xl m-4 font-semibold'>{(userInfo.first_name) ? `Welcome back, ${userInfo.first_name}`: 'Welcome back'}</div>
                            <Link to='/profile' replace={true} className="flex-1 flex justify-end top-0 right-0 m-4">
                                <UserCircleIcon className='w-8 h-8 text-black'/>
                            </Link>
                        </div>
                        <Outlet context={[userInfo]}/>
                    </div>
                </div>
            </>
        );
    }


}