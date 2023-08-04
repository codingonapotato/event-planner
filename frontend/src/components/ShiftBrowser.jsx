import ShiftTable from "./ShiftTable"

export default function ShiftBrowser() {
    return (
        <>

        <div className="m-6">

            {/* Table of your shifts */}
            <div className='text-left text-3xl m-4 font-semibold'>Your Shifts</div>
            <ShiftTable />
            
            {/* Table of available shifts*/}
            <div className='text-left text-3xl m-4 font-semibold'>Available Shifts</div>


            {/* Table of all shifts of event (if organizer)*/}
            <div className='text-left text-3xl m-4 font-semibold'>Available Shifts</div>


            {/* Create shift  (if organizer)*/}



        </div>
        
        </>
        
        
    )
}