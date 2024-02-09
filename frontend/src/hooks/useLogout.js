import { useAuthContext } from "./useAuthContext"
import { useProgressContext } from "./useProgressContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: progressDispatch } = useProgressContext()

    const logout = async () => {
        //remove user from local storage
        localStorage.removeItem('user')

        //remove from global variable
        dispatch({type: 'LOGOUT'})
        progressDispatch({type: 'SET_PROGRESS', payload: null})
    }

    return { logout }
}