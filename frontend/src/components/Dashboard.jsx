import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useOutletContext } from "react-router-dom"
import CardList from "./CardList";
import * as dashMock from '../mock/dashboardMock'


export default function Dashboard() {
    const [userInfo] = useOutletContext();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Retrieve upcoming events
        if (Object.keys(userInfo).length != 0) {
            axios.get(`http://localhost:8000/event/user/${userInfo.user_id}`)
                .then(res => {
                    setEvents(res.data);
                }).catch(err => {
                    console.log(err);
                });
        }
    }, [userInfo]);

    return (
        <div className='flex flex-row pt-6 space-x-10 mx-4'>
            <CardList items={events} type='Events' redirectTarget='/events' />
            <CardList items={dashMock.mockShift} type='Shifts' redirectTarget='/shifts' />
            <div className='flex flex-col flex-1 space-y-5'>
                <BalanceCard balance={userInfo.balance} />
                <DependantsList dependants={dashMock.mockDependants} />
            </div>
        </div>
    )
};

function BalanceCard({
    balance
}) {
    return (
        <div className='drop-shadow-lg flex flex-col bg-white min-w-1/6 p-5 font-semibold rounded-xl text-3xl'>
            Your Balance
            <p className='font-normal'>{balance}</p>
        </div>
    )
};

function DependantsList({
    dependants
}) {
    return (
        <div className="drop-shadow-lg flex flex-col bg-white rounded-xl font-semibold p-5">
            <div className='text-3xl mb-4'>Your Dependants</div>
            {dependants.map(dependant => {
                return <DependantsItem key={dependant.first_name} dependant={dependant} />
            })}
        </div>
    )
};

function DependantsItem({
    dependant
}) {
    return (
        <div className='border-b-2 p-1 text-lg font-medium'>
            {dependant.first_name + ' ' + dependant.last_name}
        </div>
    )
};