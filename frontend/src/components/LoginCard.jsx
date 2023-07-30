import { useState } from "react";
import Input from "./Input";
import { Formik, Form } from 'formik';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function LoginCard() {
    const [serverError, setServerError] = useState('')

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto rounded-lg">
            <div className="px-12 py-6 w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 dark:text-blue-500 text-black">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                </div>

                <div className="py-2 mb-4">
                    <h1 className="text-2xl font-bold leading-tight tracking-tight text-center text-white">Sign in to your account</h1>
                </div>
                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={async (values, actions) => {
                            await axios.post('http://localhost:8000/user/login', {
                                'email': values.email,
                                'password': values.password
                            }, {
                                headers: {'content-type': 'application/json'}
                            })
                            .then((res) => {
                                localStorage.setItem('user_id', res.data.user_id);
                            }, reason => {
                                console.log(reason);
                                setServerError('Email or password not found')
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
                            <Input 
                                id={'loginEmail'}
                                type={'email'}
                                placeholder={'name@email.com'}
                                labelText={'Email Address'}
                                onChange={props.handleChange}
                                value={props.values.email}
                            />
                            {(serverError) ? <div className="text-sm dark:text-red-400">{serverError}</div> :
                            (props.errors.email && props.touched.email) ? <div className="text-sm dark:text-red-400">{props.errors.email}</div> : null}
                            <Input 
                                id={'loginPassword'}
                                type={'password'}
                                placeholder={'•••••••••'}
                                labelText={'Password'}
                                onChange={props.handleChange}
                                value={props.values.password}
                            />
                            {(serverError) ? <div className="text-sm dark:text-red-400">{serverError}</div> :
                            (props.errors.password && props.touched.password) ? <div className="text-sm dark:text-red-400">{props.errors.password}</div> : null}
                            <Input 
                                id={'submitLogin'}
                                type={"submit"}
                                value={'Sign in'}
                                customClass={'mt-2'}
                                customColor={'bg-purple-50 dark:bg-purple-700'}
                                pattern={'[a-zA-Z0-9]{7}'}
                            />
                        </Form>
                    )}
                </Formik>
                <p className='px-6 pt-4 pb-2 text-white'>Don't have an account? <Link to="/register"><b>Sign up</b></Link></p>
            </div>
        </div>
    )
}