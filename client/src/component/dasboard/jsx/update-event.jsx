import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "./navbar.jsx";
import '../css/table.css'

function UpdateEvent() {
    const { eventId } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        theme: "",
        description: "",
        date: "",
    });

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.log("No authorization token found.");
                    return;
                }

                const response = await axios.get(`http://localhost:8000/api/events/${eventId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const eventData = response.data.message;
                console.log(eventData.date)
                setFormData({
                    title: eventData.title,
                    location: eventData.location,
                    theme: eventData.theme,
                    description: eventData.description,
                    date: eventData.date,
                });
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("No authorization token found.");
                return;
            }

            await axios.put(`http://localhost:8000/api/events/${eventId}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Optionally, you can display a success message or redirect the user after updating the event
        } catch (error) {
            console.error("Error updating event:", error);
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
                      className="expoinput "
                      placeholder="Event Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                  />
                  <input
                      type="text"
                      className="expoinput "
                      placeholder="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                  />
                  <select
                      className="expoinput "
                      name="theme"
                      value={formData.theme}
                      onChange={handleChange}
                  >
                      <option value="Book Fair">Book Fair</option>
                      <option value="Big Trade show">Big Trade show</option>
                      <option value="Expo">Expo</option>
                  </select>
                  <input
                      type="date"
                      
                      className="expoinput "
                      placeholder="Event Date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                  />
                  <textarea
                      className="textarea "
                    
                      placeholder="Event Description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                  ></textarea>
                  <button type="submit" className="expoinput ">
                      Update Event
                  </button>
              </form>
          </div>
          </div>
  </>
    );
}

export default UpdateEvent;