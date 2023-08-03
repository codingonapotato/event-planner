import { Link } from "react-router-dom";

export default function NotFound() {

    return (
        <div className="bg-zinc-900 min-w-full min-h-screen flex flex-col items-center justify-center">
            <div className="text-white text-8xl"><b>404</b></div>
            <div className="text-white text-base">Looks like we couldn't find your page</div>
            <div className="text-white text-base pt-2">Please return to the <Link to='/' replace={true}><b>home page</b></Link></div>
        </div>
    )
}