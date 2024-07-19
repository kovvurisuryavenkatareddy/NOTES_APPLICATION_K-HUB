import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (username.length === 0) {
            alert("Username has left Blank!");
        } else if (password.length === 0) {
            alert("Password has left Blank!");
        } else {
            axios.post('http://localhost:8000/register', {
                username: username,
                password: password
            })
            .then(function (response) {
                console.log(response);
                alert(response.data["message"]);
                if (response.data["message"] === "User registered successfully") {
                    navigate("/");
                }
            })
            .catch(function (error) {
                console.log(error, 'error');
                alert("Registration failed");
            });
        }
    }

    return (
        <div>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card">
                                <div className="card-body p-5">
                                    <p>Create Account!</p>
                                    <form autoComplete="off">
                                        <div className="form-outline mb-4">
                                            <label className="form-label">Your User Name</label>
                                            <input type="text" className="form-control form-control-lg" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label">Your Password</label>
                                            <input type="password" className="form-control form-control-lg" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <input type="button" className="btn btn-success btn-lg" name="submit" id="submit" value="Register" onClick={handleSubmit} />
                                        </div>
                                    </form>
                                    <div className="d-flex justify-content-center mt-3">
                                        <button className="btn btn-link" style={{backgroundColor:"#28a745",color: "#fff",border: "none",padding:" 0.75rem 1.5rem", fontSize:"1rem",borderRadius: "0.25rem",cursor: "pointer",marginTop:"10px"}} onClick={() => navigate("/")}>Already have an account? Login here</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}