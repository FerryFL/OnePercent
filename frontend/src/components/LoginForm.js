import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const LoginForm = () => {
    const [username, setUsername] = useState('')
    // const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <h3 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-10 text-[#022B3A]">Login</h3>

            <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} value={username} className="text-sm md:text-lg w-11/12 md:w-9/12 lg:w-8/12 font-normal shadow-sm focus:outline-none bg-[#022B3A] text-[#E1E5F2] p-2 md:p-5 mb-4 md:mb-7"></input>
{/* 
            <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} className="w-10/12 font-normal shadow-sm focus:outline-none bg-[#022B3A] text-[#E1E5F2] p-5 mb-7"></input> */}

            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} className="text-sm md:text-lg w-11/12 md:w-9/12 lg:w-8/12 font-normal shadow-sm focus:outline-none bg-[#022B3A] text-[#E1E5F2] p-2 md:p-5 mb-4 md:mb-7"></input>

            <button type="submit" disabled={isLoading} className="text-base md:text-lg bg-[#022B3A] text-[#E1E5F2] py-2 md:py-3 px-3 md:px-7 rounded-md md:rounded-lg mb-3">Login</button>

            {error && <div className="text-red-500">{error}</div>}
        </form>
    )
}

export default LoginForm