import { useState } from "react"
import axios from 'axios';
import { Formik, Form } from 'formik';
import Input from "./Input"

export default function RegisterPage() {
    const [serverError, setServerError] = useState('');
    const [registerStatus, setRegisterStatus] = useState(false);
    
    return (
        <div className='register-pattern flex flex-col min-h-screen min-w-full justify-center items-center'>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto rounded-lg">
                <div className="px-12 py-6 pb-12 w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                    <div className="py-2 mb-4">
                        <h1 className="text-2xl font-bold leading-tight tracking-tight text-center text-white">Register for an account</h1>
                    </div>
                    <Formik
                        initialValues={{
                            firstName: '', 
                            lastName: '',
                            email: '',
                            password: '',
                            birthdate: ''
                        }}
                        onSubmit={async (values, actions) => {
                                await axios.post('http://localhost:8000/user/register', {
                                    'firstName': values.firstName,
                                    'lastName': values.lastName,
                                    'email': values.email,
                                    'password': values.password,
                                    'birthdate': values.birthdate
                                }, {
                                    headers: {'content-type': 'application/json'}
                                })
                                .then((res) => {
                                    setRegisterStatus(true);
                                }, reason => {
                                    console.log(reason);
                                    setServerError('User with this email already exists')
                                });
                        }}
                        validate={(values) => {
                            setServerError('');
                            const errors = {};
                            if (!values.email) { 
                                errors.email = "Email is required" 
                            } else if (!/.*@.*/.test(values.email)) {
                                errors.email = 'Invalid email';
                            }

                            if (!values.password) {
                                errors.password = "Password is required"
                            } else if (!/[A-Za-z0-9-]{4}/.test(values.password)) {
                                errors.password = 'Invalid password';
                            }

                            return errors;
                        }}
                    >
                        {props => (
                            <Form>
                                <div className='flex flex-row space-x-4'>
                                    <Input 
                                        id={'registerFName'}
                                        type={'text'}
                                        labelText={'First Name'}
                                        onChange={props.handleChange}
                                        value={props.values.password} 
                                    />
                                    <Input 
                                        id={'registerLName'}
                                        type={'text'}
                                        labelText={'Last Name'}
                                        onChange={props.handleChange}
                                        value={props.values.lastName} 
                                    />
                                </div>
                                <Input 
                                    id={'registerBirthdate'}
                                    type={'date'}
                                    placeholder={'•••••••••'}
                                    labelText={'Birthdate'}
                                    customClass={'placeholder:text-gray-900'}
                                    onChange={props.handleChange}
                                    value={props.values.birthdate} 
                                />
                                <Input
                                    id={'registerEmail'}
                                    type={'email'}
                                    placeholder={'name@email.com'}
                                    labelText={'Email Address'}
                                    onChange={props.handleChange}
                                    value={props.values.email} 
                                />
                                <Input
                                    id={'registerPassword'}
                                    type={'password'}
                                    placeholder={'•••••••••'}
                                    labelText={'Password'}
                                    onChange={props.handleChange}
                                    value={props.values.password} 
                                />
                                <Input 
                                    id={'registerSubmit'}
                                    type={'submit'}
                                    customClass={'mt-2'}
                                    customColor={'bg-purple-50 dark:bg-purple-700'}
                                    value={'Register'} 
                                />
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}