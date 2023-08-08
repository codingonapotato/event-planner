import {useEffect, useState } from "react";
import axios from 'axios';
import ShiftAlert from "./ShiftEdit";
import { Formik, Form, Field } from 'formik';
import Input from "./Input"
import React from 'react';
import ShiftCreate from "./ShiftCreate";
import Select from "react-select";


export default function Browser () {
    const [selected, setSelected] = useState({});


    const handleChange = event => {
        console.log(event.target.value);
        if (event.target.value === 'shift') {
            setSelected(shiftOptions);
        } else if (event.target.value === 'event') {
            setSelected(eventOptions);
        } else {
            setSelected([]);
        }
        console.log(selected);
        
    };

    const shiftOptions = [
        {value: "event_id", label: "Event ID"},
        {value: "role", label: "Role"},
        {value: "start_time", label: "Start Time"},
        {value: "end_time", label: "End Time"},
        {value: "Station", label: "Station"}
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

                <div className='text-left text-3xl m-4 font-semibold'>Browser</div>
            
            <Formik
                initialValues={{
                    // filter: '',
                    // field:''
                }}
                onSubmit={async (values) => {
                        // console.log(values);
                        // const queryURL = url +'?'+values.filter+'='+ values.field;
                        // console.log(queryURL);
                        // await axios.get(queryURL, {
                        // }, {
                        //     headers: {'content-type': 'application/json'}
                        // })
                        // .then((response) => {                                    
                        //     const arr = [];
                        //     for(let i = 0; i < response.data.length; i++) {
                        //         arr.push(response.data[i]);
                        //     }
                        //     set_shifts(arr);     
                        // }, reason => {
                        //     console.log(reason);
                        // });
                }}
            >
                {props => (
                    <Form>    
                        <div className="space-x-2 mx-8">
                            <div className='mt-2 ml-2 font-semibold'>Filter: </div>
                            <Field as="select" name="from" id="from" className="mx-2 rounded-lg" onChange={handleChange}>
                                <option >Please Select</option>
                                <option value="shift">Shift</option>
                                <option value="event">Event</option>
                            </Field>
                            
                            <Select 
                                name="filter2"
                                id="filter2"
                                isMulti
                                options = {selected||''}
                                className="max-w-xs"
                            />
                            <Input 
                                id={'submit'}
                                type={'submit'}
                                customClass={'max-w-xs'}
                                customColor={'bg-green-50 dark:bg-green-600 hover:bg-green-700 text-white cursor-pointer'}
                                value={'Search'} 
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
        
        
        </>
    )
}