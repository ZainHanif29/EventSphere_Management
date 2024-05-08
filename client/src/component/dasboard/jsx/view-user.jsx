import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/table.css";
import Nav from "./navbar";
function ViewUser() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authorization token found.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/getuser", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.status === "success") {
          setUsers(response.data.message);
        } else {
          setError(response.data.message || "Failed to fetch users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users due to an error.");
      }
    };

    fetchUsers();
  }, []);

  return (
   <>
   <Nav />
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: "0%",
      }}
    >
      <div id="formarea2" style={{ width: "100%" }}>
      <div className="container mt-3">
      <h2 className="mb-4">User List</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {users.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.Email}</td>
                <td>{user.Role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No users found.</p>
      )}
    </div>
      </div>
    </div>
   </>
  );
}

export default ViewUser;
