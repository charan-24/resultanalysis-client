import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from './navbar';
function Contactus() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_bptjnsl', 'template_ribf58f', form.current, 'Ol8gkNhvS7n8Azo-0')
      .then((result) => {
          console.log(result.text);
          alert("Mail Sent");
      }, (error) => {
          console.log(error.text);
          alert("There's a problem with this service right now, sorry for your inconvenince");
      });
  };

  return (
    <div className=''>  
        <Navbar />
        <div className='mx-auto border-t border-gray-300'>
            <h1 className='text-center font-bold mt-4 lg:text-[2rem] underline'>CONTACT US</h1>
            <form ref={form} onSubmit={sendEmail} className="w-3/4 md:w-2/5 mx-auto mt-4">
                <label htmlFor="name" className="block  text-black font-bold mt-2">Name</label>
                <input id="name" type="text" placeholder="Enter Your Name" className="w-full border-1 border-black rounded-mg mt-2 focus:outline-none"></input>
                <hr className={`border-1 border-black w-full`}/>
                <label htmlFor="email" className="block  text-black font-bold mt-2">Email</label>
                <input id="email" type="email" placeholder="Enter your email" className="w-full rounded-mg mt-2 focus:outline-none"></input>
                <hr className={`border-1 border-black w-full`}/>
                <label htmlFor="desc" className="block  text-black font-bold mt-2">Message</label>
                <textarea id="desc" type="text" placeholder="Enter your message" className="w-full rounded-mg mt-2 focus:outline-none"></textarea>
                <hr className={`border-1 border-black w-full`}/>
                <button className="block mx-auto bg-amber-300 rounded-md px-8 py-2 md:px-10 my-4">Send</button>
            </form>
        </div>   
    </div>
    
  );
}

export default Contactus;