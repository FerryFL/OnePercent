import { useState } from "react"
import { useReviewContext } from "../hooks/useReviewContext"
import { useAuthContext } from "../hooks/useAuthContext"

const ReviewForm = () =>{
    const { dispatch } = useReviewContext()
    const { user } = useAuthContext()
    const [name, setName] = useState(user?user.username: '')
    const [desc, setDesc] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async(e) =>{
        e.preventDefault()

        if(!user){
            setError('You must be logged in')
            return
        }

        const review = { name, desc }

        const response = await fetch('https://one-percent-api.vercel.app/api/review',{
            method: 'POST',
            body: JSON.stringify(review),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }else{
            setName('')
            setDesc('')
            setError(null)
            dispatch({type:'CREATE_REVIEW', payload: json})
            alert('New Review Added')
        }
    }

    return(
        <div className="w-full my-4 md:my-6 lg:my-8">
            <form onSubmit={handleSubmit} className="flex items-stretch min-h-14 md:min-h-20 lg:w-8/12 xl:w-7/12 w-9/12 mx-auto bg-[#022B3A] text-[#E1E5F2]">
                {/* <div className="w-4/12 flex items-center">
                    <input type="text" placeholder="Name..." onChange={(e)=>setName(e.target.value)} value={name} className=" font-normal shadow-sm mx-auto focus:outline-none bg-transparent w-10/12 p-2"></input>
                </div> */}
                
                <div className="w-10/12 flex items-center">
                    <input type="text" placeholder="Comment..." onChange={(e)=>setDesc(e.target.value)} value={desc} className="text-base md:text-lg font-normal shadow-sm mx-auto focus:outline-none bg-transparent w-10/12"></input>
                </div>
                
                <div className="w-2/12">
                    <button type="submit" className="w-full h-full text-base md:text-lg">Send</button>
                </div>

                
            </form>
            {error&&<div className="text-center text-red-500">{error}</div>}
        </div>
    )
}

export default ReviewForm