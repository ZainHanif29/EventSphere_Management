import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/table.css";
import Nav from "./navbar";
function ViewEvents() {
  const [data, setdata] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authorization token found.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        });



        if (response.data.status === "success") {
            if(data.length >= 0){
              setdata(response.data.message)
                // setError(response.data.status);
            }else{
                setError(response.data.status,"No Events Found!");
            }
            
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
      {data.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Theme</th>
              <th>Location</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td>{data.title}</td>
                <td>{data.theme}</td>
                <td>{data.location}</td>
                <td>{data.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No Events found. html</p>
      )}
    </div>
      </div>
    </div>
   </>
  );
}

export default ViewEvents;
