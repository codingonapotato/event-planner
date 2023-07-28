import { useState } from "react";
import Input from "./Input";

export default function LoginCard() {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
            <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-white">Sign in</h1>
                </div>

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