import { useAuthContext } from "../hooks/useAuthContext";
import { useReviewContext } from "../hooks/useReviewContext";

const ReviewAll = ({review}) =>{
    const {user} = useAuthContext()
    const {dispatch} = useReviewContext()
    const handleClick = async () => {
        const userConfirmed = window.confirm('You wanna delete it, sure?');
    
        if (userConfirmed) {
          const response = await fetch('https://one-percent-api.vercel.app/api/review/' + review._id, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            },
            method: 'DELETE'
          });
    
          const json = await response.json();
    
          if (response.ok) {
            dispatch({ type: 'DELETE_REVIEW', payload: json });
          }
        }
      };
    return(
        <div className="flex flex-col flex-wrap w-5/12 md:w-3/12 lg:w-2/12 h-min-20 bg-[#022B3A] text-[#E1E5F2] p-5 m-3">
            <p className="text-base font-bold md:text-xl md:font-bold mb-2">~ {review.name}</p>
            <p className="text-base md:font-semibold">{review.desc}</p>
            <button onClick={handleClick}>delete</button>
        </div>
    )
}

export default ReviewAll