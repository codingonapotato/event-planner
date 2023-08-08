import ShiftTable from "./ShiftTable"
import {useEffect, useState } from "react";
import axios from 'axios';
import { Formik, Form } from 'formik';
import Input from "./Input"

export default function ShiftCreate() {
    const userID = localStorage.getItem('user_id');
    return (
        <>

<div id={"overlayCreate"} className="fixed hidden z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>
                    <div id={"dialogCreate"} className="hidden fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 rounded-md px-8 py-6 space-y-5 drop-shadow-lg">
                        <h1 className="text-2xl font-semibold text-white">Create Shift</h1>
                        <div className="border-t border-white-500 text-black"></div>
                
                        <Formik
                            initialValues={{
                                start_time: '',
                                end_time: '',
                                role: '',
                                station: '',
                                volunteer_id: '',
                                event_id: ''
                            }}
                            onSubmit={async (values) => {
                                    await axios.put(`http://localhost:8000/shift/`, {
                                        'role': values.role,
                                        'start_time': values.start_time,
                                        'end_time': values.end_time,
                                        'station': values.station,
                                        'volunteer_id': values.volunteer_id,
                                        'event_id': values.event_id,
                                    }, {
                                        headers: {'content-type': 'application/json'}
                                    })
                                    .then((res) => {
                                        document.getElementById("dialogCreate").classList.add('hidden');
                                        document.getElementById('overlayCreate').classList.add('hidden');
                                        location.reload();
                                    }, reason => {
                                        console.log(reason);
                                    });
                            }}
                        >
                            {props => (
                                <Form >
                                    <Input 
                                        id={'start_time'}
                                        type={'text'}
                                        labelText={'Start Time'}
                                        onChange={props.handleChange}
                                        value={props.values.start_time}
                                    />
                                    <Input 
                                        id={'end_time'}
                                        type={'text'}
                                        labelText={'End Time'}
                                        onChange={props.handleChange}
                                        value={props.values.end_time} 
                                    />
                                    <Input 
                                        id={'role'}
                                        type={'text'}
                                        labelText={'Role'}
                                        onChange={props.handleChange}
                                        value={props.values.role} 
                                    />
                                    <Input
                                        id={'station'}
                                        type={'text'}
                                        labelText={'Station'}
                                        onChange={props.handleChange}
                                        value={props.values.station} 
                                    />
                                    <Input
                                        id={'volunteer_id'}
                                        type={'number'}
                                        labelText={'Volunteer ID'}
                                        onChange={props.handleChange}
                                        value={props.values.volunteer_id} 
                                    />
                                    <Input
                                        id={'event_id'}
                                        type={'number'}
                                        labelText={'Event ID'}
                                        onChange={props.handleChange}
                                        value={props.values.event_id} 
                                    />
                                    <div className="py-2"></div>
                                    <Input 
                                        id={'submit'}
                                        type={'submit'}
                                        customClass={'mt-2'}
                                        customColor={'bg-green-50 dark:bg-green-700 hover:bg-green-800 text-white cursor-pointer'}
                                        value={'Create'} 
                                    />
                                </Form>
                            )}
                        </Formik>

                        <div className="pl-20">
                            <button id={"closeCreate"} onClick={()=> {
                                document.getElementById("dialogCreate").classList.add('hidden');
                                document.getElementById('overlayCreate').classList.add('hidden');
                            }} className="px-14 py-2 bg-indigo-500 hover:bg-indigo-700 text-white cursor-pointer rounded-md">
                                    Close
                            </button>
                        </div>
                    </div>

                    <button id="createEvent" type="button" onClick={() => {
                        document.getElementById("dialogCreate").classList.remove('hidden');
                        document.getElementById('overlayCreate').classList.remove('hidden');
                    }}className="px-5 py-2 ml-20 mb-2 mt-2  bg-green-600 hover:bg-green-700 text-white cursor-pointer rounded-md">
                        Create Shift
                    </button>
            




        </>
    )

}