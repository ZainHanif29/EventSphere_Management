import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "./navbar";

function ViewEvents() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No authorization token found.");
                    return;
                }

                const response = await axios.get("http://localhost:8000/api/events", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.status === "success") {
                    setEvents(response.data.message);
                } else {
                    setError(response.data.message || "Failed to fetch events.");
                }
            } catch (error) {
                console.error("Error fetching events:", error);
                setError("Failed to fetch events due to an error.");
            }
        };

        fetchEvents();
    }, []);

    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No authorization token found.");
                return;
            }

            const response = await axios.delete(`http://localhost:8000/api/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.status === "success") {
                setEvents(events.filter(event => event._id !== id));
            } else {
                setError(response.data.message || "Failed to delete event.");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            setError("Failed to delete event due to an error.");
        }
    };

    return (
        <div style={{backgroundColor:"coral",width:"100vw",height:"100vh",marginTop:"0% "}}>
            <Nav />
            <div className="container " style={{backgroundColor:"coral"}}>
                <h2 className="" style={{paddingTop:"3em" ,textAlign:"center"}}>Event List</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {events.length > 0 ? (
                    <table className="table table-striped" >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Theme</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) => (
                                <tr key={event._id}>
                                    <td>{index + 1}</td>
                                    <td>{event.title}</td>
                                    <td>{event.theme}</td>
                                    <td>{event.location}</td>
                                    <td>{new Date(event.date).toLocaleDateString()}</td>
                                    <td>{event.description}</td>
                                    <td>
                                        <Link to={`/update/${event._id}`} className="btn btn-outline-primary mr-2">Update</Link>
                                    </td>
                                    <td>
                                    <button className="btn btn-outline-danger" onClick={() => deleteUser(event._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">No events found.</p>
                )}
            </div>
        </div>
    );
}

export default ViewEvents;