
import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Formik, Field, Form } from 'formik';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import { NumberSequence } from 'ag-grid-community';

export default function EventBrowserCard() {
    const user = localStorage.getItem('user_id')
    const provinces = ['NL', 'PE', 'NS', 'NB', 'QC', 'ON', 'MB', 'SK', 'AB', 'BC', 'YT', 'NT', 'NU'];
    const [rowData, setRowData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [tiers, setTiers] = useState([]);
    const [currentTier, setCurrentTier] = useState({})
    const [defaultEventState, setDefaultEventState] = useState(false);
    const [numberOfTickets, setNumberOfTickets] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);
    const [columnDefs] = useState([
        { field: 'name', headerName: 'Name', resizable: true },
        { field: 'start_time', headerName: 'Start Time', resizable: true },
        { field: 'end_time', headerName: 'End Time', resizable: true },
        { field: 'street_num', headerName: 'Street Number', resizable: true },
        { field: 'street', resizable: true },
        { field: 'province', resizable: true },
        { field: 'city', resizable: true },
        { field: 'postal_code', headerName: 'Postal Code', resizable: true }
    ])

    useEffect(() => {
        axios.get('http://localhost:8000/event/public/all').then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                res.data[i]['start_time'] = (res.data[i]['start_time']).slice(0, 10)
                res.data[i]['end_time'] = (res.data[i]['end_time']).slice(0, 10)
            }
            setRowData(res.data);
        })
    }, [defaultEventState]);

    useEffect(retrieveTierOptions, [selectedEvent]);

    useEffect(() => {
        let total = 0
        if (numberOfTickets.length > 0 && tiers.length > 0) {
            const regex = /[^$]\d*\.\d*/
            for (let i = 0; i < tiers.length; i++) {
                const parsed = parseFloat(tiers[i].price.match(regex)[0]);
                total += parsed * parseInt(numberOfTickets[i].number);
            }
        }
        setTotalPrice(total);
    }, [numberOfTickets, tiers])

    function handleParseTicketNumber(tier) {
        if (numberOfTickets.length > 0) {
            const res = numberOfTickets.find((element) => { return element.tier_id == tier.tier_id })
            return res.number;
        }
    }

    function retrieveTierOptions() {
        const keys = Object.keys(selectedEvent);
        if (keys != 0) {
            axios.get(`http://localhost:8000/event/tiers/${selectedEvent.event_id}`).then(res => {
                setTiers(res.data);
                let arr = [];
                for (let i = 0; i < res.data.length; i++) {
                    let obj = {};
                    obj['tier_id'] = res.data[i].tier_id;
                    obj['number'] = 0;
                    arr.push(obj);
                }

                setNumberOfTickets(arr);
            })
        }
    }


    // Look at onChange functions for the search field
    // Reminder to remember to implement the ticket buying feature
    // Click on a row to launch the ticket buying thing?
    return (
        <div className="rows-2 py-4 px-4 ag-theme-alpine " style={{ height: 500 }}>
            <div className='flex-1 py-4'>
                <div className='flex flex-row bar border-indigo-500  border-2 bg-slate-100 h-30 rounded-lg'>
                    <div className='filters flex-1 px-4 py-2'>
                        <div className='flex gap-x-4'>
                            <select onChange={async (event) => {
                                if (event.target.value != 'default') {
                                    await axios.get(`http://localhost:8000/event?province=${event.target.value}`).then((req, res) => {
                                        for (let i = 0; i < req.data.length; i++) {
                                            let startTime = req.data[i]['start_time']
                                            let endTime = req.data[i]['end_time']
                                            if (startTime && endTime) {
                                                startTime = startTime.slice(0, 10)
                                                endTime = endTime.slice(0, 10)
                                            }
                                            req.data[i]['start_time'] = startTime;
                                            req.data[i]['end_time'] = endTime;
                                        }
                                        setRowData(req.data)
                                    });
                                } else {
                                    setDefaultEventState(!defaultEventState);
                                }
                            }} className='flex rounded-lg w-30 hover:bg-slate-100'>
                                <option value='default'>--Province--</option>
                                {
                                    provinces.map((province) => {
                                        return <option value={province}>{province}</option>
                                    })
                                }
                            </select>
                            <Formik
                                initialValues={{
                                    city: ''
                                }}
                                onSubmit={async (values) => {
                                    if (values.city) {
                                        await axios.get(`http://localhost:8000/event?city=${values.city}`).then((req, res) => {
                                            for (let i = 0; i < req.data.length; i++) {
                                                let startTime = req.data[i]['start_time']
                                                let endTime = req.data[i]['end_time']
                                                if (startTime && endTime) {
                                                    startTime = startTime.slice(0, 10)
                                                    endTime = endTime.slice(0, 10)
                                                }
                                                req.data[i]['start_time'] = startTime;
                                                req.data[i]['end_time'] = endTime;
                                            }
                                            setRowData(req.data)
                                        });
                                    } else if (!values.city) {
                                        setDefaultEventState(!defaultEventState);
                                    }
                                }}>
                                {({ isSubmitting }) => {
                                    return (
                                        <Form className='flex grow max-w-full flex-rows gap-2'>
                                            <Field className='rounded-full flex grow hover:bg-slate-100' key='city' name='city' placeholder='Filter by City' />
                                            <button className='flex justify-center text-slate-100 text-medium font-medium rounded-full w-28 bg-indigo-500 hover:bg-indigo-300 px-4 py-4' type='submit' disabled={isSubmitting}> Search </button>
                                        </Form>);
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-8'>
                <div className='w-7/12' style={{ height: 500 }}>
                    <AgGridReact
                        className="border-indigo-500 border-2 rounded-lg"
                        rowData={rowData}
                        onRowClicked={(e) => {
                            setSelectedEvent(e.data)
                        }}
                        columnDefs={columnDefs}>
                    </AgGridReact>
                </div>
                <div className='flex flex-1 flex-col rounded-lg border-indigo-500 border-2 bg-slate-200'>
                    <div className='title rounded-lg flex justify-center text-2xl font-bold mb-4 py-2'>Purchase Tickets for "{Object.keys(selectedEvent) != 0 && selectedEvent.name}"</div>
                    <select
                        onChange={(event) => {
                            if (tiers.length > 0 && event.target.value) {
                                const res = tiers.find((t) => { return t.tier_id == event.target.value })
                                setCurrentTier(res);
                            }
                        }}
                        className='rounded-lg flex hover:bg-slate-100'>
                        <option value='default'> --- Select Tier ---  </option>
                        {tiers.map(tier => {
                            return <option value={tier.tier_id}>{tier.tier_name}: {tier.tier_description} ----------------------- Price: {tier.price}</option>
                        })}
                    </select>
                    <div className='title rounded-lg flex justify-center text-2xl font-bold mb-4 py-2'> Number of Tickets </div>
                    <select
                        onChange={(event) => {
                            if (numberOfTickets.length > 0) {
                                let arr = []
                                for (let i = 0; i < numberOfTickets.length; i++) {
                                    let obj = numberOfTickets[i];
                                    if (obj.tier_id == currentTier.tier_id) {
                                        obj.number = event.target.value;
                                        console.log(obj.number)
                                    }
                                    arr.push(obj);
                                }
                                setNumberOfTickets(arr);
                            }
                        }}
                        className='rounded-lg flex hover:bg-slate-100'>
                        <option value={0}> --- Select Number of Ticket(s) ---  </option>
                        {[...Array(10).keys()].map((e) => {
                            return <option value={e + 1}>{e + 1}</option>
                        })}
                    </select>
                    <div className='card flex-auto'>
                        <div className='title rounded-lg flex justify-evenly text-2xl font-bold py-2'>Transaction Breakdown</div>
                        <dl className='total justify-evenly grid grid-cols-2 py-4'>
                            {tiers.map(tier => {
                                return (
                                    <>
                                        <dt className='flex text-base justify-evenly'> {tier.tier_name} ----- {tier.tier_description} </dt>
                                        <dd className='flex text-base justify-evenly'> {handleParseTicketNumber(tier)} Ticket(s) in cart </dd>
                                    </>
                                );
                            })}
                        </dl>
                        <div className='title rounded-lg flex justify-start text-2xl font-bold mb-4 py-4'>Total Price ---- ${totalPrice}</div>
                        <div className='flex justify-center gap-8 py-4'>
                            <button
                                onClick={() => {
                                    let arr = [];
                                    numberOfTickets.forEach(obj => {
                                        obj.number = 0;
                                        arr.push(obj);
                                    })
                                    setNumberOfTickets(arr);
                                }}
                                className='flex justify-center text-slate-100 text-medium font-medium rounded-full w-32 bg-red-500 hover:bg-red-300 px-4 py-4'> Reset </button>
                            <button
                                onClick={async () => {
                                    let data = [];
                                    if (totalPrice > 0) {
                                        for (let i = 0; i < tiers.length; i++) {
                                            let obj = {};
                                            obj['user_id'] = user;
                                            obj['event_id'] = selectedEvent.event_id;
                                            obj['tier_id'] = numberOfTickets[i].tier_id;
                                            obj['number'] = parseInt(numberOfTickets[i].number);
                                            const regex = /[^$]\d*\.\d*/
                                            // const curr = tiers.find(tier => { return tier.tier_id == numberOfTickets[i].tier_id });
                                            // obj['price'] = parseFloat(curr.price.match(regex)[0]);
                                            obj['total_price'] = totalPrice;
                                            // console.log(obj['event_id'])
                                            // console.log(obj['user_id'])
                                            // console.log(obj['tier_id'])
                                            // console.log(obj['number'])
                                            // console.log(obj['price'])
                                            data.push(obj);
                                        }
                                        // console.log(data);
                                        const res = await axios.post('http://localhost:8000/event/purchase-tickets',
                                            data,
                                            { headers: { 'content-type': 'application/json' } })
                                    } else {
                                        alert('You must buy at least one ticket >:(. We have families to feed')
                                    }
                                }}
                                className='flex justify-center text-slate-100 text-medium font-medium rounded-full w-30 bg-green-500 hover:bg-green-300 px-4 py-4'> Confirm Purchase </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}