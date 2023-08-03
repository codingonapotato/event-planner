import { useEffect, useState } from "react";
import axios from 'axios';
import { Navigate, useOutletContext } from "react-router-dom"

const mockEvent = [
    {
        "name": "Big Bird's Talk Show",
        "start_time": "2023-08-20T10:00:00.000Z",
        "end_time": "2023-08-20T16:00:00.000Z",
        "street_num": 1234,
        "street": "Sesame St",
        "postal_code": "K8V2V3",
        "city": "Trenton",
        "province": "ON",
        "tier_description": "Standard Seating"
    }
]

export default function Dashboard() {
    const [userInfo] = useOutletContext();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Retrieve upcoming events
        axios.get(`http://localhost:8000/event/user/1`)
        .then(res => {
            console.log(res.data);
            setEvents(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div className='flex flex-row pt-6 space-x-8 mx-4'>
            <div className="flex flex-col w-1/3">
                <div className='flex-auto text-3xl self-start font-semibold mb-3'>Upcoming Events</div>
                <List items={events} />
            </div>
            <div className='flex-auto text-3xl self-start w-1/3 font-semibold'>Upcoming Shifts</div>
            <BalanceCard balance={userInfo.balance}/>
        </div>
    )
}

function BalanceCard({
    balance
}) {
    return (
        <div className='flex flex-col h-fit bg-white w-1/6 p-6 rounded-xl text-3xl'>
            <b>Your Balance</b>
            <p>{balance}</p>
        </div>
    )
}

function List({
    items
}) {
    return (
        <div className="flex flex-col space-y-2">
            {items.map(item => {
                return <ListItem item={item} />
            })}
        </div>

    )
}

const monthNames=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function ListItem({
    item
}) {
    function getDateString(date) {
        return monthNames[date.getMonth()] + ' ' + date.getDate() + ' ' + String(date.getUTCHours()).padStart(2,'0') + ":" + String(date.getUTCMinutes()).padStart(2,'0')
    }

    const startDate = new Date(item.start_time);
    const endDate = new Date(item.end_time);

    return (
        <div className='flex flex-col p-4 bg-white rounded-lg space-y-2 drop-shadow-md'>
            <div className='flex'>
                <span className='min-w-fit text-xl text-black font-semibold flex items-end'>
                    {item.name}
                </span>
                <span className='flex-1 text-black font-light flex items-end justify-end'>
                    {item.tier_description}
                </span>
            </div>
            <div>
                {item.street_num + ' ' + item.street + ', ' + item.city + ' ' + item.province + ' ' + item.postal_code}
            </div>
            <div>
                {getDateString(startDate) + ' - ' + getDateString(endDate)}
            </div>
        </div>
    )

}