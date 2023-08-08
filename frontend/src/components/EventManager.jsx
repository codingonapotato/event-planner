import { PencilSquareIcon, ClockIcon, BanknotesIcon, CalendarDaysIcon, PlusIcon, SparklesIcon, TicketIcon } from "@heroicons/react/24/outline";
import { MapPinIcon, StarIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { dateColors, itemColors, monthNames } from "../assets/constants";


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
                    </ul>
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
                    <div className='flex items-center justify-end w-full pb-2 border-b border-gray-400/50'>
                        <span className='font-bold text-3xl text-left flex-1'>Your Events</span>
                        <span className='p-2 flex items-end justify-end hover:bg-gray-100 rounded-full'>
                            <Link to='/createEvent'>
                                <PlusIcon className='w-6 h-6'/>
                            </Link>
                        </span>
                    </div>
                    <div className="scrollbar overflow-auto overscroll-auto flex flex-col mt-2 w-full space-y-1">
                        {
                            events.map((event, i) => {
                                return <EventItem key={`event`+i} item={event} index={i} />
                            })
                        }
                    </div>
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

function EventItem({
    item,
    index
}) {
    const startDate = new Date(item.start_time);
    const endDate = new Date(item.end_time);
    const startTime = String(startDate.getUTCHours()).padStart(2,'0') + ':' + String(startDate.getUTCMinutes()).padStart(2,'0'); 
    const endTime = String(endDate.getUTCHours()).padStart(2,'0') + ':' + String(endDate.getUTCMinutes()).padStart(2,'0'); 

    return (
        <div className={`flex flex-row rounded-lg p-3 py-3 space-x-4 ${itemColors[index % 2]}`}>
            <DateBox date={startDate} index={index} />
            <div className='flex-1 flex flex-col'>
                <div className='font-semibold text-xl'>{item.name}</div>
                <div className='flex-1 flex items-center space-x-8'>
                    <div className='flex flex-row space-x-1 items-center'>
                        <MapPinIcon className='w-5 h-5 text-black' />
                        <span className='font-semilight'>
                            {item.street_num + ' ' + item.street + ', ' + item.city + ' ' + item.province + ' ' + item.postal_code}
                        </span>
                    </div>
                    <div className='flex flex-row space-x-1 items-center'>
                        <ClockIcon className='w-5 h-5 text-black' />
                        <span className='font-semilight'>
                            {(endDate.getUTCDate() != startDate.getUTCDate()) ? 
                            startTime + ' - ' + monthNames[endDate.getUTCMonth()] + ' ' + endDate.getUTCDate() + ' ' + endTime : 
                            startTime + ' - ' + endTime 
                            }
                        </span>
                    </div>
                </div>
            </div>
            <Link className='self-center pr-2' to={`/editEvent/${item.event_id}`}>
                <div className={`hover:bg-gray-200 p-2 rounded-full`}>
                    <PencilSquareIcon className='w-6 h-6 text-black' />
                </div>
            </Link>
        </div>
    )

}

function DateBox({
    date,
    index
}) {
    return (
        <div className={`flex flex-start -space-y-1.5 flex-col py-0.5 px-3 rounded-md justify-center items-center ${dateColors[index % dateColors.length]}`}>
            <span className='text-white font-semibold text-md'>{date.getUTCDate()}</span>
            <span className='text-white font-semibold text-md align-top'>{monthNames[date.getUTCMonth()].toUpperCase()}</span>
            <span className='text-white font-semibold text-md align-top'>{date.getUTCFullYear()}</span>
        </div>
    )
}
