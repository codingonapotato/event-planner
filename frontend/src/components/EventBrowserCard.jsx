
import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Formik, Field, Form } from 'formik';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';

export default function EventBrowserCard() {
    const provinces = ['NL', 'PE', 'NS', 'NB', 'QC', 'ON', 'MB', 'SK', 'AB', 'BC', 'YT', 'NT', 'NU'];
    const [rowData, setRowData] = useState([]);
    const [changed, setChanged] = useState(false);
    const [columnDefs] = useState([
        { field: 'name', headerName: 'Name', resizable: true },
        { field: 'start_time', headerName: 'Start Time', resizable: true },
        { field: 'end_time', headerName: 'End Time', resizable: true },
        { field: 'street_num', headerName: 'Street Number', resizable: true },
        { field: 'street', resizable: true },
        { field: 'province', resizable: true },
        { field: 'city', resizable: true },
        { field: 'postal_code', headerName: 'Postal Code', resizable: true }
    ]);
    const [query, setQuery] = useState({ 'province': '', 'city': '' });

    // on first-load
    useEffect(() => {
        axios.get('http://localhost:8000/event/public/all').then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                res.data[i]['start_time'] = (res.data[i]['start_time']).slice(0, 10)
                res.data[i]['end_time'] = (res.data[i]['end_time']).slice(0, 10)
            }
            setRowData(res.data);
        })
    }, []);

    // Look at onChange functions for the search field
    // Reminder to remember to implement the ticket buying feature
    // Click on a row to launch the ticket buying thing?
    return (
        <div className="rows-2 py-4 px-4 ag-theme-alpine " style={{ height: 500 }}>
            <div className='flex-1 py-4'>
                <div className='flex flex-row bar border-indigo-500 bg-slate-100 border-2 h-30 rounded-lg'>
                    <div className='filters flex-1 px-4 py-2'>
                        <div className='flex gap-x-4'>
                            <select className='flex rounded-lg w-30'>
                                <option>--Province--</option>
                                {
                                    provinces.map((province) => {
                                        return <option value={province}>{province}</option>
                                    })
                                }
                            </select>
                            <Formik
                                initialValues={{
                                    city: ''
                                }}
                                onSubmit={async (values) => {
                                    await axios.get(`http://localhost:8000/event?city=${values.city}`).then((req, res) => {
                                        console.log(req.data.length);
                                        for (let i = 0; i < req.data.length; i++) {
                                            let startTime = req.data[i]['start_time']
                                            let endTime = req.data[i]['end_time']
                                            if (startTime && endTime) {
                                                startTime = startTime.slice(0, 10)
                                                endTime = endTime.slice(0, 10)
                                            }
                                            req.data[i]['start_time'] = startTime;
                                            req.data[i]['end_time'] = endTime;
                                        }
                                        setRowData(req.data)
                                    });
                                    let obj = query;
                                    obj.city = values.city
                                    setQuery(obj);
                                }}>
                                {({ isSubmitting }) => {
                                    return (
                                        <Form className='flex grow max-w-full flex-rows gap-2'>
                                            <Field className='rounded-full flex grow' key='city' name='city' placeholder='Filter by City' />
                                            <button className='flex justify-center text-slate-100 text-medium font-medium rounded-full w-28 bg-indigo-500 hover:bg-indigo-300 px-4 py-4' type='submit' disabled={isSubmitting}> Search </button>
                                        </Form>);
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            <div className='columns-2'>
                <div style={{ height: 500 }}>
                    <AgGridReact
                        className="resizable border-indigo-500 border-2 rounded-lg"
                        rowData={rowData}
                        columnDefs={columnDefs}>
                    </AgGridReact>
                </div>
                <button className='text-slate-100 text-medium font-medium rounded-full w-40 bg-indigo-500 hover:bg-indigo-300 px-4 py-4'> Purchase Tickets </button>
            </div>
        </div >
    );
}