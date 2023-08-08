import axios from "axios";
import { Formik } from "formik";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import EventForm from "./EventForm";

export default function EventCreator() {
    const [userInfo] = useOutletContext();
    const navigate = useNavigate();

    return (
        <div className="flex relative flex-col h-full">
            <button className='absolute z-10 m-2 top-5 left-6 max-w-fit rounded-full p-1 hover:bg-gray-100'>
                <ArrowLeftIcon className='w-6 h-6' onClick={(e) => navigate(-1)}/>
            </button>
            <div className="flex flex-col flex-1 bg-white drop-shadow-md rounded-lg mx-6 my-5 pt-4 px-10">
                <div className='text-4xl font-bold mt-5'>Create An Event</div>
                <Formik
                    initialValues={{
                        event_name: '',
                        start_date: '',
                        start_time: '',
                        end_date: '',
                        end_time: '',
                        visibility: '',
                        budget: 0,
                        address: '',
                        postal_code: '',
                        city: '',
                        province: ''
                    }}
                    onSubmit={async (values) => {
                        await axios.put('http://localhost:8000/event', {
                            'name': values.event_name,
                            'start_date': values.start_date,
                            'start_time': values.start_time,
                            'end_date': values.end_date,
                            'end_time': values.end_time,
                            'address': values.address,
                            'visibility': values.visibility,
                            'budget': values.budget,
                            'organizer_id': userInfo.user_id,
                            'street_num': values.street_num,
                            'street': values.street,
                            'postal_code': values.postal_code,
                            'city': values.city,
                            'province': values.province 
                        }, {
                            headers: { 'content-type': 'application/json'}
                        });
                    }}>
                        {({errors, touched}) => (
                            <EventForm errors={errors} touched={touched} userInfo={userInfo}/>
                        )}
                </Formik>
            </div>

        </div>
    )
}