import { useState, useEffect } from "react";
import { useProgressContext } from "../hooks/useProgressContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ProgressFormUpdate = ({ idToUpdate }) => {
  const { dispatch } = useProgressContext();
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const {user} = useAuthContext()

  useEffect(() => {
    // If an idToUpdate is provided, fetch the progress details and set the form fields
    if (idToUpdate) {
      const fetchProgressDetails = async () => {
        try {
          const response = await fetch(`https://one-percent-api.vercel.app/api/progress/${idToUpdate}`, {
            headers:{
              'Authorization': `Bearer ${user.token}`
            }
          });
          const json = await response.json();

          if (!response.ok) {
            setError(json.error);
          } else {
            setTitle(json.title);
            setDescription(json.description);
            setGoal(json.goal);
            setStatus(json.status);
          }
        } catch (error) {
          console.error("Error fetching progress details:", error);
        }
      };

      fetchProgressDetails();
    }
  }, [idToUpdate, user]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(!user){
      setError('You must be logged in')
      return 
    }

    if (idToUpdate ) {
      // If idToUpdate is provided, update the existing progress
      
      const progress = { title, description, goal, status }

      const response = await fetch(`https://one-percent-api.vercel.app/api/progress/${idToUpdate}`, {
        method: "PATCH",
        body: JSON.stringify(progress),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        
        alert("Progress Updated")
        setError(null)
        dispatch({ type: "UPDATE_PROGRESS", payload: json })
        navigate('/')
      }
    } 
  };

  return (
    <div className="w-11/12 p-10 my-10 mx-auto bg-[#022B3A] text-[#E1E5F2]">
            <form onSubmit={handleSubmit}>
            
                <div className="w-full flex">
                    <h4 className="mx-auto text-2xl font-bold">Update Progress</h4>
                </div>
            
                <div className="w-full flex my-5">
                    <div className="w-4/12 text-lg font-semibold p-3">
                        <p>Title</p>
                        <input type="text" placeholder="Add here..." onChange={(e)=>setTitle(e.target.value)} value={title} className="border-b-2 font-normal shadow-sm focus:outline-none bg-transparent w-full py-3"></input>                  
                    </div>

                    <div className="w-4/12 text-lg font-semibold p-3">
                        <p>Description</p>
                        <input type="text" placeholder="Add here..." onChange={(e)=>setDescription(e.target.value)} value={description} className="border-b-2 font-normal shadow-sm focus:outline-none bg-transparent w-full py-3"></input>
                    </div>
 
                    <div className="w-4/12 text-lg font-semibold p-3">
                        <p>Goal</p>
                        <input type="number" placeholder="Add here..." onChange={(e)=>setGoal(e.target.value)} value={goal} className="border-b-2 font-normal shadow-sm focus:outline-none bg-transparent w-full py-3"></input>
                    </div>

                </div>
            
                <div className="w-8/12 flex justify-evenly mx-auto py-5">
                    <button type="submit" className="text-lg font-semibold bg-[#E1E5F2] text-[#022B3A] px-4 py-2">Submit</button>
                    <Link to='/'><button className="text-lg font-semibold bg-[#E1E5F2] text-[#022B3A] px-4 py-2">Back</button></Link>
                </div>

                {error&&<div className="text-red-500 text-center">{error}</div>}
            </form>
        </div>
  );
};

export default ProgressFormUpdate;
