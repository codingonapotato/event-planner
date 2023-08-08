import { Form, Field } from "formik"
import { eventDescriptors } from "../assets/constants"
import { useState, useEffect } from "react";

export default function EventForm({errors, touched, userInfo}) {
    const [eventDescriptor, setEventDescriptor] = useState('');

    useEffect(() => {
        setEventDescriptor(`${userInfo.first_name}'s ${eventDescriptors[Math.floor(Math.random() * eventDescriptors.length)]} Event`)
    }, [userInfo])

    return (
        <Form>
            <Field 
                component={CustomField}
                name="event_name" 
                placeholder={eventDescriptor}
                className='focus:border-b-indigo-500 rounded-lg w-2/3 text-3xl font-semibold mt-2'
                validate={requiredField}
            /> 
            {errors.event_name && touched.event_name ? <div className='text-sm font-semilight text-rose-500'>{errors.event_name}</div>: null}
            <div className='flex space-x-20 w-full mt-4'>
                <CustomInput labelFor='start-date' labelText='Starts At: '>
                    <Field id='start-date' component={CustomField} type='date' name='start_date' className='rounded-lg' validate={requiredField}/>
                    {errors.start_date && touched.start_date ? <div className='text-sm font-semilight text-rose-500'>{errors.start_date}</div>: null}
                    <Field component={CustomField} type='time' name='start_time' className='rounded-lg mt-2' validate={requiredField}/>
                    {errors.start_time && touched.start_time ? <div className='text-sm font-semilight text-rose-500'>{errors.start_time}</div>: null}
                </CustomInput>
                <CustomInput labelFor='end-date' labelText='Ends At: '>
                    <Field id='end-date' component={CustomField} type='date' name='end_date' className='rounded-lg' validate={requiredField}/>
                    {errors.end_date && touched.end_date ? <div className='text-sm font-semilight text-rose-500'>{errors.end_date}</div>: null}
                    <Field component={CustomField} type='time' name='end_time' className='rounded-lg mt-2' validate={requiredField}/>
                    {errors.end_time && touched.end_time ? <div className='text-sm font-semilight text-rose-500'>{errors.end_time}</div>: null}
                </CustomInput>
            </div>
                <div className='flex space-x-5 w-full mt-4'>
                    <CustomInput labelFor='address' labelText='Address: '> 
                        <Field id='address' component={CustomField} type='text' name='address' className='w-96 rounded-lg' validate={requiredField}/>
                        {errors.address && touched.address ? <div className='text-sm font-semilight text-rose-500'>{errors.address}</div>: null}
                    </CustomInput>
                    <CustomInput labelFor='city' labelText='City: '> 
                        <Field id='city' component={CustomField} type='text' name='city' className='w-48 rounded-lg' validate={requiredField}/>
                        {errors.city && touched.city ? <div className='text-sm font-semilight text-rose-500'>{errors.city}</div>: null}
                    </CustomInput>
                    <CustomInput labelFor='province' labelText='Province: '> 
                        <Field id='province' as='select' name='province' className='rounded-lg w-24' validate={requiredField}>
                            <option defaultValue="BC" value="BC">BC</option>
                            <option value="AB">AB</option>
                            <option value="SK">SK</option>
                            <option value="MB">MB</option>
                            <option value="ON">ON</option>
                            <option value="QC">QC</option>
                            <option value="NB">NB</option>
                            <option value="NS">NS</option>
                            <option value="PE">PE</option>
                            <option value="NL">NL</option>
                            <option value="YT">YT</option>
                            <option value="NT">NT</option>
                            <option value="NU">NU</option>
                        </Field>
                        {errors.province && touched.province ? <div className='text-sm font-semilight text-rose-500'>{errors.province}</div>: null}
                    </CustomInput>
                    <CustomInput labelFor='postal_code' labelText='Postal Code: '> 
                        <Field id='postal_code' component={CustomField} type='text' name='postal_code' className='w-24 rounded-lg' validate={requiredField}/>
                        {errors.postal_code && touched.postal_code ? <div className='text-sm font-semilight text-rose-500'>{errors.postal_code}</div>: null}
                    </CustomInput>
                </div>
                <div className='flex space-x-5 mt-4'>
                    <CustomInput labelFor='visibility' labelText='Visibility: '> 
                        <Field id='visibility' as='select' name='visibility' className='w-36 rounded-lg' validate={requiredField}>
                            <option value='Public'>Public</option>
                            <option value='Private'>Private</option>
                        </Field>
                        {errors.visibility && touched.visibility ? <div className='text-sm font-semilight text-rose-500'>{errors.visibility}</div>: null}
                    </CustomInput>
                    <CustomInput labelFor='budget' labelText='Budget ($): '>
                        <Field id='budget' component={CustomField} type='number' name='budget' className='w-36 rounded-lg' step='0.01' validate={requiredField}/>
                        {errors.budget && touched.budget ? <div className='text-sm font-semilight text-rose-500'>{errors.budget}</div>: null}
                    </CustomInput>
                </div>
                <button type='submit' className="focus:border-black rounded-lg w-48 mt-4 py-3 bg-indigo-500 text-white font-semibold">
                    Submit
                </button>
        </Form>
    )
}

const CustomInput = (props) => {
    return ( 
        <div className='flex flex-col'>
            <label htmlFor={props.labelFor}>{props.labelText}</label>
            {props.children}
        </div>
    )
}

const CustomField = ({field, form, ...props}) => {
    return (
        <input type={props.type} {...field} {...props}/>
    )
}

function requiredField(value) {
    let error;
    if (!value) {
        error = '*This field is required'
    }
    return error;
}