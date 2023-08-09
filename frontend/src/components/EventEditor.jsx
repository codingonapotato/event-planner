import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams, Link } from "react-router-dom";
import EventForm from "./EventForm";
import { ArrowLeftIcon, PlusSmallIcon, MinusSmallIcon } from '@heroicons/react/24/solid'
import { getDateString, getTimeString, itemColors } from "../assets/constants";

export default function EventEditor() {
    const [userInfo] = useOutletContext();
    const { event_id } = useParams();
    const navigate = useNavigate();
    const [eventInfo, setEventInfo] = useState({});
    const [tickets, setTickets] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [ticketsForSale, setTicketsForSale] = useState({});

    useEffect(() => {
        if (event_id != undefined) {
            axios.get(`http://localhost:8000/event/${event_id}`)
            .then(res => {
                setEventInfo(res.data)
                setStartDate(new Date(res.data.start_time));
                setEndDate(new Date(res.data.end_time));
                // console.log(getDateString(startDate));
            }, err => {
                console.log(err);
            });

            axios.get(`http://localhost:8000/event/${event_id}/tickets`)
            .then(res => {
                setTickets(res.data);
                tickets.map((ticket) => {
                    ticketsForSale[ticket.tier_name] = ticket.tickets_for_sale;
                })
            }, err => {
                console.log(err);
            });
        }
    }, [event_id]);

    return (
        <div className="flex relative flex-col h-full">
            <button className='absolute z-10 m-2 top-5 left-6 max-w-fit rounded-full p-1 hover:bg-gray-100'>
                <ArrowLeftIcon className='w-6 h-6' onClick={(e) => navigate(-1)}/>
            </button>
            <div className="flex flex-col flex-1 bg-white drop-shadow-md rounded-lg mx-6 my-5 pt-4 px-10 overflow-y-scroll">
                <div className='flex items-center justify-end mt-5'>
                    <div className='inline align-middle text-4xl font-bold flex-1'>Edit Your Event</div>
                    <Link onClick={deleteEventHandler} to='/manageEvent' className='rounded-lg bg-rose-500 text-white font-semibold px-8 py-2 hover:bg-rose-600'>
                        Delete Event
                    </Link>
                </div>
                <Formik
                    initialValues={{
                        event_name: eventInfo.name || '',
                        start_date: getDateString(startDate),
                        start_time: getTimeString(startDate),
                        end_date: getDateString(endDate),
                        end_time: getTimeString(endDate),
                        visibility: eventInfo.visibility,
                        budget: eventInfo.budget === undefined ? 0 : Number.parseFloat(eventInfo.budget.replace(/[^0-9.]+/g, '')).toFixed(2),
                        address: eventInfo.street_num + ' '+ eventInfo.street || '',
                        postal_code: eventInfo.postal_code || '',
                        city: eventInfo.city || '',
                        province: eventInfo.province || ''
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values) => {
                        await axios.post(`http://localhost:8000/event/${event_id}`, {
                            'name': values.event_name,
                            'start_date': values.start_date,
                            'start_time': values.start_time,
                            'end_date': values.end_date,
                            'end_time': values.end_time,
                            'visibility': values.visibility,
                            'budget': values.budget,
                            'event_id': event_id,
                            'address': values.address,
                            'postal_code': values.postal_code,
                            'city': values.city,
                            'province': values.province 
                        }, {
                            headers: { 'Content-Type': 'application/json' }
                        })
                    }}>
                        {({errors, touched}) => (
                            <EventForm errors={errors} touched={touched} userInfo={userInfo}/>
                        )}
                </Formik>
                <div className='text-4xl font-bold mt-6'>Create Tickets</div>
                <div className='drop-shadow-lg'>
                    <div className='flex w-5/6 items-center justify-center bg-gray-100 rounded-lg p-2 pr-4 mt-4 border border-gray-500/50'>
                        <span className='font-semibold w-1/3 text-center'>Tier name</span>
                        <span className='font-semibold w-1/3 text-center'># Tickets Avail.</span>
                        <span className='font-semibold w-1/3 text-center'># Tickets Sold</span>
                        <span className='font-semibold'>Submit</span>
                    </div>
                            {tickets.map((ticket, i) => {
                                return (
                                    <Formik
                                        key={ticket.tier_id}
                                        initialValues={{available_tickets: ticket.tickets_for_sale}}
                                        onSubmit={async (values) => {
                                            const numTickets = values.available_tickets - ticket.tickets_for_sale;
                                            await axios.put(`http://localhost:8000/event/${event_id}/ticket`, {
                                                numTickets: numTickets,
                                                tier_id: ticket.tier_id
                                            }, {
                                                headers: {'Content-Type': 'application/json'}
                                            })
                                        }}
                                        validate={(values) => {
                                            const errors = {};
                                            if (values.available_tickets < 0) {
                                                errors.available_tickets = 'Must be >0'
                                            } else if (values.available_tickets < ticket.tickets_for_sale) {
                                                errors.available_tickets = 'Cannot decrease'
                                            }

                                            return errors;
                                        }}
                                    >
                                        {({errors, touched, setFieldValue}) => (
                                            <Form>
                                                <div className={`flex flex-row w-5/6 rounded-md items-center justify-start p-3 ${itemColors[i % 2]}`}>
                                                    <div className="text-xl font-semibold w-1/3 text-center">
                                                        {ticket.tier_name}
                                                    </div>
                                                    <div className='flex flex-col w-1/3 min-w-fit items-center justify-center'>
                                                        <div className="text-xl font-semibold flex items-center space-x-1">
                                                            <button
                                                                type='button'
                                                                onClick={() => {
                                                                    const ticket_elm = document.getElementById(`${ticket.tier_name}`);
                                                                    const ticket_num = Number(ticket_elm.value) - 1;
                                                                    setFieldValue('available_tickets', ticket_num) 
                                                                }}>
                                                                <div className='flex items-center justify-center hover:bg-gray-200 rounded-full'>
                                                                    <MinusSmallIcon className='w-5 h-5'/>
                                                                </div>
                                                            </button>
                                                            <Field id={ticket.tier_name} as={NumTicketInput} name='available_tickets' />
                                                            <button
                                                                type='button' 
                                                                onClick={() => {
                                                                    const ticket_elm = document.getElementById(`${ticket.tier_name}`);
                                                                    const ticket_num = Number(ticket_elm.value) + 1;
                                                                    setFieldValue('available_tickets', ticket_num) 
                                                                }}
                                                            >
                                                                <div className='flex items-center justify-center hover:bg-gray-200 rounded-full'>
                                                                    <PlusSmallIcon className='w-5 h-5'/>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    {errors.available_tickets && touched.available_tickets ? 
                                                        <div className='text-rose-400 font-xs text-justify'>{errors.available_tickets}</div> : null}
                                                    </div>
                                                    <div className="text-xl font-semibold w-1/3 flex justify-center items-center">
                                                        {ticket.sold_tickets}
                                                    </div>
                                                    <button type='submit' className="text-green-600 font-semibold">
                                                        Update
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                )
                            })}
                </div>
            </div>
        </div>
    )

    async function deleteEventHandler() {
        await axios.delete(`http://localhost:8000/event/${event_id}`)
        .then(res => {
            alert('Event has been successfully deleted')
        }, err => {
            console.log(err);
        })
    }
}

function NumTicketInput({field, form, ...props}) {
    return (
        <input type="number" {...field} {...props} className='rounded-lg w-16 flex text-center bg-transparent border-0 text-xl'/>
    )
}
