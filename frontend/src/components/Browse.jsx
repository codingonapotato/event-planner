import {useEffect, useState } from "react";
import axios from 'axios';
import ShiftAlert from "./ShiftEdit";
import { Formik, Form, Field } from 'formik';
import Input from "./Input"
import React from 'react';
import ShiftCreate from "./ShiftCreate";
import Select from "react-select";


export default function Browse () {
    const [type, setType] = useState('test');
    const [shifts, set_shifts] = useState([]);
    const [selected, setSelected] = useState([]);
    const [select_attr, set_select_attr] = useState([]);


    const shiftOptions = [
        {value: "event_id", label: "Event ID"},
        {value: "role", label: "Role"},
        {value: "start_time", label: "Start Time"},
        {value: "end_time", label: "End Time"},
        {value: "station", label: "Station"}
    ];

    const eventOptions = [
        {value: "event_id", label: "Event ID"},
        {value: "name", label: "Name"},
        {value: "start_time", label: "Start Time"},
        {value: "end_time", label: "End Time"},
        {value: "street_num", label: "Street #"},
        {value: "street", label: "Street"},
        {value: "postal_code", label: "Postal Code"}
    ];

    return (
        <>
            <div >
                <div className='text-left text-3xl m-4 font-semibold'>Browse</div>
                <div className='mx-5'>
                <div className='mt-2 ml-2 font-semibold'>Select: </div>
                <select className="mx-2 rounded-lg" onChange={
                    (event)=>{
                        set_select_attr('');
                        setType(event.target.value);
                        if (event.target.value === 'shift') {
                            setSelected(shiftOptions);
                        } else if (event.target.value === 'event') {
                            setSelected(eventOptions);
                        } else {
                            setSelected([]);
                        }
                    }}>
                    <option >Please Select</option>
                    <option value="shift">Shift</option>
                    <option value="event">Event</option>
                    </select>
                
                <Select 
                    name="attributes"
                    id="attributes"
                    isMulti
                    options = {selected}
                    className="max-w-xs mx-2 my-2"
                    onChange={set_select_attr}
                    value={select_attr}
                />
                </div>
            
                <Formik
                    initialValues={{}}
                    onSubmit={async (values) => {
                        let arr = [];
                        if (select_attr.length !== 0) {
                            select_attr.map(attribute => {
                                arr.push(attribute.value);
                            })
                        }
                        // console.log(`arr: ${arr}`);
                        await axios.get(`http://localhost:8000/shift/browse/${type}/${arr.pop()}/${arr.pop()}/${arr.pop()}/${arr.pop()}/${arr.pop()}/${arr.pop()}/${arr.pop()}`, {
                        }, {
                            headers: {'content-type': 'application/json'}
                        })
                        .then((response) => {
                            console.log(response);
                            set_shifts(response.data);
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
                                customColor={' mx-7 max-w-xs bg-green-50 dark:bg-green-700 hover:bg-green-800 text-white cursor-pointer'}
                                value={'Search'} 
                            />
                        </Form>
                    )}
                </Formik>
            </div>
            
            


            <div className="relative overflow-x-auto m-7">
            {(shifts.length <= 0) ? <>
            {/* <div className='text-left text-2xl m-4 pl-5 font-semibold'>No {type}s available</div> */}
            </>
            :
            <table className="w-auto border-b text-sm text-left text-blue-100 dark:bg-gray-800">
                <thead className="text-xs text-white uppercase bg-gray-800 border-b border-blue-400 dark:bg-gray-800">
                    <tr>
                        {
                            select_attr.map((columnName)=> {
                                return (
                                    <>
                                    <th scope="col" className="px-6 py-3">  {columnName.label}    </th>
                                    </>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {/* {Table Body} */}
                    {shifts.map((item) => {
                        return (
                            <tr className="bg-gray-700 border-b border-gray-400 hover:bg-gray-600">
                                {select_attr.map((rows)=> {
                                    const test =rows.value;
                                    // console.log(test);
                                    return (
                                        <td className="px-6 py-4">  {item[test]}  </td>        
                                    )
                                    
                                })}
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