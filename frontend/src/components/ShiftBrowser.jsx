import ShiftTable from "./ShiftTable"
import {useEffect, useState } from "react";
import axios from 'axios';
import { Formik, Form } from 'formik';
import Input from "./Input"



export default function ShiftBrowser() {
    const userID = localStorage.getItem('user_id');
    const [organizer, set_organizer] = useState();
    useEffect(() => {
        axios.get(`http://localhost:8000/organizer/${userID}`)
        .then(() => {
                set_organizer(true);
        }).catch(() => {
                set_organizer(false);
        })
    },);


    return (
        <>
        <div className="m-6">
            {/* Table of user's shifts */}
            <ShiftTable type={'volunteerID'}/>

            {/* Table of available shifts*/}
            <div className="mt-8"></div>
            <ShiftTable type={'available'}/>

            {/* Table of all shifts of event (if organizer)*/}
            <div className='text-left text-3xl ml-4 mt-4 pt-8 font-semibold'>Shifts At Your Event</div>
            {(organizer === true) ?
                    <ShiftTable type={'organizerID'}/>
                :
                <div className='text-left text-2xl m-4 pl-5 font-semibold'>You are not an organizer</div>
            }
        </div>
        </>
        
        
    )
}