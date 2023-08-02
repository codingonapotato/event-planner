import { useEffect, useState } from "react";
import axios from 'axios';
import { Navigate, useOutletContext } from "react-router-dom"

export default function Dashboard() {
    const [userInfo] = useOutletContext();

    useEffect(() => {
        // Retrieve user information
    }, [])

    return (
        <div className='flex flex-row pt-6 space-x-8 mx-4'>
            <div className='text-3xl self-start w-1/3 font-semibold'>Upcoming Events</div>
            <div className='text-3xl self-start w-1/3 font-semibold'>Upcoming Shifts</div>
            <BalanceCard balance={userInfo.balance}/>
        </div>
    )
}

function BalanceCard({
    balance
}) {
    return (
        <div className='flex flex-col bg-white flex-1 p-6 rounded-xl text-3xl'>
            <b>Your Balance</b>
            <p>{balance}</p>
        </div>
    )
}

// function List() {
//     return (

//     )
// }