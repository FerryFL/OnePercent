import { createContext, useReducer } from "react";

export const ProgressContext = createContext()

export const progressReducer = (state,action) =>{
    switch(action.type){
        case 'SET_PROGRESS':
            return{
                progress: action.payload
            }
        case 'CREATE_PROGRESS':
            return{
                progress: [action.payload, ...state.progress]
            }
        case 'UPDATE_PROGRESS':
            return {
                ...state,
                progress: state.progress.map((p) =>
                p._id === action.payload._id ? action.payload : p
                )
            };
        case 'DELETE_PROGRESS':
            return{
                progress: state.progress.filter((w)=>w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ProgressContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(progressReducer,{
        progress: null
    })

    return(
        <ProgressContext.Provider value={{...state,dispatch}}>
            {children}
        </ProgressContext.Provider>
    )
}