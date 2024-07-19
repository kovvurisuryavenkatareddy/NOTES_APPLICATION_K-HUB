import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateNote() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const token = localStorage.getItem('cairocodersToken');
                const response = await axios.get(`http://localhost:8000/notes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (error) {
                console.error('Error fetching note:', error);
            }
        };
        fetchNote();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('cairocodersToken');
            await axios.put(`http://localhost:8000/notes/${id}`, {
                title,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/profile");
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <div style={{ minHeight: 800, marginTop: 20 }}>
            <h1>Update Note</h1>
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
