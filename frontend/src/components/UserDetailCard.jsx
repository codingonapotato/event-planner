import axios from 'axios'
import { useState, useEffect, useId } from "react";
import { useOutletContext } from "react-router-dom"
import { Formik, Field, Form } from 'formik';

export default function UserDetailCard() {
    const [userInfo, setUserInfo] = useState({});
    const [editState, setEditState] = useState(false);
    const [addDependantState, setAddDependantState] = useState(false);
    const user = localStorage.getItem('user_id');
    const strings = [{ 'first_name': 'First Name' },
    { 'last_name': 'Last Name' },
    { 'phone_num': 'Phone Number' },
    { 'email_address': 'E-mail' },
    { 'password': 'Password' },
    { 'balance': 'Balance' },
    { 'birthdate': 'Birthdate' },
    { 'street_num': 'Street Number' },
    { 'street': 'Street' },
    { 'city': 'City' },
    { 'postal_code': 'Postal Code' }]

    // Use outlet context was being an ass
    useEffect(() => {
        axios.get(`http://localhost:8000/user/${user}`)
            .then((res) => {
                setUserInfo(res.data[0]);

            }).catch((err) => {
                console.log(err);
            })
    }, [])

    // All conditionally rendered HTML goes here <3
    function conditionalFormRender() {
        if (editState) {
            return (
                <>
                    <div className='flex-1 columns-2 px-4'>
                        <Formik
                            className='flex-1'
                            initialValues={{
                                first_name: '',
                                last_name: '',
                                phone_num: '',
                                balance: '',
                                email_address: '',
                                password: '',
                                birthdate: '',
                                street_num: '',
                                street: '',
                                city: '',
                                postal_code: ''
                            }}
                            onSubmit={async (values) => {
                                const data = { 'user_id': user };
                                for (let key in values) {
                                    if (values[key] !== userInfo[key] && values[key] !== '') {
                                        data[key] = values[key];
                                    } else {
                                        data[key] = userInfo[key];
                                    }
                                }
                                setUserInfo(data);

                                await axios.post(`http://localhost:8000/user/${user}/user-modify`, data, {
                                    headers: { 'content-type': 'application/json' }
                                }).then(res => console.log(`Received ${res.data[0]['first_name']} as a response`))
                            }}>
                            {({ isSubmitting }) => {
                                return (
                                    <div className='wrapper flex'>
                                        <Form className='flex flex-col columns-2'>
                                            {strings.map((obj) => {
                                                const key = Object.keys(obj)[0];
                                                return (
                                                    <div className='flex py-2 gap-10'>
                                                        <label className='px-4 flex-auto text-lg font-bold text-gray-950' htmlFor={key}>{obj[key]}</label>
                                                        <Field className='flex-1 text-lg' key={key} name={key} />
                                                    </div>
                                                );
                                            })}
                                            <button className='flex justify-center text-slate-100 w-36 rounded-full bg-indigo-500 hover:bg-indigo-300 px-4 py-4' type='submit' disabled={isSubmitting}> Submit Form </button>
                                        </Form>
                                    </div>);
                            }}
                        </Formik>
                    </div >
                </>
            );

        } else if (addDependantState) {
            return (
                <div className='wrapper'>
                    <Formik
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            birthdate: ''
                        }}
                        onSubmit={async (values) => {
                            const data = {}
                            for (let key in values) {
                                if (values[key] !== userInfo[key] && values[key] !== '') { // if stuff in values is not different than original and isn't empty string then it is significant
                                    data[key] = values[key];
                                } else {
                                    data[key] = userInfo[key];
                                }
                            }
                            await axios.put(`http://localhost:8000/customer/dependant-add/${user}`, data, {
                                headers: { 'content-type': 'application/json' }
                            }).then(res => {
                                console.log(`Successfully added dependant with first name: ${res.data[0]['first_name']} and last name: ${res.data[0]['last_name']}`)
                                alert('Dependant added successfully');
                            })
                        }}>
                        {({ isSubmitting }) => {
                            return (
                                <div className='wrapper flex'>
                                    <Form className='flex flex-col columns-2'>
                                        <div className='flex py-2 gap-10'>
                                            <label className='px-4 flex-auto text-lg font-bold text-gray-950' htmlFor='first_name'>First Name</label>
                                            <Field className='flex-1 text-lg' key='first_name' name='first_name' />
                                        </div>
                                        <div className='flex py-2 gap-10'>
                                            <label className='px-4 flex-auto text-lg font-bold text-gray-950' htmlFor='last_name'>Last Name</label>
                                            <Field className='flex-1 text-lg' key='last_name' name='last_name' />
                                        </div>
                                        <div className='flex py-2 gap-10'>
                                            <label className='px-4 flex-auto text-lg font-bold text-gray-950' htmlFor='birthdate'>Birthdate</label>
                                            <Field className='flex-1 text-lg' key='birthdate' name='birthdate' />
                                        </div>
                                        <button className='flex justify-center text-slate-100 w-36 rounded-full bg-indigo-500 hover:bg-indigo-300 px-4 py-4' type='submit' disabled={isSubmitting}> Submit Form </button>
                                    </Form>
                                </div>
                            )
                        }}
                    </Formik>
                </div>
            );

        } else {
            return (
                < div className="wrapper">
                    {strings.map((obj) => {
                        const key = Object.keys(obj)[0];
                        let val = userInfo[key];
                        if (key === 'password') {
                            val = '•••••••••'
                        }
                        return (
                            <>
                                <div key={key} className="flex-auto columns-2 px-4 py-2">
                                    <li key={`list` + key} className="flex text-lg font-bold text-gray-950">{obj[key]}</li>
                                    <li key={`answer` + key} className="flex text-lg text-gray-700">{val}</li>
                                </div>
                            </>
                        );
                    })}
                </div >
            );
        }
    }

    function generateHeading() {
        if (editState) {
            return <h1>Edit User Info</h1>
        } else if (addDependantState) {
            return <h1> Add Dependants</h1>
        } else {
            return <h1>User Profile</h1>
        }
    }

    return (
        <>
            <div className="flex-auto" >
                <div className='flex columns-2'>
                    <h1 className='flex-1 text-4xl font-bold px-4 py-4'> {generateHeading()} </h1>
                    <div className="flex items-right py-6 px-4">
                        <svg onClick={() => {
                            setEditState(false);
                            setAddDependantState(false);
                        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 hover:bg-gray-200">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>

                    <div className="flex items-right py-6 px-2">
                        <svg
                            onClick={() => {
                                setEditState(!editState);
                                setAddDependantState(false);
                            }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 hover:bg-gray-200">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </div>

                    <div className="flex items-right py-6 px-4">
                        <svg onClick={() => {
                            setAddDependantState(!addDependantState);
                            setEditState(false);
                        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 hover:bg-gray-200">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg>

                    </div>
                </div>
                {conditionalFormRender()}

            </div >
        </>
    );
}