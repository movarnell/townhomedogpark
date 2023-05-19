import React from "react";
import { format, addHours} from "date-fns";

export default function TodaysSchedule({ users, deleteUser }) {
	console.log(users);

// Function that filters out users that are not for today
	function todaysUsers(users)
	{
		const today = new Date();
		const todaysUsers = [];
    /* (nathanstilwell comment) */
    // This looks candidate to use filter instead of forEach. You could do something
    // like this and remove `todayUsers` entirely,
    /**
     * see developer.mozilla.org "Array.prototype.filter()"
     *
     * return users.filter((user) => {
     *  const userTime = new Date(user.date);
     *  return userTime.getDate() === today.getDate();
     * });
     */
		users.forEach((user) => {
			const userTime = new Date(user.date);
			if (userTime.getDate() === today.getDate()) {
				todaysUsers.push(user);
			}
		});
		return todaysUsers;
	}

// Function that sorts users by date and time with the most recent at the top
// (nathanstilwell comment)
// your spacing is off here, which make it confusing to tell what's included in
// sortUsers. You could consider setting up ESLint or prettier to some other
// auto-formatter to help with this.
function sortUsers(users) {
		const sortedUsers = users.sort((a, b) => {
			const aTime = new Date(a.date);
			const bTime = new Date(b.date);
			return aTime - bTime;
		});
		return sortedUsers;
	}

	// declare variables for various functions in the return statement
	const todaySchedule = todaysUsers(users);
	const nextHrUsers = [];
	const nxtHr = addHours(new Date(), 1);

  /* (nathanstilwell comment) */
  // Any time you using a forEach to push into an array, you could be using
  // Array.prototype.map instead. And if you are conditionally pushing into an
  // array, then you could use Array.prototype.filter instead. For example
	todaySchedule.forEach((user) => {
		const userTime = new Date(user.date);
		if (userTime < nxtHr && userTime > new Date()) {
			nextHrUsers.push(user);
		}
	});

	const usersNxtHrCt = nextHrUsers.length;
	const filteredUsers = sortUsers(todaySchedule);
	const usersNxtHr = sortUsers(nextHrUsers);

	// Function that formats the time the way we want it to display
	function formatTime(time) {
		const date = new Date(time);
		return format(date, "h:mm a");
	}

// Function to parse te boolean value so that it is readable since database does 1 or 0
/* (nathanstilwell comment) */
// This function is a bit of an exageration. Unless you are using something like
// Typescript to enforce the type of "friendly", you could end up with a "truthy"
// value that isn't threequal to "1" and get a false result. Generally when
// casting a Boolean I simply use the constructor,
/*
  function parseBoolean(value) {
    return Boolean(value);
  }
*/

	function parseBoolean(friendly) {
		if (friendly === "1") {
			return true;
		} else {
			return false;
		}
	}

const now = new Date();

// This function is to make sure the time is within the hour the user scheduled to be there. If it is not, it will not display the alert
function userNxtHrTime(user) {
	const userTime = new Date(user.date);
	const userNxtHr = addHours(userTime, 1);
	if (now > userTime && now < userNxtHr) {
		return true;
	}
}

// return element for the today schedule with alerts where appropriate and sorted with next up at the top, with alerts specific to dogs coming in the next hour
	return (
        <>
		<div className="row ms-2 me-2">
			<div className="currentUsers">
                <h2 className="title2 text-center">Today's Dogs</h2>
				<h5 className="title2 text-center">Dogs in Next Hour: {usersNxtHrCt}</h5>
				{todaysUsers(users).length === 0 ? (
					<div className="alert alert-secondary title2 shadow border border-1 border-secondary rounded-3 m-1 p-1 text-center">
						No dogs scheduled for today yet
						</div>) : ("")}
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

							{ userNxtHrTime(user) ? (
								<h6 className="alert alert-info title2 border border-2 border-info fw-bold m-1 p-1 text-center">
								<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M115.063 21.97v9.343c0 101.953 38.158 189.648 96.343 222.093v6.094c-58.186 32.445-96.344 120.14-96.344 222.094v9.344H401.81v-9.344c0-102.552-38.804-190.274-97.53-222.188V253.5c58.722-31.917 97.53-119.64 97.53-222.188V21.97H115.06zM134 40.655h248.875c-2.477 96.445-42.742 175.523-91.938 198.906l-5.343 2.532V270.844l5.344 2.53c49.193 23.383 89.456 102.438 91.937 198.876H134c2.456-95.898 42.125-175.078 90.875-198.938l5.25-2.562v-28.594l-5.25-2.562c-48.748-23.86-88.42-103.04-90.875-198.938zm213.656 86.125c-57.607 27.81-124.526 27.84-177.562 4.095C184.748 181.78 213.91 218.012 248.22 224c-1.54 2.047-2.47 4.585-2.47 7.344 0 6.76 5.488 12.25 12.25 12.25s12.25-5.49 12.25-12.25c0-2.72-.907-5.218-2.406-7.25 35.426-5.88 65.488-44.07 79.812-97.313zM258 258.626c-6.762 0-12.25 5.488-12.25 12.25s5.488 12.25 12.25 12.25 12.25-5.488 12.25-12.25-5.488-12.25-12.25-12.25zm0 39.28c-6.762 0-12.25 5.49-12.25 12.25 0 6.763 5.488 12.25 12.25 12.25s12.25-5.487 12.25-12.25c0-6.76-5.488-12.25-12.25-12.25zm0 39.533c-6.762 0-12.25 5.488-12.25 12.25 0 6.76 5.488 12.25 12.25 12.25s12.25-5.49 12.25-12.25c0-6.762-5.488-12.25-12.25-12.25zm.125 39.906c-23.21.28-46.19 25.77-75.813 75.656h153c-30.523-51.003-53.977-75.936-77.187-75.656z"></path></svg>	Scheduled for now. If you hurry you can still make it!
								</h6>
							) : (
								""
							)}
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
              {/* (nathanstilwell comment) */
               // if this is the only use of `parseBoolean`, then you could just move the equality check inline here,
               // i.e. `user.puppy === "1" ? ... : ...`
               // this could also launch into a conversation about choosing data types. Since you are storing all the data
               // as strings, having `user.puppy` === "1" isn't very intuitive. If this is intended to be a boolean value
               // then it could be named `user.isPuppyFriendly` or it could be an Enum like value where there are classes of
               // puppy where "friendly" is a value. So like, `user.puppy === "friendly" ? ... : ...`
              }
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
