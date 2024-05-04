import React, { useState } from 'react';
import axios from 'axios';

const apiBaseURL = 'http://localhost:8000/api/';

function UserAuth() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'attendee'
    });
    const [isRegistered, setIsRegistered] = useState(true);
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${apiBaseURL}/rigester`, {
                FirstName: user.firstName,
                LastName: user.lastName,
                Email: user.email,
                Password: user.password,
                Role: user.role
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response ? error.response.data.message : "Server Error");
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${apiBaseURL}/login`, {
                Email: user.email,
                Password: user.password
            });
            if (response.data.status === 'success') {
                localStorage.setItem('token', response.data.token);
            }
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response ? error.response.data.message : "Server Error");
        }
    };

    return (
        <div>
            <h2>{isRegistered ? 'Login' : 'Register'}</h2>
            <form onSubmit={isRegistered ? handleLogin : handleRegister}>
                {!isRegistered && (
                    <>
                        <input type="text" name="firstName" placeholder="First Name" value={user.firstName} onChange={handleChange} />
                        <input type="text" name="lastName" placeholder="Last Name" value={user.lastName} onChange={handleChange} />
                    </>
                )}
                <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
                {/* {!isRegistered && (
                    <select name="role" value={user.role} onChange={handleChange}>
                        <option value="attendee">Attendee</option>
                        <option value="organizer">Organizer</option>
                        <option value="exhibitor">Exhibitor</option>
                    </select>
                )} */}
                <button type="submit">{isRegistered ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={() => setIsRegistered(!isRegistered)}>
                {isRegistered ? 'Need to register?' : 'Already registered?'}
            </button>
            <p>{message}</p>
        </div>
    );
}

export default UserAuth;
