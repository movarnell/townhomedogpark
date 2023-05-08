import React, {useEffect} from 'react';
import Calendar from './Calendar';
import { format } from 'date-fns';



export default function Schedule({users, deleteUser, getUsers}) {
  
    // add useeffect to get users from database
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

    function parseBoolean(friendly) {
        if (friendly === '1') {
            return true;
        } else {
            return false;
        }
    }
// return statement with the calendar and the list of all future scheduled users
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
                <h2 className='text-center title2 fw-bolder'>Upcoming Schedule</h2>
                {sortedUsers.map((user) => (
                    
                    <div className='card m-3 shadow border border-1 border-secondary rounded-3' key={parseInt(user._id)}>
                        <div className='card-body'>
                        <button
								type="button"
								className="btn-close float-end"
								aria-label="Close"
								onClick={() => deleteUser(user.id)}
							></button>
                            <h3 className='card-title fw-bold'>{user.name}</h3>
                            <h5 className='card-title'>Bringing:<span className='fw-bold'> {user.dogName}</span></h5>
                            <h6 className='card-subtitle mb-2'>
                                {formatDate(user.date)}
                            </h6>
                            
                            {parseBoolean(user.friendly) ? <h6 className="alert alert-danger fw-bolder border border-2 border-secondary m-1 p-1"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="mb-2 me-1" height="1.75em" width="1.75em" xmlns="http://www.w3.org/2000/svg"><path d="M193 796c0 17.7 14.3 32 32 32h574c17.7 0 32-14.3 32-32V563c0-176.2-142.8-319-319-319S193 386.8 193 563v233zm72-233c0-136.4 110.6-247 247-247s247 110.6 247 247v193H404V585c0-5.5-4.5-10-10-10h-44c-5.5 0-10 4.5-10 10v171h-75V563zm-48.1-252.5l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3l-67.9-67.9a8.03 8.03 0 0 0-11.3 0l-39.6 39.6a8.03 8.03 0 0 0 0 11.3l67.9 67.9c3.1 3.1 8.1 3.1 11.3 0zm669.6-79.2l-39.6-39.6a8.03 8.03 0 0 0-11.3 0l-67.9 67.9a8.03 8.03 0 0 0 0 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l67.9-67.9c3.1-3.2 3.1-8.2 0-11.3zM832 892H192c-17.7 0-32 14.3-32 32v24c0 4.4 3.6 8 8 8h688c4.4 0 8-3.6 8-8v-24c0-17.7-14.3-32-32-32zM484 180h56c4.4 0 8-3.6 8-8V76c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v96c0 4.4 3.6 8 8 8z"></path></svg>
     This dog is not friendly with either other dogs or people. 
								</h6>:('')}
                                {parseBoolean(user.puppy) ? (
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
