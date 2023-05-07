import React from "react";
import { format, addHours } from "date-fns";

export default function TodaysSchedule({ users, deleteUser }) {
	console.log(users);


	function todaysUsers(users)
	{
		const today = new Date();
		const todaysUsers = [];
		users.forEach((user) => {
			const userTime = new Date(user.date);
			if (userTime.getDate() === today.getDate()) {
				todaysUsers.push(user);
			}
		});
		return todaysUsers;
	}
	

function sortUsers(users) {
		const sortedUsers = users.sort((a, b) => {
			const aTime = new Date(a.date);
			const bTime = new Date(b.date);
			return aTime - bTime;
		});
		return sortedUsers;
	}

	const todaySchedule = todaysUsers(users);
	const nextHrUsers = [];
	const nxtHr = addHours(new Date(), 1);
	todaySchedule.forEach((user) => {
		const userTime = new Date(user.date);
		if (userTime < nxtHr) {
			nextHrUsers.push(user);
		}
	});
	const usersNxtHrCt = nextHrUsers.length;
	const filteredUsers = sortUsers(todaySchedule);
	const usersNxtHr = sortUsers(nextHrUsers);

	function formatTime(time) {
		const date = new Date(time);
		return format(date, "h:mm a");
	}


	function parseBoolean(friendly) {
		if (friendly === "1") {
			return true;
		} else {
			return false;
		}
	}	



	return (
        <>
		<div className="row ms-2 me-2">
			<div className="currentUsers">
                <h2 className="title2 text-center">Today's Dogs</h2>
				<h5 className="title2 text-center">Dogs in Next Hour: {usersNxtHrCt}</h5>
			</div>
			{filteredUsers.map((user) => (
				<div className="col-sm-12 title2">
					<div className="card shadow mt-2 rounded-3" key={user.id}>
						<div className="card-body">
							<button
								type="button"
								className="btn-close float-end"
								aria-label="Close"
								onClick={() => deleteUser(user.id)}
							></button>
							<h5 className="card-title fw-bold">{user.name} is bringing</h5>
							<h5 className="mb-2fw-bold">{user.dogName}</h5>
							<h6 className="card-text">Today at {formatTime(user.date)}</h6>
							
	{parseBoolean(user.friendly) ? <h6 className="alert alert-danger fw-bolder border border-2 border-secondary m-1 p-1"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="mb-2 me-1" height="1.75em" width="1.75em" xmlns="http://www.w3.org/2000/svg"><path d="M193 796c0 17.7 14.3 32 32 32h574c17.7 0 32-14.3 32-32V563c0-176.2-142.8-319-319-319S193 386.8 193 563v233zm72-233c0-136.4 110.6-247 247-247s247 110.6 247 247v193H404V585c0-5.5-4.5-10-10-10h-44c-5.5 0-10 4.5-10 10v171h-75V563zm-48.1-252.5l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3l-67.9-67.9a8.03 8.03 0 0 0-11.3 0l-39.6 39.6a8.03 8.03 0 0 0 0 11.3l67.9 67.9c3.1 3.1 8.1 3.1 11.3 0zm669.6-79.2l-39.6-39.6a8.03 8.03 0 0 0-11.3 0l-67.9 67.9a8.03 8.03 0 0 0 0 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l67.9-67.9c3.1-3.2 3.1-8.2 0-11.3zM832 892H192c-17.7 0-32 14.3-32 32v24c0 4.4 3.6 8 8 8h688c4.4 0 8-3.6 8-8v-24c0-17.7-14.3-32-32-32zM484 180h56c4.4 0 8-3.6 8-8V76c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v96c0 4.4 3.6 8 8 8z"></path></svg>
     This dog is not friendly with either other dogs or people. 
								</h6>:('')}

							{usersNxtHr.some((usersNxtHr) => usersNxtHr.id === user.id) ? (
								<p className="alert alert-info border border-2 border-secondary m-1 p-1">
								<svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="1.75em" width="1.75em" xmlns="http://www.w3.org/2000/svg"><circle fill="#2196F3" cx="24" cy="24" r="21"></circle><rect x="22" y="22" fill="#fff" width="4" height="11"></rect><circle fill="#fff" cx="24" cy="16.5" r="2.5"></circle></svg>	This dog arrives within the next hour.
								</p>
							) : (
								""
							)}
							{parseBoolean(user.puppy) ? (
								<p className="alert alert-success border border-2 border-secondary m-1 p-1">
								<svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="1.75em" width="1.75em" xmlns="http://www.w3.org/2000/svg"><circle fill="#2196F3" cx="24" cy="24" r="21"></circle><rect x="22" y="22" fill="#fff" width="4" height="11"></rect><circle fill="#fff" cx="24" cy="16.5" r="2.5"></circle></svg>	This dog is a puppy. Please be gentle.
								</p>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			))}
								
		</div>
        </>
	);
    
}
