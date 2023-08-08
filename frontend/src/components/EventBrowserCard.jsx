
import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';

export default function EventBrowserCard() {
    const provinces = ['NL', 'PE', 'NS', 'NB', 'QC', 'ON', 'MB', 'SK', 'AB', 'BC', 'YT', 'NT', 'NU'];

    const [rowData, setRowData] = useState([
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxster", price: 72000 }
    ]);

    const [temp, setTemp] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/event/public/all').then((res) => {
            setRowData(res.data);
            // console.log(temp)
        })
    }, [])

    const [columnDefs] = useState([
        { field: 'event_id' },
        { field: 'name' },
        { field: 'start_time' },
        { field: 'end_time' },
        { field: 'street_num' },
        { field: 'street' },
        { field: 'postal_code' },
    ]);

    return (
        <div className="flex-auto py-2 ag-theme-alpine" style={{ height: 600 }}>
            {/* <select className='rounded'>
                <option>--Provinces--</option>
                {
                    provinces.map((province) => {
                        return <option value={province}>{province}</option>
                    })
                }
            </select> */}
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div >
    );
}