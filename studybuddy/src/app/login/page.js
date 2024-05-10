"use client"

import { useState } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";




const login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleEmail = (e) =>{
    setEmail(e.target.value)
  }

  const handlePassword = (e) =>{
    setPassword(e.target.value)
  }

  const router = useRouter();

  async function handleSubmit(e) 
  {
    e.preventDefault();
    try 
    {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      // console.log(response);

      // Assuming the response contains the token
      const token = response.data;

      // Store the token in local storage or cookie
      localStorage.setItem("token", token);

      // Redirect to profile page
      router.push("/profile");
    } 
    catch (err) 
    {
      console.log(err);
    }
  }



    return (
        <div className=" bg-slate-100 h-screen">
           
            <form className="flex flex-col justify-center items-center">
    
              <label className="text-4xl mt-24 text-[#F15A22]">Log In</label>
    
              
              <label className=" text-xl p-2 mt-2 block" htmlFor="fname">Email</label>
              <input id="fname" value={email} onChange={handleEmail}  required type="email" className=" size-1/5 rounded-lg p-2 border-2 border-[#F15A22]"></input>
              
              <label className=" text-xl p-2 mt-2 block" htmlFor="fname">Password</label>
              <input id="fname" value={password} onChange={handlePassword}  required type="password" className=" size-1/5 rounded-lg p-2 border-2 border-[#F15A22]"></input>
    
              <button onClick={handleSubmit} className=" mt-6 bg-[#F15A22] p-4 px-6 rounded-full"type="submit">Log In</button>

              <Link className=" text-lg underline decoration-[#F15A22] underline-offset-2  mt-4 block" href={"/signup"}><p>New to Study Buddy? - Sign Up</p></Link>

            </form>
    
        </div>
    )
}

export default login
