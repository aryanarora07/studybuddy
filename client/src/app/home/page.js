"use client"

import axios from "axios"
import { useEffect, useState } from "react"

const Page = () => {
  const [userData, setUserData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  // const [major, setMajor] = useState([]);

  useEffect(() => {
    async function getUserData() {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:4000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data.user);
      } catch (error) {
        console.log("error: " + error.message);
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await axios.get("http://localhost:4000/home");

        const {user, userInfo} = response.data;

        const userWithMajors = user.map(u => {
          const userMajor = userInfo.find(info => info.email == u.email);
          return{...u, major: userMajor? userMajor.major : 'Not Yet Assigned'}
        })

        setAllUsers(userWithMajors);
        
      } catch (error) {
        console.log("error: " + error.message);
      }
    }
    getAllUsers();
  }, []);

  // useEffect(() => {
  //   async function getMajors() {
  //     try {
  //       const response = await axios.get("http://localhost:4000/home");
  //       setMajor(response.data.userInfo.major); // Assuming the response has a 'users' property
  //     } catch (error) {
  //       console.log("error: " + error.message);
  //     }
  //   }
  //   getMajors();
  // }, []);

  return (
    <>
      {userData ? (
        <h1 className="m-4 p-4 text-4xl">Hi {userData.firstName}</h1>
      ) : (
        <h1>Loading...</h1>
      )}

      <p className="m-8 p-4 text-3xl">Available list of study partners: </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allUsers.length > 0 ? (
          allUsers.map((user) => (

          user.email !== userData?.email  &&(
            <div key={user._id} className=" m-4 bg-orange-400 rounded shadow p-4">
              <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-500">Major : {user.major}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          )
          ))
        ) : (
          <p>Loading study partners...</p>
        )}
      </div>
    </>
  )
}

export default Page
