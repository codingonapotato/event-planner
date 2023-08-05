import {useEffect, useState } from "react";
import axios from 'axios';
import ShiftAlert from "./ShiftAlert";
import { Formik, Form } from 'formik';
import Input from "./Input"

export default function ShiftTable({type}) {
    const [shifts, set_shifts] = useState([]);
    const userID = localStorage.getItem('user_id');
    const preUrl = `http://localhost:8000/shift/` + type + '/';
    const url = (type === 'available') ? preUrl : preUrl + userID;

    useEffect(() => {
        // console.log(url);
        axios.get(url)
        .then((response) => {
            const arr = [];
            // console.log(`length: ${res.data.length}`);
            for(let i = 0; i < response.data.length; i++) {
                // console.log(res.data[i]);
                arr.push(response.data[i]);
            }

            // console.log(`arr: ${arr}`);
            set_shifts(arr);     
        }).catch((error) => {
                console.error(error);

        })
    }, []);
   

    return (
        
        <>
        {/**Table design and styling from https://flowbite.com/docs/components/tables*/}
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
                        {/* {console.log(`test: ${type}`)} */}
                        {(type == 'organizerID') ? <th scope="col" className="px-6 py-3">Volunteer ID</th>:<></>}
                        
                    </tr>
                </thead>
                <tbody>
                    {shifts.map((item) => {
                        // {console.log(`role: ${item}`)}
                        return (
                            
                            <tr key ={"table"+item.shift_id}className="bg-gray-700 border-b border-gray-400 hover:bg-gray-600">
                                {/* <th scope="row" className="px- py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                    {item.shift_id}
                                </th> */}
                                <th scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                    {item.event_id}
                                </th>
                                {/* <td className="px-6 py-4">  {item.event_id}     </td> */}
                                <td className="px-6 py-4">  {item.role}         </td>
                                <td className="px-6 py-4">  {item.start_time}   </td>
                                <td className="px-6 py-4">  {item.end_time}     </td>
                                <td className="px-6 py-4">  {item.station}      </td>
                                {(type == 'organizerID') ? <td className="px-6 py-4">{item.volunteer_id}</td>:<></>}
                                
                                <td className="px-6 py-4">
                                    {
                                        (type === 'organizerID') ? <><ShiftAlert item={item}/></>:<></>                                    
                                    }
                                    {
                                        (type === 'available') ? <>
                                        <div id={"overlayAccept"+item.shift_id} className="fixed hidden z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>
                                        <div id={"dialogAccept" + item.shift_id} className="hidden fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 rounded-md px-8 py-6 space-y-5 drop-shadow-lg">
                                            <h1 className="text-2xl font-semibold text-white">Accept Shift?</h1>
                                            <div className="border-t border-white-500 text-black"></div>
                                            {/* {console.log(`volunteerId: ${item.volunteer_id}`)} */}

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
                                                            console.log(res);
                                                            console.log(item.volunteer_id);
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