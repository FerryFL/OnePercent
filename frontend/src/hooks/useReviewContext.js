import { useContext } from "react";
import { ReviewContext } from "../context/ReviewContext";

export const useReviewContext = () => {
    const review = useContext(ReviewContext)

    if(!review){
        throw Error('Must be inside the provider')
    }

    return review
}