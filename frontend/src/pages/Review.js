import { useEffect } from "react"
import { Link } from "react-router-dom" 
import ReviewAll from "../components/ReviewAll"
import ReviewForm from "../components/ReviewForm"
import { useReviewContext } from "../hooks/useReviewContext"
import { useAuthContext } from "../hooks/useAuthContext"

const Review = () =>{
    const { review, dispatch } = useReviewContext()
    const {user} = useAuthContext()

    useEffect(()=>{
        const fetchReview = async () =>{
            if(!user){
                return
            }
            const response = await fetch('http://localhost:4000/api/review', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_REVIEW', payload: json})
            }
        }
        fetchReview()
    },[dispatch,user])

    return(
        <div>
            <ReviewForm/>
            <div className="w-full flex justify-center">
                <Link to="/"><button className="text-base md:text-lg bg-[#022B3A] text-[#E1E5F2] py-2 px-5 md:px-7">Back</button></Link>
            </div>
            <div className="w-full p-4 flex flex-wrap justify-start mt-2 mx-auto">
                {
                    review && review.map((review)=>(
                        <ReviewAll key={review._id} review={review}/>
                    ))
                }
            </div>
            
            
        </div>
        
    )
}

export default Review