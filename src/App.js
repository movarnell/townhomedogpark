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

function App() {
  const [users, setUsers] = useState([]);
  //const ApiEndpoint= "https://64494580b88a78a8f002df32.mockapi.io/15thplace/user";

// const getPHP = './Server/get.php'
const postPHP = './Server/post.php'
const deletePHP = './Server/delete.php'

  useEffect(() => {
    getUsers()
    deletePastUsers(users)
  }, [])
  

 

  async function fetchUsers() {
    try {
      const response = await fetch('./Server/get.php');
      const data = await response.json();
      // Do something with the data, such as displaying it on the page
      console.log(data);
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error(error);
    }
  }

  const getUsers = async () => {
    const usersFromServer = await fetchUsers()
    setUsers(usersFromServer)
  }


  const createUser = async (user) => {
    const res = await fetch(postPHP, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const data = await res.json()
    setUsers([...users, data])
    getUsers();
  }




  const deleteUser = async (id) => {
    await fetch(`${deletePHP}/${id}`, {
      method: 'DELETE',
    })
    setUsers(users.filter((user) => user.id !== id))
  }



// function that takes the users array and if there are users in the past it deletes them with a 1 second delay between requests to the api and does not run if there are no past users
  const deletePastUsers = (users) => {
    users.forEach((user) => {
      const userTime = new Date(user.time);
      const now = new Date();
      if (userTime < now) {
        setTimeout(() => {
          deleteUser(user.id);
        }, 1000);
      }
    });
  };
  



  
console.log(users)
  return(
    <>
    <div className='row'><Title />
        <Navigation/></div>
    <Routes>
    <Route path="/" element={<MainPage users={users} createUser={createUser} deleteUser={deleteUser} />} />
    <Route path='/faq' element={<FAQ />}/>
    <Route path='/schedule' element={<Schedule users={users} deleteUser={deleteUser}/>} />
    </Routes>
    </>
  );
}

export default App;
