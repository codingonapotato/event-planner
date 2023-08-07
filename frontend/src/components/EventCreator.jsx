import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { eventDescriptors } from "../assets/constants";
import { useState, useEffect } from "react";

export default function EventCreator() {
    const [userInfo] = useOutletContext();
    const [eventDescriptor, setEventDescriptor] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

    }, [])

    return (
        <div className="flex relative flex-col h-full">
            
                <button className='absolute z-10 m-2 top-2 left-4 max-w-fit rounded-full p-1 hover:bg-gray-100'>
                    <ArrowLeftIcon className='w-6 h-6' onClick={(e) => navigate(-1)}/>
                </button>
            

            <div className="flex flex-col flex-1 bg-white drop-shadow-md rounded-lg mx-4 my-2 pt-4 px-6">
                <Formik
                    initialValues={{
                        name: '',
                        start_date: '',
                        start_time: '',
                        end_date: '',
                        end_time: '',
                        visibility: '',
                        budget: 0,
                        address: '',
                        postal_code: '',
                        city: '',
                        province: ''
                    }}
                    onSubmit={async (values) => {
                        await axios.put('http://localhsot:8000/event', {
                            'name': values.name,
                            'start_time': values.start_time,
                            'end_time': values.end_time,
                            'visibility': values.visibility,
                            'budget': values.budget,
                            'organizer_id': userInfo.user_id,
                            'street_num': values.street_num,
                            'street': values.street,
                            'postal_code': values.postal_code,
                            'city': values.city,
                            'province': values.province 
                        })
                    }}>
                        {(props) => (
                            <Form className='m-2 space-y-4'>
                                <Field 
                                    component={NameInput}
                                    name="email" 
                                    placeholder={`${userInfo.first_name}'s ${eventDescriptors[Math.floor(Math.random() * eventDescriptors.length)]} Event`}
                                    className='focus:border-b-indigo-500 rounded-lg w-full text-3xl mt-4'
                                /> 
                                <div className='flex space-x-24 w-full mt-4'>
                                    <CustomInput labelFor='start-date' labelText='Starts At: '>
                                        <span className="flex space-x-4">
                                            <Field id='start-date' as={CustomField} type='date' name='start_date' className='rounded-lg'/>
                                            <Field component={CustomField} type='time' name='start_time' className='rounded-lg'/>
                                        </span>
                                    </CustomInput>
                                    <CustomInput labelFor='end-date' labelText='Ends At: '>
                                        <span className="flex space-x-4 justify-self-end">
                                            <Field id='end-date' as={CustomField} type='date' name='end_date' className='rounded-lg'/>
                                            <Field as={CustomField} type='time' name='end_time' className='rounded-lg'/>
                                        </span>
                                    </CustomInput>
                                </div>
                                    <div className='flex space-x-5 w-full mt-6'>
                                        <CustomInput labelFor='address' labelText='Address: '> 
                                            <Field id='address' as={CustomField} type='text' name='address' className='w-96 rounded-lg'/>
                                        </CustomInput>
                                        <CustomInput labelFor='city' labelText='City: '> 
                                            <Field id='city' as={CustomField} type='text' name='city' className='w-48 rounded-lg'/>
                                        </CustomInput>
                                        <CustomInput labelFor='province' labelText='Province: '> 
                                            <Field id='province' as='select' name='province' className='rounded-lg w-24'>
                                                <option value='BC'>BC</option>
                                                <option value='AB'>AB</option>
                                                <option value='SK'>SK</option>
                                                <option value='MB'>MB</option>
                                                <option value='ON'>ON</option>
                                                <option value='QC'>QC</option>
                                                <option value='NB'>NB</option>
                                                <option value='NS'>NS</option>
                                                <option value='PE'>PE</option>
                                                <option value='NL'>NL</option>
                                                <option value='YT'>YT</option>
                                                <option value='NT'>NT</option>
                                                <option value='NU'>NU</option>
                                            </Field>
                                        </CustomInput>
                                        <CustomInput labelFor='postal_code' labelText='Postal Code: '> 
                                            <Field id='postal_code' as={CustomField} type='text' name='postal_code' className='w-24 rounded-lg'/>
                                        </CustomInput>
                                    </div>
                                    <div className='flex space-x-5'>
                                        <CustomInput labelFor='visibility' labelText='Visibility: '> 
                                            <Field id='visibility' as='select' name='visibility' className='w-36 rounded-lg'>
                                                <option value='Public'>Public</option>
                                                <option value='Private'>Private</option>
                                            </Field>
                                        </CustomInput>
                                        <CustomInput labelFor='budget' labelText='Budget: '>
                                            <Field id='budget' as={CustomField} type='number' name='budget' className='w-24 rounded-lg' step='any'/>
                                        </CustomInput>
                                    
                                    </div>
                            </Form>
                        )}
                </Formik>
            </div>

        </div>
    )
}

const NameInput = (props) => (
    <div className='w-full focus:border-0'>
        <input className="w-full text-3xl border-b border-0 focus:border-0" type="text" {...props}/>
    </div>
)

const CustomInput = (props) => {
    return ( 
        <div className='flex flex-col'>
            <label htmlFor={props.labelFor}>{props.labelText}</label>
            {props.children}
        </div>
    )
}

const CustomField = (props) => {
    return (
        <input type={props.type} {...props}/>
    )
}