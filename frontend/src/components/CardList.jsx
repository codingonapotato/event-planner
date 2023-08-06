import { Link } from "react-router-dom";
import { getDateString } from "../assets/constants";

export default function CardList({
    items,
    type,
    redirectTarget
}) {
    return (
        <div className="flex flex-col w-1/3 px-3">
            <div className='border-b-2 border-b-slate-400/50 text-3xl self-start font-semibold mb-3'>Upcoming {type}</div>
            <div className="flex flex-col space-y-2.5">
                {(items.length === 0) ? 
                <>
                    <div className='font-semibold'>It looks like you don't have any upcoming {type}</div>
                    <Link to={redirectTarget} replace={true} className='w-2/3 font-semibold text-white flex p-4 rounded-xl items-center justify-center bg-indigo-500'>
                        Browse {type}
                    </Link>
                </>
                : items.map(item => {
                    return <ListItem key={item.name} item={item} type={type}/>
                })}
            </div>
        </div>
    )
}


function ListItem({
    item,
    type
}) {
    const startDate = new Date(item.start_time);
    const endDate = new Date(item.end_time);

    return (
        <div className='flex flex-col p-4 bg-white rounded-lg space-y-0.5 drop-shadow-md min-w-fit'>
            <div className='flex'>
                <span className='min-w-fit text-xl text-black font-semibold flex items-center'>
                    {item.name}
                </span>
                <span className='hidden flex-1 min-w-min text-black font-light lg:flex flex-nowrap items-center justify-end'>
                    {(type === 'Events') ? `${item.count} ticket(s) held` : item.role}
                </span>
            </div>
            <div className='font-normal text-left'>
                {item.street_num + ' ' + item.street + ', ' + item.city + ' ' + item.province + ' ' + item.postal_code}
            </div>
            <div className='font-light text-left'>
                {getDateString(startDate) + ' - ' + getDateString(endDate)}
            </div>
        </div>
    )

}