import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/table.css";
import Nav from "./navbar";
function ViewUser() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authorization token found.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/user", {
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

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authorization token found.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/user/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data.message);

      if (response.data.status === "success") {
        setMsg(response.data.message);
        console.log(msg);
      } else {
        setMsg(response.data.message || "Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setMsg("Failed to fetch users due to an error.");
    }
  };

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
            <h2 className="mb-4 text-center ">User List</h2>
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
                    <th>Delete</th>
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
                      <td>
                        <button
                          className="btn btn-outline-danger "
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </button>
                      </td>
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
