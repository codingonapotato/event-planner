import axios from 'axios'
import { useState, useEffect } from "react";

export default function UserDetailCard() {
    const [userInfo, setUserInfo] = useState([]);
    // const user = localStorage.getItem('user_id');
    const user = 2;

    useEffect(() => {
        axios.get(`http://localhost:8000/user/${user}`).then((res) => {
            setUserInfo(res.data[0]);
        }).catch((err) => {
            if (err.reponse) {
                console.error('Error response received')
            } else if (err.request) {
                console.error('Client did not receive a response')
            } else {
                console.error('Something went wrong but iunno what man')
            }
        })
    }, []);

    // maybe have the dd tag thing have a field child so when I click on the edit button BAM the field takes inputs
    // Or I mean I guess I could just have it pop-up upon clicking "edit information or something" maybe onClick change all the dd's to form fields
    return (
        <>
            <div className="flow-root">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">First Name</dt>
                        <dd className="text-gray-700 sm:col-span-2">{userInfo['first_name']}</dd>

                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Last Name</dt>
                        <dd className="text-gray-700 sm:col-span-2">{userInfo['last_name']}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Email</dt>
                        <dd className="text-gray-700 sm:col-span-2">{userInfo['email_address']}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Password</dt>
                        <dd className="text-gray-700 sm:col-span-2">•••••••••</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Balance</dt>
                        <dd className="text-gray-700 sm:col-span-2">{userInfo['balance']}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Birthdate</dt>
                        <dd className="text-gray-700 sm:col-span-2">{String(userInfo['birthdate']).slice(0, 10)}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Street Number</dt>
                        <dd className="text-gray-700 sm:col-span-2">{userInfo['street_num']}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Street Address</dt>
                        <dd className="text-gray-700 sm:col-span-2">{userInfo['street']}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">City</dt>
                        <dd className="text-gray-700 sm:col-span-2">{userInfo['city'] !== 'undefined' ? userInfo['city'] : ''}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Postal Code</dt>
                        <dd className="text-gray-700 sm:col-span-2">{userInfo['postal_code']}</dd>
                    </div>
                </dl>
            </div>
        </>
    );
}