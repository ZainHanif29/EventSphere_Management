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
        const response = await axios.post("http://localhost:8000/api/loggeduser",{},{
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);  // Add this to inspect the structure

        if ( response.data.user) {

          setUsers(response.data.user); // Assuming the API sends an array of users under 'user'
          setError(` users data received.,${users.length}`);

        } else {
          setError("No users data received.");
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError("Failed to fetch users. Please check your connection and try again.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mt-3">
      <h1>Logged Users</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {users.length >= 0 ? (
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.FirstName} &nbsp; {user.LastName}</td>
                <td>{user.Email}</td>
                <td>{user.Role}</td>
              </tr>
            ))}
          </tbody>
        </table>
       ) : (
        <p className="text-center text-danger ">No users found. {error}</p>
       )}
    </div>
  );
};

export default LoggedUsers;
