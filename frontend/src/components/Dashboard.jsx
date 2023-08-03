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
        axios.get(`http://localhost:8000/event/user/1`)
        .then(res => {
            setEvents(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, [])

    return (
        <div className='flex flex-row pt-6 space-x-8 mx-4'>
            <CardList items={events} type='Events' redirectTarget='/events'/>
            <CardList items={dashMock.empty} type='Shifts' redirectTarget='/shifts'/>
            <div className='flex flex-col flex-1 space-y-8'>
                <BalanceCard balance={userInfo.balance}/>
                <DependantsList dependants={dashMock.mockDependants}/>
            </div>
        </div>
    )
};

function BalanceCard({
    balance
}) {
    return (
        <div className='drop-shadow-lg flex flex-col bg-white min-w-1/6 p-5 rounded-xl text-3xl'>
            <b>Your Balance</b>
            <p>{balance}</p>
        </div>
    )
};

function DependantsList({
    dependants
}) {
    return (
        <div className="drop-shadow-lg flex flex-col bg-white rounded-xl p-5">
            <div className='text-3xl mb-4'><b>Your Dependants</b></div>
            {dependants.map(dependant => {
                return <DependantsItem dependant={dependant} />
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