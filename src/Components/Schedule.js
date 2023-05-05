import React, { useEffect } from 'react';
import Calendar from './Calendar';
import { format } from 'date-fns';


export default function Schedule({users, deleteUser, getUsers}) {
  
useEffect(() => {
    getUsers();
}, []);


// sort users array by date and time with the most recent at the top
    function sortUsers(users) {
        const sortedUsers = [...users];
        sortedUsers.sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            return aDate - bDate;
        });
        return sortedUsers;
    }
// filter out users that are in the past
    function getFutureUsers(sortedUsers) {
        const futureUsers = [];
        const now = new Date();
        sortedUsers.forEach((user) => {
            const userDate = new Date(user.date);
            if (userDate > now) {
                futureUsers.push(user);
            }
        });
        return futureUsers;
    }



 let sortedUsers = sortUsers(users);
 sortedUsers = sortUsers(getFutureUsers(sortedUsers));

    function formatDate(date) {
        const dateObj = new Date(date);
        const formattedDate = format(dateObj, 'MM/dd/yyyy h:mm a');
        return formattedDate;
    }
// adding in second info alert that shows if the dog is a puppy
  return (
    <>
    <div className='container-fluid'>
        <div className='row m-3 centerContent'>
            <div className='col text-center'>
                <div className='calendarFixed'>
                <Calendar users={users} />
                </div>
            </div>
            <div className='col title2'>

                {sortedUsers.map((user) => (
                    
                    <div className='card m-3 shadow border border-1 border-secondary rounded-3' key={parseInt(user._id)}>
                        <div className='card-body'>
                        <button
								type="button"
								className="btn-close float-end"
								aria-label="Close"
								onClick={() => deleteUser(parseInt(user.id))}
							></button>
                            <h3 className='card-title fw-bold'>{user.name}</h3>
                            <h5 className='card-title'>Bringing:<span className='fw-bold'> {user.dogName}</span></h5>
                            <h6 className='card-subtitle mb-2'>
                                {formatDate(user.date)}
                            </h6>
                            <p className="card-text">
	This Dog is{" "}
	{user.friendly && <span className="text-danger fw-bolder">NOT</span>} friendly
</p>

{user.puppy ? (
								<p className="alert alert-success border border-2 border-secondary m-1 p-1">
								<svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="1.75em" width="1.75em" xmlns="http://www.w3.org/2000/svg"><circle fill="#2196F3" cx="24" cy="24" r="21"></circle><rect x="22" y="22" fill="#fff" width="4" height="11"></rect><circle fill="#fff" cx="24" cy="16.5" r="2.5"></circle></svg>	This dog is a puppy. Please be gentle.
								</p>
							) : (
								""
							)}

                            
                            </div>
                            </div>
                            
                            ))}
</div>
            
        </div>
    </div>
    </>
  )
}
