import { useState } from "react"
import { useProgressContext } from "../hooks/useProgressContext"
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext" 

const ProgressForm = ()=>{
    const {dispatch} = useProgressContext()
    const navigate = useNavigate()

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [goal,setGoal] = useState('')
    const status = 'In Progress'
    const [error,setError] = useState(null)
    const {user} = useAuthContext()

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(!user){
            setError('You must be logged in')
            return
        }
        const progress = {title, description, goal, status}

        const response = await fetch('https://one-percent-api.vercel.app/api/progress',{
            method: 'POST',
            body: JSON.stringify(progress),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }else{
            alert("New Progress Added")
            setTitle('')
            setDescription('')
            setGoal('')
            setError(null)
            dispatch({type: 'CREATE_PROGRESS', payload: json})
            navigate('/')
        }
    }

    return(
        <div className="w-11/12 p-5 md:p-10 my-10 mx-auto bg-[#022B3A] text-[#E1E5F2]">
            <form onSubmit={handleSubmit}>
            
                <div className="w-full flex">
                    <h4 className="mx-auto text-lg md:text-2xl lg:text-3xl font-bold">Add New Progress</h4>
                </div>
            
                <div className="w-full flex flex-col md:flex-row my-5">
                    <div className="w-full md:w-4/12 p-3">
                        <p className="text-base md:text-lg lg:text-xl font-bold">Title</p>
                        <input type="text" placeholder="Add here..." onChange={(e)=>setTitle(e.target.value)} value={title} className="border-b-2 text-sm md:text-base shadow-sm focus:outline-none bg-transparent w-full md:py-3 py-2"></input>                  
                    </div>

                    <div className="w-full md:w-4/12 p-3">
                        <p className="text-base md:text-lg lg:text-xl font-bold">Description</p>
                        <input type="text" placeholder="Add here..." onChange={(e)=>setDescription(e.target.value)} value={description} className="border-b-2 text-sm md:text-base shadow-sm focus:outline-none bg-transparent w-full py-2 md:py-3"></input>
                    </div>
 
                    <div className="w-full md:w-4/12 p-3">
                        <p className="text-base md:text-lg lg:text-xl font-bold">Goal (Number in days)</p>
                        <input type="number" placeholder="Add here..." onChange={(e)=>setGoal(e.target.value)} value={goal} className="border-b-2 shadow-sm text-sm md:text-base focus:outline-none bg-transparent w-full py-2 md:py-3"></input>
                    </div>

                </div>
            
                <div className="w-8/12 flex justify-evenly mx-auto py-2 md:py-5">
                    <button type="submit" className="text-base md:text-lg font-semibold bg-[#E1E5F2] text-[#022B3A] px-3 md:px-4 py-1 md:py-2">Submit</button>
                    <Link to='/'><button className="text-base md:text-lg font-semibold bg-[#E1E5F2] text-[#022B3A] px-3 md:px-4 py-1 md:py-2">Back</button></Link>
                </div>

                {error&&<div className="text-red-500 text-center">{error}</div>}
            </form>
        </div>
    )
}

export default ProgressForm