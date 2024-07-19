import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateNote() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('cairocodersToken');
            await axios.post('http://localhost:8000/notes', {
                title,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/profile");
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    return (
        <div style={{ minHeight: 800, marginTop: 20 }}>
            <h1>Create Note</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success btn-lg">Submit</button>
            </form>
        </div>
    );
}
