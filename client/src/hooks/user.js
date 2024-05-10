import { useState, useEffect } from "react";
import axios from "axios";

function useUserData() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [error, setError] = useState(null);
  const [res, setRes] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authorization token found.");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:8000/api/logged-user",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRes(response.data.status);
        setName(`${response.data.user.FirstName} \t\t ${response.data.user.LastName}`);
        setEmail(response.data.user.Email);
        setRole(response.data.user.Role);
        setError(null);
      } catch (error) {
        setError("Failed to fetch user data.");
        // console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return { name, email, role, error ,res};
}

export default useUserData;
