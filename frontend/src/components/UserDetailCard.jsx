import axios from 'axios'
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import { Formik, Field } from 'formik';

export default function UserDetailCard() {
    const [userInfo] = useOutletContext();
    const [editState, setEditState] = useState(false);
    const user = localStorage.getItem('user_id');
    const strings = [{ 'first_name': 'First Name' },
    { 'last_name': 'Last Name' },
    { 'email_address': 'E-mail' },
    { 'password': 'Password' },
    { 'balance': 'Balance' },
    { 'birthdate': 'Birthdate' },
    { 'street_num': 'Street Number' },
    { 'city': 'City' },
    { 'postal_code': 'Postal Code' }]

    function conditionalFormRender() {
        if (editState) {
            return (
                <>
                    <Formik
                        initialValues={{ first_name: '', last_name: '', email: '', password: '', birthdate: '', street_num: '', city: '', postal_code: '' }}
                        onSubmit={async (values) => {
                            let data = {};
                            for (key in values) {
                                if (values[key] !== userInfo[key]) {
                                    data[key] = values[key];
                                } else {
                                    data[key] = userInfo[key];
                                }
                            }
                            await axios.post('http://localhost:8000/user/', data, {
                                headers: { 'content-type': 'application/json' }
                            }).then(res => console.log(res))
                        }}>
                        {props => {
                            <Form>
                                <Field type="text" />
                            </Form>
                        }}
                    </Formik >
                </>
            );

        } else {
            return (
                < dl className="-my-3 divide-y divide-gray-100 text-sm" >
                    {strings.map((obj) => {
                        const key = Object.keys(obj)[0];
                        return (
                            <div key={key} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-gray-900">{obj[key]}</dt>
                                <dd className="text-gray-700 sm:col-span-2">{userInfo[key]}</dd>
                            </div>
                        );
                    })}
                </dl >
            );
        }
    }

    return (
        <>
            <div className="flow-root">
                <div className="placeholder" >
                    <svg
                        onClick={() => {
                            setEditState(true);
                            console.log(editState);
                        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:bg-gray-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <div>
                        {conditionalFormRender()}
                    </div>
                </div>


            </div >
        </>
    );
}