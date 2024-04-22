import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        Role: 'attendee'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/rigester', {
                FirstName:formData.FirstName,
                LastName:formData.LastName,
                Email:formData.Email,
                Password:formData.Password,
                Role:formData.Role,
            });
            console.log(response.data)
        } catch (error) {
            alert(error.response.data.message || 'An error occurred during registration');
        }
    };

    return (
        <div>
            <h2>User Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label><br />
                <input type="text" id="firstName" name="FirstName" value={formData.FirstName} onChange={handleChange} required /><br /><br />

                <label htmlFor="lastName">Last Name:</label><br />
                <input type="text" id="lastName" name="LastName" value={formData.LastName} onChange={handleChange} required /><br /><br />

                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" name="Email" value={formData.Email} onChange={handleChange} required /><br /><br />

                <label htmlFor="password">Password:</label><br />
                <input type="password" id="password" name="Password" value={formData.Password} onChange={handleChange} required /><br /><br />

                <label htmlFor="role">Role:</label><br />
                <select id="role" name="Role" value={formData.Role} onChange={handleChange}>
                    <option value="attendee">Attendee</option>
                    <option value="exhibitor">Exhibitor</option>
                    <option value="organizer">Organizer</option>
                </select><br /><br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
