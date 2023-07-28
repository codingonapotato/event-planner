import { useState } from "react";
import Input from "./Input";

export default function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto rounded-lg">
            <div className="px-12 py-6 w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 dark:text-blue-500 text-black">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                </div>

                <div className="py-2 mb-4">
                    <h1 className="text-2xl font-bold leading-tight tracking-tight text-center text-white">Sign in to your account</h1>
                </div>
                    <Input 
                        id={'email'}
                        type={'email'}
                        placeholder={'name@email.com'}
                        labelText={'Email Address'}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Input 
                        id={'password'}
                        type={'password'}
                        placeholder={'●●●●●●●●●●'}
                        labelText={'Password'}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <Input 
                        id={'submitLogin'}
                        type={"submit"}
                        value={'Sign in'}
                        customClass={'mt-5'}
                        customColor={'bg-purple-50 dark:bg-purple-700'}
                        pattern={'[a-zA-Z0-9]{7}'}
                    />
                    <p className='px-6 pt-4 pb-2 text-white'>Don't have an account? <b><a href='#'>Sign up</a></b></p>
            </div>
        </div>
    )
//     const [loginState, setLoginState] = useState();

//     const onChange = (e) => {
//         setLoginState({...loginState, [e.target.id]: e.target.value});
//     }

//     return (
//         <form>
//             <div>
//                 <Input 
//                     onChange={onChange}
//                     type={'email'}
//                     id={'email-address'}
//                     value={loginState['email-address']}

//                 />
//             </div>
//         </form>
//     )
}