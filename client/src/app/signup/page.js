"use client"

import { useState } from "react"
import Link from "next/link";
import axios from "axios"
import { useRouter } from "next/navigation";


const signup = () => {


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [IsFilled, setIsFilled] = useState(false);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    checkFormFilled(); // Call checkFormFilled whenever any field value changes
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    checkFormFilled();
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    checkFormFilled();
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    checkFormFilled();
  };

  const checkFormFilled = () => {

    if (firstName && lastName && email && password) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  };


  const router = useRouter();

  const handleSubmit = (e) => {

    e.preventDefault()
    axios.post("http://localhost:4000/signup", {firstName, lastName, email, password})
    .then(()=> router.push('/login'))
    .catch(err => console.log(err))
  }


  return (
    <div className=" bg-slate-100 h-screen">
       
        <form className="flex flex-col justify-center items-center">

          <label className="text-4xl mt-24 text-[#F15A22]">Create a new Account</label>

          <label className=" text-xl p-2 mt-2  block" htmlFor="fname">First Name</label>
          <input id="fname" value={firstName} onChange={handleFirstName} required type="text" className=" size-1/5 rounded-lg p-2 border-2 border-[#F15A22]"></input>


          <label className=" text-xl p-2 mt-2  block" htmlFor="lname">Last Name</label>
          <input id="lname" value={lastName} onChange={handleLastName}  type="text" className=" size-1/5 rounded-lg p-2 border-2 border-[#F15A22]"></input>

          <label className=" text-xl p-2 mt-2 block" htmlFor="fname">Email</label>
          <input id="fname" value={email} onChange={handleEmail}  required type="email" className=" size-1/5 rounded-lg p-2 border-2 border-[#F15A22]"></input>
          
          <label className=" text-xl p-2 mt-2 block" htmlFor="fname">Password</label>
          <input id="fname" value={password} onChange={handlePassword}  required type="password" className=" size-1/5 rounded-lg p-2 border-2 border-[#F15A22]"></input>

          <button disabled={!IsFilled} onClick={handleSubmit} className=" mt-6 bg-[#F15A22] p-4 px-6 rounded-full" type="submit">Sign Up</button>

          <Link className=" text-lg underline decoration-[#F15A22] underline-offset-2  mt-4 block" href={"/login"}><p>Already have an account - Login</p></Link>

        </form>

    </div>
  )
}

export default signup