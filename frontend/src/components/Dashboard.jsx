import { Navigate } from "react-router-dom"

export default function Dashboard() {
    const userID = localStorage.getItem('user_id');

    if (userID === null || userID < 0) {
        return (
            <Navigate to='/login' replace={true}/>
        )
    } else {
        return (
            <div className='min-w-min'>Dashboard</div>
        )
    }
}