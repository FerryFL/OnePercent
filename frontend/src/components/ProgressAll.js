import { Link } from "react-router-dom";
import { useProgressContext } from "../hooks/useProgressContext";
import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ProgressAll = ({ progress }) => {
  const { dispatch } = useProgressContext();
  const [status, setStatus] = useState(() => {
    // Retrieve status from localStorage or default to progress.status
    return localStorage.getItem(`status_${progress._id}`) || progress.status;
  });
  const [passed, setPassed] = useState('Not Passed');
  const [deadline, setDeadline] = useState('');
  const {user} = useAuthContext()

  useEffect(() => {
    localStorage.setItem(`status_${progress._id}`, status);

    const calculateDeadline = () => {
      // Get the date when the progress was created
      const createdAtDate = new Date(progress.createdAt);
    
      // Calculate the deadline in milliseconds based on the goal
      const deadlineInMilliseconds = progress.goal * 24 * 60 * 60 * 1000;
    
      // Get the current date and time
      const currentDateTime = new Date();
    
      // Calculate the remaining time in milliseconds
      const remainingMilliseconds = Math.max(0, deadlineInMilliseconds - (currentDateTime - createdAtDate));
    
      // Check if the deadline has passed
      if (remainingMilliseconds <= 0) {
        // If so, set 'Passed' and update status if 'In Progress'
        setPassed('Passed');
        if (status === 'In Progress') {
          setStatus('Failed');
        }
        return 'Deadline Has Passed';
      }
    
      // Calculate remaining time in years, months, days, hours, minutes, and seconds
      const remainingYears = Math.floor(remainingMilliseconds / (365 * 24 * 60 * 60 * 1000));
      const remainingMonths = Math.floor((remainingMilliseconds % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
      const remainingDays = Math.floor((remainingMilliseconds % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
      const remainingHours = Math.floor((remainingMilliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const remainingMinutes = Math.floor((remainingMilliseconds % (60 * 60 * 1000)) / (60 * 1000));
      const remainingSeconds = Math.floor((remainingMilliseconds % (60 * 1000)) / 1000);
    
      // Create an array to hold non-zero time units
      const timeUnits = [];
    
      // Check and add non-zero time units to the array
      if (remainingYears > 0) {
        timeUnits.push(`${remainingYears} Years`);
      }
      if (remainingMonths > 0) {
        timeUnits.push(`${remainingMonths} Months`);
      }
      if (remainingDays > 0) {
        timeUnits.push(`${remainingDays} Days`);
      }
      if (remainingHours > 0) {
        timeUnits.push(`${remainingHours} Hours`);
      }
      if (remainingMinutes > 0) {
        timeUnits.push(`${remainingMinutes} Minutes`);
      }
      if (remainingSeconds > 0) {
        timeUnits.push(`${remainingSeconds} Seconds`);
      }
    
      // Join the non-zero time units with a comma and space
      const result = timeUnits.join(', ');
    
      // Return the formatted result with 'Remaining'
      return result + ' Remaining';
    }
    
    
    

    const calculateAndUpdateDeadline = () => {
      setDeadline(status === 'Success' || status === 'Failed' ? '' : calculateDeadline());
    };
  
    // Set up an interval to update every second
    const interval = setInterval(calculateAndUpdateDeadline, 1000);
  
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
    
  }, [status, progress.goal, progress.createdAt, deadline, progress._id]);

  const handleClick = async () => {
    const userConfirmed = window.confirm('You wanna delete it, sure?');

    if (userConfirmed) {
      const response = await fetch('https://one-percent-api.vercel.app/api/progress/' + progress._id, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        method: 'DELETE'
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'DELETE_PROGRESS', payload: json });
      }
    }
  };

  const handleStatus = async () => {
    let newStatus;

    if (status === 'Success') {
      newStatus = 'In Progress';
    } else if (status === 'In Progress' && passed === 'Not Passed') {
      newStatus = 'Success';
    } else if (status === 'In Progress' && passed === 'Passed') {
      newStatus = 'Failed';
    }

    // Update the status in the local state
    setStatus(newStatus);

    // Update the status in the database
    const response = await fetch(`https://one-percent-api.vercel.app/api/progress/${progress._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const json = await response.json();

    if (response.ok) {
      // Dispatch the updated progress to the context
      dispatch({ type: 'UPDATE_PROGRESS', payload: json });
    }
  };

  return (
    <div className="w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 flex flex-wrap min-h-48 bg-[#022B3A] text-[#E1E5F2] my-7 mx-auto p-7">
      <div className="w-full md:w-4/12 flex flex-col items-center justify-around text-center mb-4">
        <p className="text-xl md:text-2xl font-bold">{progress.title}</p>
        <p className="text-base md:text-lg">{progress.description}</p>
      </div>

      <div className="md:w-4/12 w-6/12 flex flex-col items-center justify-around">
        <p className="text-lg font-bold mb-2">In {progress.goal} Days</p>
        
        <div className="w-full flex justify-evenly">
          <button onClick={handleClick} className=" border-white border px-2 py-1">Delete</button>
          <Link to={`/update/${progress._id}`}><button className="border-white border px-2 py-1">Update</button></Link>
          {status === 'In Progress' && passed === 'Not Passed' ? 
            <button onClick={() => handleStatus()} className="border-white border px-2 py-1">Done</button> : ''}
          {status === 'In Progress' && passed === 'Passed' ? 
            <button onClick={() => setStatus('Failed')} className=" border-white border px-2 py-1">Failed</button> : ''}
        </div>
      </div>
      
      <div className="md:w-4/12 w-6/12 flex flex-col justify-center items-center">
        {deadline && <p className="mb-2 text-center text-sm md:text-base">{deadline}</p>}
        <p className="text-lg md:text-xl font-bold">{status}</p>
      </div>
    </div>
  );
}

export default ProgressAll;
