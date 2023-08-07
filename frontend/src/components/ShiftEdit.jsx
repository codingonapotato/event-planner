import { useState } from "react"
import axios from 'axios';
import { Formik, Form } from 'formik';
import Input from "./Input"
import { Navigate, Link } from "react-router-dom";

export default function ShiftAlert({item}) {
    
    // Modal design and style from https://www.kindacode.com/article/how-to-create-a-modal-dialog-with-tailwind-css/ 
    
    return (
        <>
        <div id={"overlayEdit"+item.shift_id} className="fixed hidden z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>
        <div id={"dialogEdit" + item.shift_id} className="hidden fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 rounded-md px-8 py-6 space-y-5 drop-shadow-lg">
            <div className='flex flex-row'>
                <h1 className="text-2xl mr-14 font-semibold text-white">Edit Shift</h1>
                <div className="mr-14"></div>
                <button onClick={()=> {
                    axios.delete(`http://localhost:8000/shift/${item.shift_id}`)
                    .then((response) => {
                        document.getElementById("dialogEdit"+item.shift_id).classList.add('hidden');
                        document.getElementById('overlayEdit'+item.shift_id).classList.add('hidden');
                        location.reload();
                    }).catch((error) => {
                            console.error(error);
                    })
                }} className="px-7 py-2 bg-red-700 hover:bg-red-800 text-white cursor-pointer rounded-md">
                        Delete
                </button>
            </div>
            <div className="border-t border-white-500 text-black"></div>
                <Formik
                        initialValues={{
                            role: item.role, 
                            start_time: item.start_time,
                            end_time: item.end_time,
                            station: item.station,
                            volunteer_id: item.volunteer_id,
                            event_id: item.event_id
                        }}
                        onSubmit={async (values) => {
                                await axios.post(`http://localhost:8000/shift/update/${item.shift_id}`, {
                                    'role': values.role,
                                    'start_time': values.start_time,
                                    'end_time': values.end_time,
                                    'station': values.station,
                                    'volunteer_id': values.volunteer_id,
                                    'event_id': values.event_id
                                }, {
                                    headers: {'content-type': 'application/json'}
                                })
                                .then((res) => {                                    
                                    document.getElementById("dialogEdit"+item.shift_id).classList.add('hidden');
                                    document.getElementById('overlayEdit'+item.shift_id).classList.add('hidden');
                                    location.reload();
                                    
                                }, reason => {
                                    console.log(reason);
                                });
                        }}
                        // validate={(values) => {
                        //     // setServerError('');
                        //     const errors = {};
                        //     if (!values.email) { 
                        //         errors.email = "Email is required" 
                        //     } else if (!/.*@.*/.test(values.email)) {
                        //         errors.email = 'Invalid email';
                        //     }

                        //     if (!values.password) {
                        //         errors.password = "Password is required"
                        //     } else if (!/[A-Za-z0-9-]{4}/.test(values.password)) {
                        //         errors.password = 'Invalid password';
                        //     }

                        //     return errors;
                        // }}
                    >
                        {props => (
                            <Form >
                                {/* <div className='flex flex-row space-x-4'> */}
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
                                {/* </div> */}
                                <Input 
                                    id={'role'}
                                    type={'text'}
                                    labelText={'Role'}
                                    // customClass={'placeholder:text-gray-900'}
                                    onChange={props.handleChange}
                                    value={props.values.role} 
                                    // onClick={(e) => e.preventDefault()}
                                />
                                <Input
                                    id={'station'}
                                    type={'text'}
                                    // placeholder={'name@email.com'}
                                    labelText={'Station'}
                                    onChange={props.handleChange}
                                    value={props.values.station} 
                                />
                                <Input
                                    id={'volunteer_id'}
                                    type={'number'}
                                    // placeholder={'name@email.com'}
                                    labelText={'Volunteer ID'}
                                    onChange={props.handleChange}
                                    value={props.values.volunteer_id || ''} 
                                />
                                {/* {(serverError) ? <div className="text-sm dark:text-red-400">{serverError}</div> : */}
                                {/* // (props.errors.email && props.touched.email) ? <div className="text-sm dark:text-red-400">{props.errors.email}</div> : null} */}
                                <Input
                                    id={'event_id'}
                                    type={'number'}
                                    // placeholder={'•••••••••'}
                                    labelText={'Event ID'}
                                    onChange={props.handleChange}
                                    value={props.values.event_id} 
                                />
                                {/* {(props.errors.password && props.touched.password) ? <div className="text-sm dark:text-red-400">{props.errors.password}</div> : null} */}
                                <div className="py-2"></div>
                                <Input 
                                    id={'submit'}
                                    type={'submit'}
                                    customClass={'mt-2'}
                                    customColor={'bg-orange-50 dark:bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'}
                                    value={'Make Changes'} 
                                />

                            </Form>
                        )}
                    </Formik>
            <div className="pl-20">
            <button id={"close" + item.shift_id} onClick={()=> {
                document.getElementById("dialogEdit"+item.shift_id).classList.add('hidden');
                document.getElementById('overlayEdit'+item.shift_id).classList.add('hidden');
            }} className="px-14 py-2 bg-indigo-500 hover:bg-indigo-700 text-white cursor-pointer rounded-md">
                    Close
            </button>
            </div>
        </div>

        <button id={"open"+item.shift_id} onClick={()=> {
            document.getElementById("dialogEdit"+item.shift_id).classList.remove('hidden');
            document.getElementById('overlayEdit'+item.shift_id).classList.remove('hidden');
        }} className="font-medium text-green-600 dark:text-blue-500 hover:underline" type="button">
            Edit
        </button>
        </>
        
    )
    
}