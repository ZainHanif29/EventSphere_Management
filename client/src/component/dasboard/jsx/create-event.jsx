import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import Nav from "./navbar";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    location: "Karachi", // Default location
    theme: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const token = localStorage.getItem("token");
  if (!token) {
    setMessage("No authorization token found.");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addEvent",
        {
          title: formData.title,
          location: formData.location,
          theme: formData.theme,
          description: formData.description,
          date: formData.date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); // Assuming your backend API endpoint is '/api/events/add'
      console.log(response.data); // Logging the response for testing
      // Optionally, you can display a success message or redirect the user after successfully adding the event
    } catch (error) {
      console.error("Error adding event:", error);
      // Handle error, display error message, or perform other actions as needed
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
      <div id="formarea">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="expoinput"
            placeholder="Enter Your Event Name"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <select
            className="expoinput"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
          >
            <option value="Book Fair">Book Fair</option>
            <option value="Big Trade show">Big Trade show</option>
            <option value="Expo">Expo</option>
          </select>
          <select
            className="expoinput"
            name="location"
            value={formData.location}
            onChange={handleChange}
          >
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
          </select>
          <input
            type="date"
            className="expoinput"
            placeholder="Enter Your Event date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <input
            type="text"
            className="expoinput"
            placeholder="Enter Your Event Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <input type="submit" className="expoinput" id="btn" value="Submit" />
        </form>
      </div>
    </div>
 </>
  );
}

export default CreateEvent;
