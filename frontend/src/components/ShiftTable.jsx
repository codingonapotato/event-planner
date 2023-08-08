import {useEffect, useState } from "react";
import axios from 'axios';
import ShiftEdit from "./ShiftEdit";
import { Formik, Form, Field } from 'formik';
import Input from "./Input"
import React from 'react';
import ShiftCreate from "./ShiftCreate";

export default function ShiftTable({type}) {
    const [shifts, set_shifts] = useState([]);
    const userID = localStorage.getItem('user_id');
    const preUrl = `http://localhost:8000/shift/` + type + '/';
    const url = (type === 'available') ? preUrl : preUrl + userID;

    useEffect(() => {
        axios.get(url)
        .then((response) => {
            const arr = [];
            for(let i = 0; i < response.data.length; i++) {
                arr.push(response.data[i]);
            }
            set_shifts(arr);     
        }).catch((error) => {
                console.error(error);

        })
    }, []);
   

    return (
        <>


            <div className="flex items-center justify-between">
                {
                    (type==='organizerID')?
                    <ShiftCreate/>
                    :
                    <div className='text-left text-3xl m-4 font-semibold'>{(type==='available')?'Available Shifts':<></>}{(type==='volunteerID')?'Your Shifts':<></>}</div>
                }
            
                {(type ==='available')?<>
                    <Formik
                    initialValues={{
                        filter: '',
                        field:''
                    }}
                    onSubmit={async (values) => {
                            // console.log(values);
                            const queryURL = url +'?'+values.filter+'='+ values.field;
                            // console.log(queryURL);
                            await axios.get(queryURL, {

                            }, {
                                headers: {'content-type': 'application/json'}
                            })
                            .then((response) => {                                    
                                const arr = [];
                                for(let i = 0; i < response.data.length; i++) {
                                    arr.push(response.data[i]);
                                }
                                set_shifts(arr);     

                            }, reason => {
                                console.log(reason);
                            });
                    }}
                    >
                    {props => (
                        <Form>

                            <div className='flex flex-row'>
                                <div className='flex flex-row space-x-2'>
                                    <div className='text-left mt-4 font-semibold'>Filter: </div>
                                    <Field as="select" name="filter" id="filter" onChange={props.handleChange} className="space-x-10 mt-2 pr-10 max-h-11 rounded-lg bg-gray-50 border-white-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-white">
                                        <option >Please Select</option>
                                        <option value="city">City</option>
                                        <option value="province">Province</option>
                                    </Field>

                                    <Input
                                        id={'field'}
                                        type={'text'}
                                        onChange={props.handleChange}
                                        value={props.values.field||''} 
                                    />
                                </div>
                                <Input 
                                    id={'submit'}
                                    type={'submit'}
                                    // customClass={'mt-9'}
                                    customColor={'bg-green-50 dark:bg-green-600 hover:bg-green-700 text-white cursor-pointer'}
                                    value={'Go'} 
                                />
                            </div>


                        </Form>
                    )}
                    </Formik>
                </>:<></>}
            
            </div>











        {/**Table styling from https://flowbite.com/docs/components/tables*/}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {(shifts.length <= 0) ? 
            <div className='text-left text-2xl m-4 pl-5 font-semibold'>No Shifts Available</div>
            :
            <table className="w-full text-sm text-left text-blue-100 dark:bg-gray-800">
                <thead className="text-xs text-white uppercase bg-gray-800 border-b border-blue-400 dark:bg-gray-800">
                    <tr>
                        {/* <th scope="col" className="px-6 py-3">  Shift ID    </th> */}
                        <th scope="col" className="px-6 py-3">  Event ID    </th>
                        <th scope="col" className="px-6 py-3">  Role        </th>
                        <th scope="col" className="px-6 py-3">  Start Time  </th>
                        <th scope="col" className="px-6 py-3">  End Time    </th>
                        <th scope="col" className="px-6 py-3">  Station     </th>
                        {(type == 'organizerID') ? <th scope="col" className="px-6 py-3">Volunteer ID</th>:<></>}
                        
                    </tr>
                </thead>
                <tbody>
                    {/* {Table Body} */}
                    {shifts.map((item) => {
                        return (
                            
                            <tr key ={"table"+item.shift_id}className="bg-gray-700 border-b border-gray-400 hover:bg-gray-600">
                                {/* <th scope="row" className="px- py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                    {item.shift_id}
                                </th> */}
                                <th scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                    {item.event_id}
                                </th>
                                <td className="px-6 py-4">  {item.role}         </td>
                                <td className="px-6 py-4">  {item.start_time}   </td>
                                <td className="px-6 py-4">  {item.end_time}     </td>
                                <td className="px-6 py-4">  {item.station}      </td>
                                {(type == 'organizerID') ? <td className="px-6 py-4">{item.volunteer_id}</td>:<></>}
                                
                                <td className="px-6 py-4">
                                    {/* Create Edit Form for Organizers*/}
                                    {(type === 'organizerID') ? <><ShiftEdit item={item}/></>:<></>}

                                    {/* {Create confirmation alert for Accepting shifts} */}
                                    {
                                        (type === 'available') ? <>
                                        <div id={"overlayAccept"+item.shift_id} className="fixed hidden z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>
                                        <div id={"dialogAccept" + item.shift_id} className="hidden fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 rounded-md px-8 py-6 space-y-5 drop-shadow-lg">
                                            <h1 className="text-2xl font-semibold text-white">Accept Shift?</h1>
                                            <div className="border-t border-white-500 text-black"></div>

                                            <Formik
                                                initialValues={{
                                                    volunteer_id: userID
                                                }}
                                                onSubmit={async (values) => {
                                                        await axios.post(`http://localhost:8000/shift/accept/${item.shift_id}`, {
                                                            'volunteer_id': userID
                                                        }, {
                                                            headers: {'content-type': 'application/json'}
                                                        })
                                                        .then((res) => {

                                                            document.getElementById("dialogAccept"+item.shift_id).classList.add('hidden');
                                                            document.getElementById('overlayAccept'+item.shift_id).classList.add('hidden');
                                                            location.reload();
                                                        
                                                        }, reason => {
                                                            console.log(reason);
                                                        
                                                        });
                                                }}
                                            >
                                                {props => (
                                                    <Form >
                                                        <Input 
                                                            id={'submit'}
                                                            type={'submit'}
                                                            customClass={'width:50'}
                                                            customColor={'bg-green-50 dark:bg-green-700 hover:bg-green-800 text-white cursor-pointer'}
                                                            value={'Yes'} 
                                                        />
                                                
                                                    </Form>
                                                )}
                                            </Formik>
                                            <div className="pl-20">
                                                <button id={"close" + item.shift_id} onClick={()=> {
                                                    document.getElementById("dialogAccept"+item.shift_id).classList.add('hidden');
                                                    document.getElementById('overlayAccept'+item.shift_id).classList.add('hidden');
                                                    }} className="px-14 py-2 bg-indigo-500 hover:bg-indigo-700 text-white cursor-pointer rounded-md">
                                                        Close
                                                </button>
                                            </div>
                                        </div>
                                                
                                        <button id={"open"+item.shift_id} onClick={()=> {
                                            document.getElementById("dialogAccept"+item.shift_id).classList.remove('hidden');
                                            document.getElementById('overlayAccept'+item.shift_id).classList.remove('hidden');
                                            }} className="font-medium text-green-500 hover:underline" type="button">
                                            Accept
                                        </button></>:<></>
                                    }

                                    {/* {Create drop confirmation alert for shifts} */}
                                    {
                                        (type === 'volunteerID') ? <>
                                        <div id={"overlay"+item.shift_id} className="fixed hidden z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>
                                        <div id={"dialog" + item.shift_id} className="hidden fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 rounded-md px-8 py-6 space-y-5 drop-shadow-lg">
                                            <h1 className="text-2xl font-semibold text-white">Drop Shift?</h1>
                                            <div className="border-t border-white-500 text-black"></div>

                                            <Formik
                                                initialValues={{
                                                    role: item.role, 
                                                    start_time: item.start_time,
                                                    end_time: item.end_time,
                                                    station: item.station,
                                                    event_id: item.event_id
                                                }}
                                                onSubmit={async (values) => {
                                                    await axios.post(`http://localhost:8000/shift/drop/${item.shift_id}`, {
                                                    }, {
                                                        headers: {'content-type': 'application/json'}
                                                    })
                                                    .then((res) => {
                                                    
                                                        document.getElementById("dialog"+item.shift_id).classList.add('hidden');
                                                        document.getElementById('overlay'+item.shift_id).classList.add('hidden');
                                                        location.reload();
                                                    
                                                    }, reason => {
                                                        console.log(reason);
                                                    
                                                    });
                                                }}
                                            >
                                                {props => (
                                                    <Form >
                                                        <Input 
                                                            id={'submit'}
                                                            type={'submit'}
                                                            customClass={'width:50'}
                                                            customColor={'bg-red-50 dark:bg-red-700 hover:bg-red-800 text-white cursor-pointer'}
                                                            value={'Drop'} 
                                                        />
                                                    </Form>
                                                )}
                                            </Formik>
                                            <div className="pl-20">
                                                <button id={"close" + item.shift_id} onClick={()=> {
                                                    document.getElementById("dialog"+item.shift_id).classList.add('hidden');
                                                    document.getElementById('overlay'+item.shift_id).classList.add('hidden');
                                                }} className="px-14 py-2 bg-indigo-500 hover:bg-indigo-700 text-white cursor-pointer rounded-md">
                                                        Close
                                                </button>
                                            </div>
                                        </div>
                
                                        <button id={"open"+item.shift_id} onClick={()=> {
                                            document.getElementById("dialog"+item.shift_id).classList.remove('hidden');
                                            document.getElementById('overlay'+item.shift_id).classList.remove('hidden');
                                            }} className="font-medium text-red-600 dark:text-red-500 hover:underline" type="button">
                                            Drop
                                        </button></>:<></>
                                    }

                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            }
        </div>

        </>

    )
}