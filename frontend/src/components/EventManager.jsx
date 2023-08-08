import { BanknotesIcon, CalendarDaysIcon, PlusIcon, SparklesIcon, TicketIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useOutletContext, Outlet, NavLink } from "react-router-dom";


const statNames = ['Total Revenue', 'Ticket(s) Sold', 'Most Revenue Gained', 'Event(s) Managed']
const statIcons = [BanknotesIcon, TicketIcon, SparklesIcon, CalendarDaysIcon]
const statIconColors = ['text-emerald-500', 'text-rose-500', 'text-sky-500', 'text-purple-500']

export default function EventManager() {
    const [userInfo] = useOutletContext();
    const [stats, setStats] = useState({});
    const [events, setEvents] = useState([]);
    const [starCustomers, setStarCustomers] = useState([]);
    const [starVolunteers, setStarVolunteers] = useState([]);

    useEffect(() => {
        if (Object.keys(userInfo).length != 0) {
            axios.get(`http://localhost:8000/organizer/${userInfo.user_id}/stats`)
            .then(res => {
                setStats(res.data);
            }, err => {
                console.log(err);
            });

            axios.get(`http://localhost:8000/organizer/${userInfo.user_id}/events`)
            .then(res => {
                setEvents(res.data);
            }, err => {
                console.log(err);
            })
        }

    }, [userInfo])

    return (
        <div className='flex flex-row mt-5 space-x-8 mx-6 h-full'>
            <div className='flex flex-col h-full'>
                <div className='grid grid-cols-2 grid-rows-2 gap-4'>
                    {Object.values(stats).map((stat, i) => {
                        return <StatCard 
                                    key={statNames[i]} 
                                    value={stat} 
                                    name={statNames[i]}
                                    icon={statIcons[i]}
                                    color={statIconColors[i]} />
                    })}
                </div>
                <div className="flex flex-col bg-white rounded-lg drop-shadow-lg my-5 pb-5 min-h-fit px-2 justify-start items-center">
                    <div className="flex space-x-4 justify-center items-center border-b mx-4 py-1 w-full">
                        <StarIcon className="w-8 h-8 text-amber-400"/>
                        <span className="text-3xl font-bold">Your Star Stats</span>
                        <StarIcon className="w-8 h-8 text-amber-400"/>
                    </div>
                    <div className='flex justify-center items-center font-semibold'>
                        <span>Find the </span>
                        <select id='starSelect' className='border-0 focus:border-0 bg-none px-1 underline hover:text-blue-500 focus:ring-0'>
                            <option value='customer'>customer(s)</option>
                            <option value='volunteer'>volunteer(s)</option>
                        </select>
                        <span>who have attended all of your events!</span>
                    </div>
                    {starCustomers.length != 0 || starVolunteers.length != 0 ? 
                    <ul className='flex flex-col justify-end items-center text-lg font-semibold m-2 mb-3'>
                        {
                            (starCustomers.length != 0 ? 
                            starCustomers.map(customer => {
                                return (
                                    <li key={customer.user_id} className='text-right'>
                                        {customer.first_name + ' ' + customer.last_name}
                                    </li> 
                                ) 
                            }) : (starVolunteers.length != 0 ?
                            starVolunteers.map(volunteer => {
                                return (
                                    <li key={volunteer.user_id}>
                                        {volunteer.first_name + ' ' + volunteer.last_name}
                                    </li>
                                )
                            }) : null))
                        }
                    </ul> : null}
                    <button 
                        className='font-semibold py-3 px-4 bg-indigo-500 w-1/2 border rounded-full text-white mt-1 focus:border-black'
                        onClick={getStarStats}
                    >
                        Get Stats!
                    </button>
                </div>
            </div>
            <div className='flex-1 h-full flex flex-col space-y-4'>
                <div className='flex flex-col max-h-96 px-6 py-5 bg-white w-full rounded-lg drop-shadow-md'>
                    <div className='flex items-center justify-start w-full pb-2 border-b border-gray-400/50'>
                        <span className='font-bold text-3xl text-left mr-6'>Your Events</span>
                        <NavLink 
                            to=''
                            end
                            replace={true}
                            className={({isActive}) => 
                                (isActive) ? "bg-indigo-500 text-white px-2 py-1 rounded-l-lg" : "px-2 py-1 rounded-l-lg hover:bg-gray-200 bg-gray-100 text-black"}
                        >
                            General
                        </NavLink>
                        <NavLink 
                            to='revenue'
                            replace={true}
                            className={({isActive}) => 
                                (isActive) ? "bg-indigo-500 text-white px-2 py-1 rounded-r-lg" : "rounded-r-lg px-2 py-1 bg-gray-100 hover:bg-gray-200 text-black"}
                        >
                            Revenue
                        </NavLink>
                        <span className='flex flex-1 items-end justify-end'>
                            <div className="p-2 hover:bg-gray-100 rounded-full">
                                <Link to='/createEvent'>
                                    <PlusIcon className='w-6 h-6'/>
                                </Link>
                            </div>
                        </span>
                    </div>
                    <Outlet context={[events, userInfo.user_id]}/>
                </div>
            </div>
        </div>
    )

    async function getStarStats() {
        setStarCustomers([]);
        setStarVolunteers([]);
        const category = document.getElementById('starSelect').value;
        await axios.get(`http://localhost:8000/organizer/${userInfo.user_id}/star/${category}`)
        .then(res => {
            if (category === 'customer') {
                setStarCustomers(res.data)
            } else {
                setStarVolunteers(res.data)
            }
        }, err => {
            console.log(err);
        });
    }
}

function StatCard({
    name,
    value,
    icon,
    color
}) {
    const Icon = icon;
    return (
        <div className='drop-shadow-md bg-white rounded-md p-8 space-x-5 flex flex-row min-w-fit'>
            <span className='flex justify-center items-center pr-4 border-r border-slate-300/50'>
                <Icon className={'w-12 h-12 ' + color}/>
            </span>
            <div className='flex flex-col'>
                <span className='text-3xl font-bold'>{(value === undefined) ? '$0.00' : value}</span>
                <span className='text-sm font-semilight'>{name}</span>
            </div>
        </div>
    )
}


