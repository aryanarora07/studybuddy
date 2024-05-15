"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [major, setMajor] = useState("");
  const [year, setYear] = useState(0);
  const router = useRouter();



  useEffect(() => {
    async function fetchData() {
      try {
        // Check if token exists in local storage
        const token = localStorage.getItem("token");
        if (!token) {
          // If token is not present, redirect to login page
          router.push("/login");
          return;
        }

        // If token is present, send request to backend to fetch user data
        const response = await axios.get("http://localhost:4000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response);
        setUserData(response.data.user);
      } catch (error) {
        // If token is invalid or user data cannot be fetched, redirect to login page
        console.error(error);
        router.push("/login");
      }
    }

    fetchData();
  }, []);

  const handleLogout = () =>{
    localStorage.removeItem("token");
    router.push("/");
  }

  const handleMajor = (e) =>{
    setMajor(e.target.value);
  }

  const handleYear = (e) =>{
    setYear(e.target.value);
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    axios.post("http://localhost:4000/profile", {major, year})
    .then(()=> console.log("data saved to db"))
    .catch((error)=> console.log(error));
  }


  return <>
    <div className="bg-slate-100 h-screen">
    <div>
      <button onClick={handleLogout} className=" float-end mt-6 mr-4 bg-[#F15A22] p-4 px-6 rounded-full">Logout</button>
    </div>
      <div className="flex flex-col justify-center items-center">
        {userData && (
          <div className="mt-6">
            <p className=" text-4xl">Hi {userData.firstName}</p>

            <form className="flex flex-col justify-center items-center">

              <label className="text-4xl mt-24 text-[#F15A22]">Some Information about you: </label>

              <label className=" text-xl p-2 mt-2 block" htmlFor="major">Your Major</label>
              <input  value={major} onChange={handleMajor}  required type="text" className=" size-2/5 rounded-lg p-2 border-2 border-[#F15A22]"></input>

              <label className=" text-xl p-2 mt-2 block" htmlFor="major">Year</label>
              <input  value={year} onChange={handleYear}  required type="number" className=" size-2/5 rounded-lg p-2 border-2 border-[#F15A22]"></input>
              
              <button onClick={handleSubmit} className=" mt-6 bg-[#F15A22] p-4 px-6 rounded-full"type="submit">Submit</button>


            </form>
          </div>
        )}
      </div>
    </div>
    </>
  
};

export default Profile;
