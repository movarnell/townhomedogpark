import React from 'react';
import TodaysSchedule from './TodaysSchedule';
import Entry from './Entry';


export default function MainPage({ users, createUser, deleteUser, getUsers }) {
  console.log(" ---------------------------------------------")
  console.log("file: MainPage.js:5 ~ MainPage ~ users:", users)
  console.log(" ---------------------------------------------")
  

    return (
<>
<div className="container-fluid">
    
<div className='row'>
    <div className='col'>
        <Entry createUser={createUser} users={users} getUsers={getUsers} />
    </div>
    <div className='col'>
        
<TodaysSchedule users={users} deleteUser={deleteUser} />
</div>
</div>
</div>
</>
  )
}
