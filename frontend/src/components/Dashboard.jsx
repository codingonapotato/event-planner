import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"

export default function Dashboard() {
    const [userID, setUserID] = useState(-1);
    useEffect(() => {
        setUserID(localStorage.getItem('user_id'));
    })
    return (
        <>
            {(userID < 0) ? <Navigate to='/login' replace={true} /> : null}
            <h1>Dashboard</h1>
        </>
    )
}