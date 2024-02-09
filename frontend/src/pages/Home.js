import { useEffect, useState } from "react"
import ProgressAll from "../components/ProgressAll"
import { useProgressContext } from "../hooks/useProgressContext"
import { Link } from "react-router-dom"
import axios from 'axios'
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () =>{
    const {progress, dispatch} = useProgressContext()
    const [quotes,setQuotes] = useState()
    const {user} = useAuthContext()

    useEffect(() =>{
        const fetchProgress = async ()=>{
            const response = await fetch('https://one-percent-api.vercel.app/api/progress', {
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_PROGRESS', payload: json})
            }
        }
        if(user){
            fetchProgress()
        }

    },[dispatch, user])

    const fetchApi = async () => {
        const response = await axios.get('https://api.quotable.io/random');
        console.log(response.data);
        setQuotes(response.data)
    }

    useEffect(()=>{
        fetchApi()
    },[])

    return(
        <div className="w-full">
            <div className="w-11/12 flex justify-center mx-auto py-7 md:py-10">
                <p className="text-base md:text-lg xl:text-xl"><strong>"{quotes?.content}"</strong> {quotes?'-':''} {quotes?.author}</p>
            </div>

            <div className="w-full flex justify-center">
                <button onClick={fetchApi} className="text-base md:text-lg bg-[#022B3A] text-[#E1E5F2] py-3 px-7">Generate New Quotes</button>
            </div>

            <div className="w-full flex justify-center mt-12 md:mt-20">
                <Link to='/create'><button className="text-base md:text-lg bg-[#022B3A] text-[#E1E5F2] py-3 px-7">Create New Progress</button></Link>
            </div>

            
            {progress && progress.map((progress)=>(
                <ProgressAll key={progress._id} progress={progress}/>
            ))
            }
            
        </div>
    )
}

export default Home