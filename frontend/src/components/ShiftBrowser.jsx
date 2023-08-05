import ShiftTable from "./ShiftTable"
import { useEffect, useState } from "react";
import axios from 'axios';

export default function ShiftBrowser() {
    const userID = localStorage.getItem('user_id');
    const [organizer, set_organizer] = useState();
    useEffect(() => {
        axios.get(`http://localhost:8000/organizer/${userID}`)
        .then((response) => {
            console.log(response.status);                
                set_organizer(true);
                console.log(`set_organizer:${organizer}`);

        }).catch((error) => {
                set_organizer(false);
                console.error(error);

        })
    },);


    return (
        <>
        <div className="m-6">

            {/* Table of your shifts */}
            <div className='text-left text-3xl m-4 font-semibold'>Your Shifts</div>
            <ShiftTable type={'volunteerID'}/>
            
            {/* Table of available shifts*/}
            <div className='text-left text-3xl m-4 pt-8 font-semibold'>Available Shifts</div>
            <ShiftTable type={'available'}/>
            

            {/* Table of all shifts of event (if organizer)*/}
            <div className='text-left text-3xl m-4 pt-8 font-semibold'>Shifts At Your Event</div>
            {(organizer === true) ?
                <ShiftTable type={'organizerID'}/>
                :
                <div className='text-left text-2xl m-4 pl-5 font-semibold'>You are not an organizer</div>
            }

            {/* Create shift  (if organizer)*/}



        </div>
        </>
        
        
    )
}