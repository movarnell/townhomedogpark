import React from 'react'

// FAQ page
export default function FAQ() {
  return (
    <>
    <div className='container-fluid'>
        <div className='row'>
            <h1 className='m-3 title2 text-center'>Frequently Asked Questions</h1>
        </div>
        <div className='row m-2'>
        <div className='title2'><h5>What is this about? With just your name, your dog's name, the date and time you plan to visit, and whether your dog is friendly or not, you can inform other dog owners when you're headed to the park. This will help our furry friends make new friends and playmates more often, without requiring you to sign up or share any additional information.</h5><br/>
        <h5><ul>
            <li className='fw-bolder'>Q. Who made this and why?</li>
            <li>A. Hi! I'm Michael and I live here too! The reason I made this was for a project to showcase my skills as a front end software developer. It was too good not to share and only costs me a small amount to upkeep.</li>
            <br/>
            <li className='fw-bolder'>Q. Why can't I make an account? I want to save stuff!</li>
            <li>A. I felt part of the charm of doing things this way is that you can stay as annonymous as you want. You don't have to put your real name, although it works best if that is the only part not real. It's not nice to call a dog by the wrong name, and in canine circles it could be considered insulting.</li>
            <li className='fw-bolder'>Q. How can I get in touch with you?</li>
            <li>The preferred method of contact for me is my email, which is michaelvarnell@icloud.com</li>
            </ul><br/>
            I hope this tool enriches your dogs life, and yours as well. It will be enough for me to see smiles on your faces while the dogs frolick in our little oasis in the cul de sac!
            </h5></div>

        </div>
    </div>
    </>
  )
}
