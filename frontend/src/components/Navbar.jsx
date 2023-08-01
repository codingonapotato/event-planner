import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <div className="flex flex-col">
        </div>
    )

}

function NavLink() {
    return (
        <div className="flex flex-row items-center justify-center">
            <Link to="/" replace={true} />
        </div>
    )
}