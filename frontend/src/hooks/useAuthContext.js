import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const useAuthContext = () => {
    const auth = useContext(AuthContext)

    if(!auth){
        throw Error('Must be inside the provider')
    }

    return auth
}