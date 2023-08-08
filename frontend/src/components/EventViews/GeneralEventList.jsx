import { PencilSquareIcon, ClockIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useOutletContext, Link } from "react-router-dom";
import { dateColors, itemColors, monthNames } from "../../assets/constants";

export default function GeneralEventList() {
    const [events] = useOutletContext();
    return (
        <div className="scrollbar overflow-auto overscroll-auto flex flex-col mt-2 w-full space-y-1">
            {
                events.map((event, i) => {
                    return <GeneralEventItem key={`event`+i} item={event} index={i} />
                })
            }
        </div>
    )
}

function GeneralEventItem({
    item,
    index
}) {
    const startDate = new Date(item.start_time);
    const endDate = new Date(item.end_time);
    const startTime = String(startDate.getUTCHours()).padStart(2,'0') + ':' + String(startDate.getUTCMinutes()).padStart(2,'0'); 
    const endTime = String(endDate.getUTCHours()).padStart(2,'0') + ':' + String(endDate.getUTCMinutes()).padStart(2,'0'); 

    return (
        <div className={`flex flex-row rounded-lg p-3 py-3 space-x-4 ${itemColors[index % 2]}`}>
            <DateBox date={startDate} index={index} />
            <div className='flex-1 flex flex-col'>
                <div className='font-semibold text-xl'>{item.name}</div>
                <div className='flex-1 flex items-center space-x-8'>
                    <div className='flex flex-row space-x-1 items-center'>
                        <MapPinIcon className='w-5 h-5 text-black' />
                        <span className='font-semilight'>
                            {item.street_num + ' ' + item.street + ', ' + item.city + ' ' + item.province + ' ' + item.postal_code}
                        </span>
                    </div>
                    <div className='flex flex-row space-x-1 items-center'>
                        <ClockIcon className='w-5 h-5 text-black' />
                        <span className='font-semilight'>
                            {(endDate.getUTCDate() != startDate.getUTCDate()) ? 
                            startTime + ' - ' + monthNames[endDate.getUTCMonth()] + ' ' + endDate.getUTCDate() + ' ' + endTime : 
                            startTime + ' - ' + endTime 
                            }
                        </span>
                    </div>
                </div>
            </div>
            <Link className='self-center pr-2' to={`/editEvent/${item.event_id}`}>
                <div className={`hover:bg-gray-200 p-2 rounded-full`}>
                    <PencilSquareIcon className='w-6 h-6 text-black' />
                </div>
            </Link>
        </div>
    )

}

function DateBox({
    date,
    index
}) {
    return (
        <div className={`flex flex-start -space-y-1.5 flex-col py-0.5 px-3 rounded-md justify-center items-center ${dateColors[index % dateColors.length]}`}>
            <span className='text-white font-semibold text-md'>{date.getUTCDate()}</span>
            <span className='text-white font-semibold text-md align-top'>{monthNames[date.getUTCMonth()].toUpperCase()}</span>
            <span className='text-white font-semibold text-md align-top'>{date.getUTCFullYear()}</span>
        </div>
    )
}