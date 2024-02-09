import { createContext, useReducer } from 'react'

export const ReviewContext = createContext()

export const reviewReducer = (state,action) => {
    switch(action.type){
        case 'SET_REVIEW':
            return{
                review: action.payload
            }
        case 'CREATE_REVIEW':
            return{
                review: [...state.review, action.payload]
            }
        case 'DELETE_REVIEW':
            return{
                progress: state.review.filter((w)=>w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ReviewContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reviewReducer, {
        review:null
    })

    return(
        <ReviewContext.Provider value={{...state, dispatch}}>
            { children }
        </ReviewContext.Provider>
    )
}