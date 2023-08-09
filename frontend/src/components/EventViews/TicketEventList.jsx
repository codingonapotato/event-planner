import axios from "axios";
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";
import { itemColors } from "../../assets/constants";

export default function TicketEventList() {
    const [events, user_id] = useOutletContext();
    const [avgTickets, setAvgTickets] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/organizer/${user_id}/avgTickets`)
        .then(res => {
            setAvgTickets(res.data);
        }, err => {
            console.log(err);
        });

    }, [])

    return (
        <div className="scrollbar overflow-auto overscroll-auto flex flex-col mt-2 w-full space-y-1">
            {
                avgTickets.map((avg, i) => {
                    return <AvgTicketItem key={`event`+i} item={avg} index={i} />
                })
            }
        </div>
    )
}

function AvgTicketItem({
    item,
    index
}) {
    return (
        <div className={`flex flex-row items-center justify-start rounded-lg p-3 py-3 ${itemColors[index % 2]}`}>
            <div className="text-xl font-semibold">
                {item.name}
            </div>
            <div className="flex-1 text-right font-semibold">
                {'On average, ' + parseFloat(item.avg).toFixed(2) + ' ticket(s) bought per customer'}
            </div>

        </div>
    )
}