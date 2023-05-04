import React from "react";
import { format, addHours } from "date-fns";

export default function TodaysSchedule({ users, deleteUser, getUsers }) {
	console.log(users);

	users.forEach((user) => {
		const userTime = new Date(user.time);
		const now = new Date();
		if (userTime < now) {
			deleteUser(user._id);
			getUsers();
		}
	});

	function sortUsers(users) {
		const sortedUsers = [...users];
		sortedUsers.sort((a, b) => {
			const aDate = new Date(a.date);
			const bDate = new Date(b.date);
			return aDate - bDate;
		});
		return sortedUsers;
	}

	let sortedUsers = sortUsers(users);

	function getTodaysUsers(sortedUsers) {
		const todaysUsers = [];
		const today = new Date();
		sortedUsers.forEach((user) => {
			const userDate = new Date(user.date);
			if (userDate.getDate() === today.getDate()) {
				todaysUsers.push(user);
			}
		});
		return todaysUsers;
	}

	let todaysUsers = getTodaysUsers(sortedUsers);
	console.log(todaysUsers);

	function sortTodaysUsers(todaysUsers) {
		const sortedTodaysUsers = [...todaysUsers];
		sortedTodaysUsers.sort((a, b) => {
			const aTime = new Date(a.time);
			const bTime = new Date(b.time);
			return aTime - bTime;
		});
		return sortedTodaysUsers;
	}
	
	let sortedTodaysUsers = sortTodaysUsers(todaysUsers);
	console.log(sortedTodaysUsers);
	function countusersNxtHr(sortedTodaysUsers) {
		const now = new Date();
		const nxtHr = addHours(now, 1);
		console.log(now);
		console.log(nxtHr);
		const usersNxtHr = [];
		sortedTodaysUsers.forEach((user) => {
			const userTime = new Date(user.date);
			if (userTime < nxtHr) {
				usersNxtHr.push(user);
			}
			if (userTime < now) {
				deleteUser(user.id);
			}
		});
		return usersNxtHr;
	}
	let usersNxtHr = countusersNxtHr(sortedTodaysUsers);
	let usersNxtHrCt = countusersNxtHr(sortedTodaysUsers).length;
	console.log(usersNxtHrCt);
	console.log(usersNxtHr);

	function formatTime(time) {
		const date = new Date(time);
		return format(date, "h:mm a");
	}

	function filterOutPastUsers(users) {
		const now = new Date();
		const filteredUsers = users.filter((user) => {
			const userDate = new Date(user.date);
			const userTime = new Date(user.time);
			return userDate > now || (userDate === now && userTime > now);
		});
		return filteredUsers;
	}
	let filteredUsers = filterOutPastUsers(sortedTodaysUsers);
	console.log(filteredUsers);
// parse just the filteredUsers.friendly to a boolean
function parseFriendly(filteredUsers) {
	const parsedFriendly = filteredUsers.map((user) => {
		return {
			...user,
			friendly: user.friendly === "true",
		};
	});
	return parsedFriendly;
}
filteredUsers = parseFriendly(filteredUsers);
console.log(filteredUsers);



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
							<h5 className="mb-2 fw-bold">{user.dogName}</h5>
							<h6 className="card-text">Today at {formatTime(user.date)}</h6>
							<p className="card-text">
	This Dog is{" "}
	{!user.friendly && <span className="text-danger fw-bolder">NOT</span>} friendly
</p>

							{usersNxtHr.some((usersNxtHr) => usersNxtHr.id === user.id) ? (
								<p className="alert alert-info m-0 p-0">
								<svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="1.75em" width="1.75em" xmlns="http://www.w3.org/2000/svg"><circle fill="#2196F3" cx="24" cy="24" r="21"></circle><rect x="22" y="22" fill="#fff" width="4" height="11"></rect><circle fill="#fff" cx="24" cy="16.5" r="2.5"></circle></svg>	This dog arrives within the next hour.
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
