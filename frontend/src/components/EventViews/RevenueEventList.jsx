import axios from "axios";
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";
import { itemColors } from "../../assets/constants";

export default function RevenueEventList() {
    const [events, user_id] = useOutletContext();
    const [eventRevenues, setEventRevenues] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/event/revenue/${user_id}`)
        .then(res => {
            setEventRevenues(res.data);
        }, err => {
            console.log(err);
        });

    }, [])

    return (
        <div className="scrollbar overflow-auto overscroll-auto flex flex-col mt-2 w-full space-y-1">
            {
                eventRevenues.map((event, i) => {
                    return <RevenueEventItem key={`event`+i} item={event} index={i} />
                })
            }
        </div>
    )
}

function RevenueEventItem({
    item,
    index
}) {
    return (
        <div className={`flex flex-row items-center justify-start rounded-lg p-3 py-3 ${itemColors[index % 2]}`}>
            <div className="text-xl font-semibold">
                {item.event_name}
            </div>
            <div className="flex-1 text-right font-semibold">
                {item.event_revenue}
            </div>

        </div>
    )
}
