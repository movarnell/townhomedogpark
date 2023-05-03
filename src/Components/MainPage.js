import React from 'react';
import TodaysSchedule from './TodaysSchedule';
import Entry from './Entry';
import Title from './Title';
import Navigation from './Navigation';

export default function MainPage({ users, createUser, deleteUser }) {
  console.log(" ---------------------------------------------")
  console.log("file: MainPage.js:5 ~ MainPage ~ users:", users)
  console.log(" ---------------------------------------------")
  

    return (
<>
<div className="container-fluid">
    
<div className='row'>
    <div className='col'>
        <Entry createUser={createUser} users={users} />
    </div>
    <div className='col'>
        
<TodaysSchedule users={users} deleteUser={deleteUser} />
</div>
</div>
</div>
</>
  )
}
