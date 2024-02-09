import { useParams } from "react-router-dom"
import ProgressFormUpdate from '../components/ProgressFormUpdate'

const Update = () =>{
    const { id } = useParams()
    return(
        <div>
            <ProgressFormUpdate idToUpdate={id}/>
        </div>
    )
}

export default Update