import { useEffect, useState } from "react";
import axios from 'axios';



export default function ShiftTable() {
    const [shifts, set_shifts] = useState([]);
    const userID = localStorage.getItem('user_id');

    useEffect(() => {
        axios.post(`http://localhost:8000/shift/volunteerID/${userID}`)
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

   // async function getShifts() {
    //     const userID = localStorage.getItem('user_id');
        
    //     console.log('test');
    //     await axios.post(`http://localhost:8000/shift/volunteerID/${userID}`)
    //     .then((response) => {
    //         // console.log(response);
    //         // console.log(response.data[0].shift_id);
    //         // console.log(response.data[1].shift_id);

    //         set_shifts(response.data);
    //         return response.data;
    //         // console.log(JSON.parse(response.data));
    //         // response.data.map( item => {
    //         //     console.log(item);
    //         // })
    //         // return response.data;
            
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // };
    

    return (
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-blue-100 dark:bg-gray-800">
                <thead className="text-xs text-white uppercase bg-gray-800 border-b border-blue-400 dark:bg-gray-800">
                    <tr>
                        <th scope="col" className="px-6 py-3">  Shift ID    </th>
                        <th scope="col" className="px-6 py-3">  Role        </th>
                        <th scope="col" className="px-6 py-3">  Start Time  </th>
                        <th scope="col" className="px-6 py-3">  End Time    </th>
                        <th scope="col" className="px-6 py-3">  Station     </th>
                        <th scope="col" className="px-6 py-3">  Event ID    </th>
                    </tr>
                </thead>
                <tbody>
                    {shifts.map((item) => {
                        // {console.log(`role: ${item.role}`)}
                        return (
                            
                            <tr className="bg-gray-700 border-b border-gray-400 hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                    {item.shift_id}
                                </th>
                                {/* <td className="px-6 py-4">  {item.shift_id}     </td> */}
                                <td className="px-6 py-4">  {item.role}         </td>
                                <td className="px-6 py-4">  {item.start_time}   </td>
                                <td className="px-6 py-4">  {item.end_time}     </td>
                                <td className="px-6 py-4">  {item.station}      </td>
                                <td className="px-6 py-4">  {item.event_id}     </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    <br className="py-1"></br>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

    )
}