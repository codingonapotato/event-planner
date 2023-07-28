import { useState } from "react";
import Input from "./Input";

export default function LoginCard() {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
            <div className="pl-12 pr-12 pb-12 pt-6 w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 mb-4">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-white">Sign in to your account</h1>
                </div>
                <Input 
                    id={'email'}
                    type={'email'}
                    placeholder={'name@email.com'}
                    labelText={'Email Address'}
                />
                <Input 
                    id={'password'}
                    type={'password'}
                    placeholder={'●●●●●●●●●●'}
                    labelText={'Password'}
                />

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