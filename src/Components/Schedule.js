import React from 'react';
import Calendar from './Calendar';
import { format } from 'date-fns';


export default function Schedule({users, deleteUser}) {
  
// sort users array by date and time with the most recent at the top
function sortUsers(users) {
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        const aTime = new Date(a.time);
        const bTime = new Date(b.time);
        return bDate - aDate || bTime - aTime;
    });
    return sortedUsers;
}
 const sortedUsers = sortUsers(users);

    function formatDate(date) {
        const dateObj = new Date(date);
        const formattedDate = format(dateObj, 'MM/dd/yyyy h:mm a');
        return formattedDate;
    }

  return (
    <>
    <div className='container-fluid'>
        <div className='row m-3 centerContent'>
            <div className='col text-center'>
                <div className='calendarFixed'>
                <Calendar users={users} />
                </div>
            </div>
            <div className='col'>

                {sortedUsers.map((user) => (
                    
                    <div className='card m-3 shadow border border-1 border-secondary rounded-3' key={user._id}>
                        <div className='card-body'>
                        <button
								type="button"
								className="btn-close float-end"
								aria-label="Close"
								onClick={() => deleteUser(user.id)}
							></button>
                            <h5 className='card-title'>{user.name}</h5>
                            <h5 className='card-title'>Bringing: {user.dogName}</h5>
                            <h6 className='card-subtitle mb-2'>
                                {formatDate(user.date)}
                            </h6>
                            <p className="card-text">
	This Dog is{" "}
	{!user.friendly && <span className="text-danger fw-bolder">NOT</span>} friendly
</p>
                            </div>
                            </div>
                            
                            ))}
</div>
            
        </div>
    </div>
    </>
  )
}
