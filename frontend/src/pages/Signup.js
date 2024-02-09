import SignupForm from "../components/SignupForm"
import { Link } from 'react-router-dom'

const Signup = () => {
    return(
        <div className="h-screen flex">
            <div className="px-2 w-5/12 md:w-4/12 bg-[#022B3A] text-[#E1E5F2] h-full flex  flex-col justify-center items-center">
                <h2 className="text-xl md:text-3xl lg:text-5xl font-bold mb-3">Joined?</h2>
                <p className="mb-4 md:mb-10 text-sm md:text-lg text-center">Continue Your Progress Now!</p>
                <Link to='/login'><button className="bg-[#E1E5F2] text-[#022B3A] text-base md:text-lg font-normal md:font-bold px-2 md:px-4 py-1 md:py-2 ">Login</button></Link>  
            </div>
            
            <div className="w-7/12 md:w-8/12 bg-[#E1E5F2] h-full flex justify-center items-center">
                <SignupForm/>
            </div>
        </div>
    )
}

export default Signup