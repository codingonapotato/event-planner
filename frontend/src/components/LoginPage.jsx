import LoginCard from "./LoginCard"
import '../assets/backgrounds.css'

export default function LoginPage() {
    return (
        <div className='login-pattern flex flex-col min-h-screen min-w-full justify-center items-center'>
            <LoginCard />
        </div>
        // <div className="flex flex-col min-h-screen min-w-full bg-slate-200 dark:bg-gray-900 justify-center items-center">
        //     <LoginCard />
        // </div>
    )


}