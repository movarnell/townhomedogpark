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
  //const ApiEndpoint= "https://64494580b88a78a8f002df32.mockapi.io/15thplace/user";



useEffect(() => {
  axios.get("https://michaelvarnell.com/dogparkserver/get_users.php")
  .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}, []);
  

  function fetchUsers() {
    return axios.get('https://michaelvarnell.com/dogparkserver/get_users.php')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
  }

  const getUsers = async () => {
    const usersFromServer = await fetchUsers()
    setUsers(usersFromServer)
  }


  function createUser(data) {
    axios.post("https://michaelvarnell.com/dogparkserver/add_dog.php", data)
    .then(response => {
      console.log(response.data);
    }).then(getUsers())
    .catch(error => {
      console.log(error);
    });
}


function deleteUser(userId) {
  console.log("file: App.js:58 ~ deleteUser ~ userId:", userId)
  axios.delete("https://michaelvarnell.com/dogparkserver/delete_user.php?id=" + userId)
    .then(response => {
      console.log(response.data);
    }).then(getUsers())
    .catch(error => {
      console.log(error);
    });
}



  


  



  
console.log(users)
  return(
    <>
    <div className='row'><Title />
        <Navigation/></div>
    <Routes>
    <Route path="/" element={<MainPage users={users} createUser={createUser} deleteUser={deleteUser} />} />
    <Route path='/faq' element={<FAQ />}/>
    <Route path='/schedule' element={<Schedule users={users} deleteUser={deleteUser} getUsers={getUsers}/>} />
    </Routes>
    </>
  );
}

export default App;
