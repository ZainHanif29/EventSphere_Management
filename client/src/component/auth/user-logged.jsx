import React, { useEffect, useState } from "react";
import axios from "axios";
const LoggedUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    // Function to fetch logged users
    const fetchUsers = async () => {
      const token = localStorage.getItem("token"); // Get the token from local storage
      if (!token) {
        setError("No authorization token found.");
        return;
      }
      try {
        const endpoint = 'http://localhost:8000/api'; 
        const response = await axios.post(
          `${endpoint}/logged-user`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(response.data.user);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError(
          "Failed to fetch users. Please check your connection and try again."
        );
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="container mt-3">
      <h1>Logged Users</h1>
      <ul>
        <li>{users.FirstName}</li>
        <li>{users.LastName}</li>
        <li>{users.Email}</li>
        <li>{users.Role}</li>
      </ul>
    </div>
  );
};

export default LoggedUsers;
