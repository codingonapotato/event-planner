import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import EventForm from "./EventForm";
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { getDateString, getTimeString } from "../assets/constants";

export default function EventEditor() {
    const [userInfo] = useOutletContext();
    const { event_id } = useParams();
    const navigate = useNavigate();
    const [eventInfo, setEventInfo] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        if (event_id != undefined) {
            axios.get(`http://localhost:8000/event/${event_id}`)
            .then(res => {
                setEventInfo(res.data)
                setStartDate(new Date(res.data.start_time));
                setEndDate(new Date(res.data.end_time));
                console.log(getDateString(startDate));
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
                <div className='text-4xl font-bold mt-5'>Edit Your Event</div>
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
                            'address': values.address,
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
                {/* <div className='text-4xl font-bold mt-6'>Create Tickets</div> */}
            </div>

        </div>

    )
}