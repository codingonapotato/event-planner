import axios from 'axios'
import { useState, useEffect, useId } from "react";
import { useOutletContext } from "react-router-dom"
import { Formik, Field, Form } from 'formik';

export default function UserDetailCard() {
    // consider changing back to use outlet context
    const [userInfo, setUserInfo] = useState({});
    const [dependants, setDependants] = useState([]);
    const [editState, setEditState] = useState(false);
    const [serverError, setServerError] = useState('');
    const [manageDependantState, setManageDependantState] = useState(false);

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
        axios.get(`http://localhost:8000/customer/dependant/${user}`)
            .then((res) => {
                setDependants(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    // All conditionally rendered HTML goes here <3
    function conditionalFormRender() {
        if (editState) {
            return (
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
                        // validate={(values) => {
                        //     const errors = {}
                        //     if (values.first_name == '') {
                        //         errors.first_name = `'First Name' field cannot be empty`
                        //     } else if (values.last_name == '') {
                        //         errors.last_name = `'Last Name' field cannot be empty`
                        //     } else if (values.phone_num.length != 10) {
                        //         errors.phone_num = `Phone Number should be 10 characters long`
                        //     } else if (values.balance < 0) {
                        //         errors.balance = `Balance cannot be negative`
                        //     } else if (!/.*@.*/.test(values.email_address)) {
                        //         errors.email_address = 'Invalid email address'
                        //     } else if (values.password == '') {
                        //         errors.password = 'Password cannot be empty'
                        //     } else if (values.birthdate.length != 10 || values.birthdate == '') {
                        //         errors.birthdate = `Birthdate should be "yyyy-mm-dd"`
                        //     } else if (values.street_num == '') {
                        //         errors.street_num = 'Street Number should not be empty'
                        //     } else if (values.city == '') {
                        //         errors.city = 'City should not be empty'
                        //     } else if (values.postal_code == '' || values.postal_code.length != 6) {
                        //         errors.postal_code = 'Postal code must be 6 characters long'
                        //     }
                        //     return errors;
                        // }}
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
                            }).then(res => {
                                setEditState(false);
                                alert(`Successfully updated user information! ^^`)
                            })
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

            );

        } else if (manageDependantState) {
            return (
                <div className='wrapper flex-1'>
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
                                let arr = dependants;
                                arr.push({ 'first_name': res.data[0]['first_name'], 'last_name': res.data[0]['last_name'], 'birthdate': res.data[0]['birthdate'] });
                                setDependants(arr)
                                alert('Dependant added successfully');
                            })
                        }}>
                        {({ isSubmitting }) => {
                            return (
                                <div className='wrapper flex gap-10'>
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
                                    <DependantsList />
                                </div>
                            )
                        }}
                    </Formik>
                </div >
            );

        } else {
            return (
                < div className="wrapper">
                    {strings.map((obj) => {
                        const key = Object.keys(obj)[0];
                        let val = userInfo[key];
                        if (key === 'password') {
                            val = '•••••••••'
                        } else if (key === 'birthdate') {
                            if (val) {
                                val = val.slice(0, 10);
                            } else {
                                val = '';
                            }
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
        } else if (manageDependantState) {
            return <h1> Manage Dependants</h1>
        } else {
            return <h1>User Profile</h1>
        }
    }

    return (
        <>
            <div className="flex-auto" >
                <div className='flex columns-2'>
                    <h1 className='flex-1 text-4xl font-bold px-4 py-4'> {generateHeading()} </h1>
                    <div className='flex w-40 justify-evenly gap-2 px-4 py-4'>
                        <div>
                            <svg onClick={() => {
                                setEditState(false);
                                setManageDependantState(false);
                            }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 hover:bg-gray-200">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </div>

                        <div>
                            <svg
                                onClick={() => {
                                    setEditState(!editState);
                                    setManageDependantState(false);
                                }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 hover:bg-gray-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </div>


                        <div >
                            <svg onClick={() => {
                                setManageDependantState(!manageDependantState);
                                setEditState(false);
                            }}
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 hover:bg-gray-200">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
                {conditionalFormRender()}

            </div >
        </>
    );
    function DependantsList() {
        let arr = dependants;
        return (
            <div className="drop-shadow-lg flex flex-col w-56 bg-white rounded-xl font-semibold p-5">
                <div className='text-3xl mb-4'>Your Dependants</div>
                {arr.map(dependant => {
                    return <DependantsItem key={dependant.first_name + dependant.last_name} dependant={dependant} />
                })}
            </div>
        )
    };

    function handleDelete(obj) {
        axios.delete(`http://localhost:8000/customer/dependant-remove/1`, { data: obj }).then((res) => {
            let arr = dependants.filter((e) => {
                return !(e['first_name'] == res.data[0]['first_name'] && e['last_name'] == res.data[0]['last_name'] && e['birthdate'] == res.data[0]['birthdate']);
            })
            alert(`${obj['first_name']} ${obj['last_name']} was deleted as a dependent`);
            setDependants(arr);
        });
    }

    function DependantsItem({
        dependant,
    }) {
        return (
            <div className='border-b-2 p-1 text-lg font-medium flex gap-10 py-2 justify-end'>
                {dependant.first_name + ' ' + dependant.last_name}
                <svg
                    onClick={() => {
                        handleDelete({ 'first_name': dependant['first_name'], 'last_name': dependant['last_name'], 'birthdate': dependant['birthdate'] });
                    }}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6 hover:bg-gray-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </div>
        )
    }
}

