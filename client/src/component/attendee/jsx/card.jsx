import React, { useEffect, useState } from 'react';
import axios from 'axios';
function CardList() {
  // const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getEventsClient");
        console.log(response.data.message)
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users due to an error.");
      }
    };

    fetchUsers();
  }, []);


  const img = '/img.jpg';

  // Array of card content
  const cardContent = Array.from({ length: 20 }, (_, index) => (
    <div key={index} className="col-md-4 mb-3"> {/* Using Bootstrap's grid system */}
      <div className="card">
        <img src={img} className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
        <div className="row">
      {cardContent}
    </div>
    </div>
  );
}

export default CardList;
