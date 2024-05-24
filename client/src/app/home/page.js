"use client"

import axios from "axios"
import { useEffect, useState } from "react"

const Page = () => {
  const [userData, setUserData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

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
        setAllUsers(response.data.user); // Assuming the response has a 'users' property
      } catch (error) {
        console.log("error: " + error.message);
      }
    }
    getAllUsers();
  }, []);

  return (
    <>
      {userData ? (
        <h1 className="m-4 p-4 text-4xl">Hi {userData.firstName}</h1>
      ) : (
        <h1>Loading...</h1>
      )}

      <p className="m-8 p-4 text-3xl">Available list of study partners: </p>

      <ul className="m-8 p-4">
        {allUsers.length > 0 ? (
          allUsers.map((user) => (
            <li key={user._id} className="p-2 text-2xl border-b">
              {user.firstName} {user.lastName}
            </li>
          ))
        ) : (
          <p>Loading study partners...</p>
        )}
      </ul>
    </>
  )
}

export default Page
