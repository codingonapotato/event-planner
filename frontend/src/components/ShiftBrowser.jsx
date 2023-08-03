import ShiftTable from "./ShiftCard"

export default function ShiftBrowser() {
    return (
        <>
        <div className="m-6">
        <div className='text-left text-2xl m-4 font-semibold'>Your Shifts</div>
            <ShiftTable />
            </div>
        
        </>
        
    )
}