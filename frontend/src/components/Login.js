import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { setToken } from './Auth.js'; // Import setToken function
import './Login.css'; // Import the CSS file

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (username.length === 0) {
            alert("Username has been left blank!");
        } else if (password.length === 0) {
            alert("Password has been left blank!");
        } else {
            axios.post('http://localhost:8000/login', {
                username: username,
                password: password
            })
            .then(function (response) {
                console.log(response);
                alert(response.data["message"]);
                if (response.data["message"] === "Login failed") {
                    alert("Login failed");
                } else {
                    if (response.data.token) {
                        setToken(response.data.token);
                        // Set username in localStorage
                        localStorage.setItem('cairocodersUsername', username);
                        navigate("/profile");
                    }
                }
            })
            .catch(function (error) {
                console.log(error, 'error');
            });
        }
    };

    return (
        <div>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-6">
                            <div className="intro-text">
                                <h2>Welcome to K-Hub Notes</h2>
                                <p>Where note-taking meets simplicity and efficiency. Our app offers an intuitive interface for effortlessly capturing and organizing your thoughts, to-do lists, and important information. With seamless syncing across all your devices, customizable themes, and a commitment to user privacy, K-Hub Notes is designed to enhance your productivity wherever you go. Join us today and experience a smarter way to take notes.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body p-5">
                                    <p>Login Account!</p>
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
                                            <input type="button" className="btn btn-success btn-lg" name="submit" id="submit" value="Login" onClick={handleSubmit} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
