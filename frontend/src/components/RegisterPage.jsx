import { useState } from "react"
import axios from 'axios';
import { Formik, Form } from 'formik';
import Input from "./Input"
import { Navigate, Link } from "react-router-dom";

export default function RegisterPage() {
    const [serverError, setServerError] = useState('');
    const [registerStatus, setRegisterStatus] = useState(false);
    const date = new Date();
    
    return (
        <div className='login-pattern flex flex-col min-h-screen min-w-full justify-center items-center'>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto rounded-lg">
                <div className="px-12 py-6 w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                    <div className="py-2 mb-4">
                        <h1 className="text-2xl font-bold leading-tight tracking-tight text-center text-white">Register for an account</h1>
                    </div>
                    {(registerStatus) ? <Navigate to="/" replace={true} /> : null}
                    <Formik
                        initialValues={{
                            firstName: '', 
                            lastName: '',
                            email: '',
                            password: '',
                            birthdate: date.toISOString().slice(0,10)
                        }}
                        onSubmit={async (values) => {
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
                                    localStorage.setItem('user_id', res.data.user_id);
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
                                        id={'firstName'}
                                        type={'text'}
                                        labelText={'First Name'}
                                        onChange={props.handleChange}
                                        value={props.values.firstName} 
                                    />
                                    <Input 
                                        id={'lastName'}
                                        type={'text'}
                                        labelText={'Last Name'}
                                        onChange={props.handleChange}
                                        value={props.values.lastName} 
                                    />
                                </div>
                                <Input 
                                    id={'birthdate'}
                                    type={'date'}
                                    labelText={'Birthdate (YYYY-MM-DD)'}
                                    customClass={'placeholder:text-gray-900'}
                                    onChange={props.handleChange}
                                    value={props.values.birthdate} 
                                    onClick={(e) => e.preventDefault()}
                                />
                                <Input
                                    id={'email'}
                                    type={'email'}
                                    placeholder={'name@email.com'}
                                    labelText={'Email Address'}
                                    onChange={props.handleChange}
                                    value={props.values.email} 
                                />
                                {(serverError) ? <div className="text-sm dark:text-red-400">{serverError}</div> :
                                (props.errors.email && props.touched.email) ? <div className="text-sm dark:text-red-400">{props.errors.email}</div> : null}
                                <Input
                                    id={'password'}
                                    type={'password'}
                                    placeholder={'•••••••••'}
                                    labelText={'Password'}
                                    onChange={props.handleChange}
                                    value={props.values.password} 
                                />
                                {(props.errors.password && props.touched.password) ? <div className="text-sm dark:text-red-400">{props.errors.password}</div> : null}
                                <Input 
                                    id={'submit'}
                                    type={'submit'}
                                    customClass={'mt-2'}
                                    customColor={'bg-purple-50 dark:bg-purple-700'}
                                    value={'Register'} 
                                />
                            </Form>
                        )}
                    </Formik>
                    <p className='px-6 pt-3 text-white text-center'>Have an account already? <Link to="/login"><b>Log in</b></Link></p>
                </div>
            </div>
        </div>
    )
}