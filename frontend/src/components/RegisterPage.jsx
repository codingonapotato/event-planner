import { useState } from "react"
import Input from "./Input"

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birtdate, setBirthdate] = useState('');
    
    return (
        <h1>Registration Page</h1>
    )
}