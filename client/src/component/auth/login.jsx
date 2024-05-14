import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const endpoint = "http://localhost:8000/api";
    try {
      const response = await axios.post(`${endpoint}/login`, {
        Email: formData.email,
        Password: formData.password,
      });
      if (response.data.status == "success") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        if(response.data.role == "attendee"){
          navigate("/home")
        }else if(response.data.role == "organizer"){
          navigate("/home")
        }else{
          console.log("error")
        }
      } 
      else if (response.data.status == "failed") {
        toast.error(response.data.message);
      } 
      else {
        console.log("api not hit");
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <section className="vh-100 vw-100" style={{ backgroundColor: "#E2C9A6" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px", boxShadow:"0px 0px 9px 2px coral"}}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleLogin} className="mx-1 mx-md-4">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                        <button
                          type="submit"
                          className="btn  btn-lg"
                          style={{backgroundColor:"coral"}}
                        >
                        Login
                        </button>
                    </form>
                    <div className="text-center mb-3">
                      <span>Don't have an account?</span> &nbsp;
                      <Link to="/">Rigester Now</Link>
                    </div>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://img.freepik.com/free-vector/happy-tiny-business-people-dancing-having-fun-drinking-wine-corporate-party-team-building-activity-corporate-event-idea-concept-pinkish-coral-bluevector-isolated-illustration_335657-1414.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1705017600&semt=ais"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
