import { Link } from "react-router-dom"
import { HomeIcon, CalendarIcon, ArrowLeftOnRectangleIcon, ArrowLeftIcon } from "@heroicons/react/24/solid"

const navLinks = [
    {
        text: 'Dashboard',
        target: '/',
        icon: HomeIcon
    },
    {
        text: 'Browse Events',
        target: '/events',
        icon: CalendarIcon
    },
    {
        text: 'Browse Shifts',
        target: '/shifts',
        icon: CalendarIcon
    },
    {
        text: 'Sign out',
        target: '/login',
        icon: ArrowLeftOnRectangleIcon
    },
]


export default function Navbar({
    showNav,
    setShowNav,
}) {
    return (
        <>
            <nav className="flex flex-col space-y-5 bg-white min-h-screen">
                <div className="flex-initial p-8 border-b-2 text-center border-dashed mb-4">WHITESPACE</div>
                <ul className="space-y-5">
                    {navLinks.map((link) => {
                        return (
                            <li key={link.text}>
                                <NavLink 
                                    linkTarget={link.target}
                                    linkText={link.text}
                                    icon={link.icon}
                                />
                            </li>
                        )
                    })}

                </ul>
                <button
                    className="text-4xl flex items-center justify-center bg-slate-200 p-4"
                    onClick={() => setShowNav(!showNav)}
                >
                    <ArrowLeftIcon className="w-6 h-6"/>
                    
                </button>
            </nav>
        </>
    )
}

function NavLink({
    linkTarget,
    linkText,
    icon
}) {
    const Icon = icon;
    return (
        <Link to={linkTarget} replace={true}>
            <div className="flex flex-row items-center justify-start space-x-4 px-2">
                <Icon className="h-6 w-6 text-black" />
                <span 
                    className="inline-block pr-12 font-semibold"
                    onClick={() => {
                        if (linkTarget === '/login') {
                            localStorage.removeItem('user_id');
                        }
                    }}
                >
                    {linkText}
                </span>
            </div>
        </Link>
    )
}