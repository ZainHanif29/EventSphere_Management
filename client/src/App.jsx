import React from "react";
import useUserData from "./hooks/user.js";
import { toast } from "react-toastify";

function App() {
  const { name, email, role, error } = useUserData();
  const notify = () => toast.error("Wow so easy!");

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="text-center text-primary h1">
            EventSphere Management
          </div>
        </div>
      </div>
      <div className="row">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div>User Name: {name}</div>
            <div>User Email: {email}</div>
            <div>User Role: {role}</div>
          </>
        )}
      </div>
      <div className="row">
        <div>
          <button onClick={notify}>Notify!</button>
        </div>
      </div>
    </div>
  );
}

export default App;
