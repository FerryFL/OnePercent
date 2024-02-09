import { useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";

export const useProgressContext = () =>{
    const progress = useContext(ProgressContext)

    if(!progress){
        throw Error('Must be inside the provider')
    }

    return progress
}
