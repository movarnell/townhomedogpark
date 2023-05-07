// Importing required modules and components
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import MainPage from "./Components/MainPage";
import Schedule from "./Components/Schedule";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FAQ from "./Components/FAQ";
import Navigation from "./Components/Navigation";
import Title from "./Components/Title";
import axios from "axios";

function App() {
	// Setting initial state for users array
	const [users, setUsers] = useState([]);

	// Fetching users data from server using axios and updating the state
	useEffect(() => {
		axios
			.get("https://michaelvarnell.com/dogparkserver/get_users.php")
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// Asynchronously fetching users data from server using axios
	async function fetchUsers() {
		try {
			const response = await axios.get(
				"https://michaelvarnell.com/dogparkserver/get_users.php"
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}

	// Updating the state with users data fetched from the server
	const getUsers = async () => {
		const usersFromServer = await fetchUsers();
		setUsers(usersFromServer);
		console.log(
			"file: App.js:45 ~ getUsers ~ usersFromServer:",
			usersFromServer
		);
	};

	// Sending a POST request to add a new user to the server
	function createUser(data) {
		axios
			.post("https://michaelvarnell.com/dogparkserver/add_dog.php", data)
			.then((response) => {
				console.log(response.data);
			})
			.then(fetchUsers())
			.catch((error) => {
				console.log(error);
			});
	}

	// Sending a DELETE request to delete a user from the server
	function deleteUser(userId) {
		console.log("file: App.js:58 ~ deleteUser ~ userId:", userId);
		axios
			.delete(
				"https://michaelvarnell.com/dogparkserver/delete_user.php?id=" + userId
			)
			.then((response) => {
				console.log(response.data);
			})
			.then(setUsers(users.filter((user) => user.id !== userId)))
			.then(console.log(userId + " was deleted"))
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<>
			<div className="row">
				<Title />
				<Navigation />
			</div>
			<Routes>
				{/* Setting up routes for different pages */}
				<Route
					exact
					path="/"
					element={
						<MainPage
							users={users}
							createUser={createUser}
							deleteUser={deleteUser}
							setUsers={setUsers}
						/>
					}
				/>
				<Route path="/faq" element={<FAQ />} />
				<Route
					path="/schedule"
					element={
						<Schedule
							users={users}
							deleteUser={deleteUser}
							getUsers={getUsers}
						/>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
