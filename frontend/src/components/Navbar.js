import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () =>{
    const { logout } = useLogout()
    const { user } = useAuthContext()
    
    const handleClick = () => {
        logout()
    }

    return(
    <div className="flex justify-between bg-[#022B3A] text-[#E1E5F2]">
        <div className="flex">
            <Link to="/" className="flex items-center xl:text-3xl md:text-2xl text-xl font-bold md:px-5 px-2 py-6">
                <h1>OnePercent</h1>
            </Link>
            {user&&
                <div className="flex items-center">
                    <Link to='/about' className="text-base md:text-xl md:px-5 px-2 py-7">
                        <h4>About</h4>
                    </Link>
                    <Link to='/review' className="text-base md:text-xl md:px-5 px-2 py-7">
                        <h4>Review</h4>
                    </Link>
                </div>
            }
        </div>
        <div className="flex items-center">

            {user&&
                <div className="flex items-center">
                    <p className="text-lg md:text-xl font-semibold">Hi {user.username}!</p>
                    <button className="text-base md:text-xl md:px-5 px-3 py-7" onClick={handleClick}>Logout</button>
                </div>
            }
            {!user&&
                <div className="flex items-center">
                    <Link to='/login' className="text-lg px-5 py-7">
                        <h4>Login</h4>
                    </Link>
                    <Link to='/signup' className="text-lg px-5 py-7">
                        <h4>Sign Up</h4>
                    </Link>
                </div>
            }
            
        </div>
    </div>
    )
}

export default Navbar