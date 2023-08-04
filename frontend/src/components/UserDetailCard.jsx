import axios from 'axios'
import { useState, useEffect } from "react";

export default function UserDetailCard() {
    const [userInfo, setUserInfo] = useState([]);
    const [editState, setEditState] = useState(false);
    const user = localStorage.getItem('user_id');

    // Can be removed Ricky called it earlier so I can just use it here with the React Context thingy
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

    //Ricky says to use the field tag/component from Formik
    return (
        <>
            <div className="flow-root">
                <div className="placeholder" onClick={() => {
                    setEditState(true);
                    console.log(editState);
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </div>



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
            </div >
        </>
    );
}