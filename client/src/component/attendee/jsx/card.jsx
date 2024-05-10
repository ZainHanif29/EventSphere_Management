import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CardList() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getEventsClient");
        setEvents(response.data.message);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to fetch events due to an error.");
      }
    };

    fetchEvents();
  }, []);

  const Events = events.map((event, index) => (
    <div key={index} className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{event.title}</h5>
          <p className="card-text">Location: {event.location}</p>
          <p className="card-text">Theme: {event.theme}</p>
          <p className="card-text">Description: {event.description}</p>
          <p className="card-text">Date: {new Date(event.date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div className="row">
        {Events}
      </div>
    </div>
  );
}

export default CardList;
