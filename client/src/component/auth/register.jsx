import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = "http://localhost:8000/api";

    try {
      const response = await axios.post(`${endpoint}/register`, {
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Email: formData.email,
        Password: formData.password,
      });
      if (response.data.status == "success") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/home");
      } else if (response.data.status == "failed") {
        toast.error(response.data.message);
      } else {
        console.log("api not hit");
      }
    } catch (error) {
      console.error(
        "Registration Error:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Registration Failed: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };
<style>
    
</style>
  return (
    <section className="vh-100" style={{ backgroundColor: "#E2C9A6" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11" >
            <div className="card text-black " style={{ borderRadius: "25px",boxShadow:"0px 0px 9px 2px coral"}}>
              <div className="card-body p-md-5">
                <div className="row justify-content-between">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" >
                    <h2 className="text-center mb-4">Register</h2>
                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                      <div className="mb-3">
                        
                        <input
                          type="text"
                          placeholder="enter your First Name"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="enter your Last Name"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        
                        <input
                         placeholder="enter your Email"

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
                      
                        <input
                         placeholder="enter your Password"

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
                          Register
                        </button>
                    </form>
                    <div className="text-center mb-3">
                      <span>Already Have An Account?</span> &nbsp;
                      <Link to="login">Login</Link>
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

export default SignupForm;
