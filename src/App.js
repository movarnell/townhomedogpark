import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import MainPage from './Components/MainPage';
import Schedule from './Components/Schedule';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FAQ from './Components/FAQ';
import Navigation from './Components/Navigation';
import Title from './Components/Title';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  

useEffect(() => {
  axios.get("https://michaelvarnell.com/dogparkserver/get_users.php")
  .then(response => {
      setUsers(response.data);
    }).then(parseFriendly())
    .catch(error => {
      console.log(error);
    });
}, []);
  

  async function fetchUsers() {
    try {
      const response = await axios.get('https://michaelvarnell.com/dogparkserver/get_users.php');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const getUsers = async () => {
    const usersFromServer = await fetchUsers()
    setUsers(usersFromServer)
    console.log("file: App.js:45 ~ getUsers ~ usersFromServer:", usersFromServer)

  }
        

  function createUser(data) {
    axios.post("https://michaelvarnell.com/dogparkserver/add_dog.php", data)
    .then(response => {
      console.log(response.data);
    }).then(parseFriendly()).catch(error => {
      console.log(error);
    });
}


function deleteUser(userId) {
  console.log("file: App.js:58 ~ deleteUser ~ userId:", userId)
  axios.delete("https://michaelvarnell.com/dogparkserver/delete_user.php?id=" + userId)
    .then(response => {
      console.log(response.data);
    }).then(setUsers(users.filter((user) => user.id !== userId)))
    .catch(error => {
      console.log(error);
    });
}

const parseFriendly = () => {
  const newUsers = users.map((user) => {
    if (user.friendly === "1") {
      user.friendly = true
    } else {
      user.friendly = false
    }
    return user
  })
  setUsers(newUsers)
}


  


  



  
console.log(users)
  return(
    <>
    <div className='row'><Title />
        <Navigation/></div>
    <Routes>
    <Route exact path="/" element={<MainPage users={users} createUser={createUser} deleteUser={deleteUser} setUsers={setUsers} />} />
    <Route path='/faq' element={<FAQ />}/>
    <Route path='/schedule' element={<Schedule users={users} deleteUser={deleteUser} getUsers={getUsers}/>} />
    <Route path='*' element={<MainPage users={users} createUser={createUser} deleteUser={deleteUser} />} />

    </Routes>
    </>
  );
}

export default App;
