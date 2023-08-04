import { Link, NavLink } from "react-router-dom"
import { HomeIcon, TicketIcon, ArrowLeftOnRectangleIcon, DocumentTextIcon, CubeTransparentIcon, SquaresPlusIcon } from "@heroicons/react/24/solid"

const navLinks = [
    {
        text: 'Dashboard',
        target: '/',
        icon: HomeIcon
    },
    {
        text: 'My Events',
        target: '/manageEvent',
        icon: DocumentTextIcon
    },
    {
        text: 'Browse Events',
        target: '/events',
        icon: TicketIcon
    },
    {
        text: 'Browse Shifts',
        target: '/shifts',
        icon: SquaresPlusIcon
    },
    {
        text: 'Sign Out',
        target: '/login',
        icon: ArrowLeftOnRectangleIcon
    },
]

export default function Navbar() {
    return (
        <nav className="flex flex-col  bg-gray-800 min-h-screen">
            <div className="text-white flex-initial p-6 flex justify-center items-center text-center mb-2">
                <CubeTransparentIcon className="w-12 h-12 text-indigo-500"/>
            </div>
                {navLinks.map((link) => {
                    return (
                        <NavigationLink 
                            key={link.text}
                            linktarget={link.target}
                            linktext={link.text}
                            icon={link.icon}
                        />
                    )
                })}

        </nav>
    )
}

function NavigationLink({
    linktarget,
    linktext,
    icon
}) {
    const Icon = icon;
    return (
        <NavLink 
            to={linktarget} 
            replace={true}
            className={({isActive}) => 
                isActive ? "py-4 bg-indigo-500 text-teal-50" : "py-4"
            } 
        >
            <div className="flex flex-row items-center justify-start space-x-4 px-2">
                <Icon className="h-6 w-6 text-white" />
                <span 
                    className="inline-block pr-8 font-semibold text-white"
                    onClick={() => {
                        if (linktarget === '/login') {
                            localStorage.removeItem('user_id');
                        }
                    }}
                >
                    {linktext}
                </span>
            </div>
        </NavLink>
    )
}