import { set } from 'date-fns'
import React, {useState } from 'react'
import { Button, Form } from 'react-bootstrap'




export default function Entry({ users, createUser, setUsers}) {
    const [name, setName] = useState('')
    const [dogName, setDogName] = useState('')
    const [date, setDate] = useState('')
    const [friendly, setFriendly] = useState(false)
    const [puppy, setPuppy] = useState(false)


    const nameOnChange = (e) => {
    setName(e.target.value)
    }
    const dogNameOnChange = (e) => {
        setDogName(e.target.value)
    }
    const dateOnChange = (e) => {
        setDate(e.target.value)
    }
    const friendlyOnChange = (e) => {
        setFriendly(e.target.checked)
         console.log(friendly)
     }
     const puppyOnChange = (e) => {
        setPuppy(e.target.checked)
            console.log(puppy)
        }

    


onsubmit = (e) => {
    e.preventDefault()
    if (!name || !dogName || !date) {
        alert('You must submitt a name, dog name and date')
        return
    }else{
    const newUser =
    {   name: name,
        dogName: dogName,
        date: date,
        friendly: friendly,
        puppy: puppy
    }    
    createUser(newUser)
    setUsers([...users, newUser])
    console.log("file: Entry.js:53   Entry   newUser:", newUser)
    clearForm()
}
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('dogName').value = '';
    document.getElementById('datetime').value = new Date().toISOString().slice(0, 16);
    document.getElementById('formBasicCheckbox').checked = false;
    document.getElementById('formBasicCheckbox2').checked = false;
}


// set onchange of each input to update the state of the input fields
  return (
    <div className='m-2 p-2  shadow border border-dark border-1 rounded-3'>
        <h2 className='title2 text-center'>Schedule your visit</h2>
        <Form className='title2'>
           <Form.Group className="mb-3" controlId="name">
  <Form.Label>Name</Form.Label>
  <Form.Control type="text" placeholder="Enter Name" onChange={nameOnChange} />
</Form.Group>


            <Form.Group className="mb-3" controlId="dogName">
                <Form.Label>Dog Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Dog's Name" onChange={dogNameOnChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="datetime">
                <Form.Label>Date</Form.Label>
                <input className='form-control' type="datetime-local" id="datetime" name="datetime" onChange={dateOnChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Not dog/human friendly" onChange={friendlyOnChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox2">   
            <Form.Check type="checkbox" label="My dog is a puppy still."onChange={puppyOnChange} />
            </Form.Group>
            

            <Button variant="primary shadow mb-3 ms-3" type="submit">
            <svg stroke="currentColor" 
        className='leftTilt mb-1 me-1'
        fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224zm-147.28-12.61c-10.4-34.65-42.44-57.09-71.56-50.13-29.12 6.96-44.29 40.69-33.89 75.34 10.4 34.65 42.44 57.09 71.56 50.13 29.12-6.96 44.29-40.69 33.89-75.34zm84.72-20.78c30.94-8.14 46.42-49.94 34.58-93.36s-46.52-72.01-77.46-63.87-46.42 49.94-34.58 93.36c11.84 43.42 46.53 72.02 77.46 63.87zm281.39-29.34c-29.12-6.96-61.15 15.48-71.56 50.13-10.4 34.65 4.77 68.38 33.89 75.34 29.12 6.96 61.15-15.48 71.56-50.13 10.4-34.65-4.77-68.38-33.89-75.34zm-156.27 29.34c30.94 8.14 65.62-20.45 77.46-63.87 11.84-43.42-3.64-85.21-34.58-93.36s-65.62 20.45-77.46 63.87c-11.84 43.42 3.64 85.22 34.58 93.36z"></path></svg> Schedule it!
            </Button>
        </Form>
    </div>

  )
}
