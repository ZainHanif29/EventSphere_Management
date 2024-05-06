// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import { Table } from 'react-bootstrap';

// const UserTable = () => {
//   const [data, setdata] = useState([]);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Function to fetch users
//     const fetchUsers = async () => {
//       const token = localStorage.getItem("token"); // Get the token from local storage
//       if (!token) {
//         setMessage("No authorization token found.");
//         return;
//       }
//       try {
//         const response = await axios.get("http://localhost:8000/api/getuser", {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the request headers
//           },
//         });
//         setdata(response.data); // Assuming the response has data directly in the response
//         setUsers(response.data.message); // Assuming the response has data directly in the response
//       } catch (error) {
//         console.error("Failed to fetch users", error);
//         // Handle errors here, for example by setting an error state and showing an error message
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <>
//     {data.status != 'failed' &&(
//     <table className="table">
//       <thead>
//         <tr>
//           <th scope="col">#</th>
//           <th scope="col">Name</th>
//           <th scope="col">Email</th>
//           <th scope="col">Password</th>
//           <th scope="col">Role</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user, index) => (
//           <tr scope="row" key={user._id}>
//             <td>{index + 1}</td>
//             <td>
//               {user.FirstName} {user.LastName}
//             </td>
//             <td>{user.Email}</td>
//             <td>{user.Password}</td>
//             <td>{user.Role}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>)}


//     {data.status == 'failed' &&(<h1>Not allow</h1>)}


//     </>
//   );
// };

// export default UserTable;



import React, { useEffect, useState } from "react";
import axios from "axios";

const UserTable = () => {
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
        
        if (response.data.status === 'success') {
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
    <div className="container mt-3">
      <h2 className="mb-4">User List</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {users.length > 0 ? (
        <table className="table table-striped">
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
                <td>{user.FirstName} {user.LastName}</td>
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
  );
};

export default UserTable;
